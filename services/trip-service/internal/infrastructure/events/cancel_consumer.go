package events

import (
	"context"
	"encoding/json"
	"log"
	"ride-sharing/services/trip-service/internal/domain"
	"ride-sharing/shared/contracts"
	"ride-sharing/shared/messaging"

	"github.com/rabbitmq/amqp091-go"
)

type cancelConsumer struct {
	rabbitmq *messaging.RabbitMQ
	service  domain.TripService
}

func NewCancelConsumer(rabbitmq *messaging.RabbitMQ, service domain.TripService) *cancelConsumer {
	return &cancelConsumer{
		rabbitmq: rabbitmq,
		service:  service,
	}
}

func (c *cancelConsumer) Listen() error {
	return c.rabbitmq.ConsumeMessages(messaging.TripCancelQueue, func(ctx context.Context, msg amqp091.Delivery) error {
		var message contracts.AmqpMessage
		if err := json.Unmarshal(msg.Body, &message); err != nil {
			return err
		}

		var payload messaging.TripCancelData
		if err := json.Unmarshal(message.Data, &payload); err != nil {
			return err
		}

		trip, err := c.service.GetTripByID(ctx, payload.TripID)
		if err != nil {
			return err
		}

		if trip.UserID != payload.UserID {
			log.Printf("user %s cannot cancel trip %s", payload.UserID, payload.TripID)
			return nil
		}

		if err := c.service.UpdateTrip(ctx, payload.TripID, "cancelled", nil); err != nil {
			return err
		}

		cancelPayload, err := json.Marshal(messaging.TripCancelData{
			TripID:   payload.TripID,
			UserID:   payload.UserID,
			DriverID: trip.Driver.GetId(),
			Reason:   payload.Reason,
		})
		if err != nil {
			return err
		}

		if trip.Driver != nil && trip.Driver.Id != "" {
			return c.rabbitmq.PublishMessage(ctx, contracts.TripEventCancelled, contracts.AmqpMessage{
				OwnerID: trip.Driver.Id,
				Data:    cancelPayload,
			})
		}

		return nil
	})
}
