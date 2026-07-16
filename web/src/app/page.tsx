import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  CarFront,
  CheckCircle2,
  CreditCard,
  Database,
  ExternalLink,
  Gauge,
  GitBranch,
  Github,
  MessageSquare,
  MonitorSmartphone,
  Network,
  Radio,
  Route,
  Server,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

type Technology = {
  name: string;
  logo?: string;
  icon?: LucideIcon;
  className: string;
  iconClassName?: string;
};

type FlowNode = {
  name: string;
  description: string;
  icon: LucideIcon;
};

type Flow = {
  title: string;
  tone: "blue" | "green" | "violet";
  nodes: FlowNode[];
};

const technologyGroups: { label: string; items: Technology[] }[] = [
  {
    label: "Backend",
    items: [
      { name: "Go", logo: "/tech/go.svg", className: "border-cyan-200 bg-cyan-50/70" },
      { name: "gRPC", logo: "/tech/grpc.svg", className: "border-blue-200 bg-blue-50/70" },
      { name: "REST", icon: Server, className: "border-emerald-200 bg-emerald-50/70", iconClassName: "text-emerald-600" },
      { name: "WebSockets", logo: "/tech/websocket.svg", className: "border-slate-300 bg-slate-50" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "Next.js", logo: "/tech/nextjs.svg", className: "border-slate-300 bg-slate-50" },
      { name: "React", logo: "/tech/react.svg", className: "border-cyan-200 bg-cyan-50/70" },
      { name: "TypeScript", logo: "/tech/typescript.svg", className: "border-blue-200 bg-blue-50/70" },
      { name: "Tailwind CSS", logo: "/tech/tailwindcss.svg", className: "border-sky-200 bg-sky-50/70" },
    ],
  },
  {
    label: "Data & events",
    items: [
      { name: "MongoDB", logo: "/tech/mongodb.svg", className: "border-green-200 bg-green-50/70" },
      { name: "RabbitMQ", logo: "/tech/rabbitmq.svg", className: "border-orange-200 bg-orange-50/70" },
      { name: "Stripe", logo: "/tech/stripe.svg", className: "border-violet-200 bg-violet-50/70" },
    ],
  },
  {
    label: "Platform",
    items: [
      { name: "Docker", logo: "/tech/docker.svg", className: "border-sky-200 bg-sky-50/70" },
      { name: "Kubernetes", logo: "/tech/kubernetes.svg", className: "border-indigo-200 bg-indigo-50/70" },
      { name: "Tilt", logo: "/tech/tilt.svg", className: "border-emerald-200 bg-emerald-50/70" },
      { name: "Jaeger", logo: "/tech/jaeger.svg", className: "border-cyan-200 bg-cyan-50/70" },
    ],
  },
];

const flows: Flow[] = [
  {
    title: "Rider booking flow",
    tone: "blue",
    nodes: [
      { name: "Rider web client", description: "Requests a ride and shows trip status", icon: MonitorSmartphone },
      { name: "API gateway", description: "Validates requests and opens live streams", icon: Network },
      { name: "Trip service", description: "Prices rides and owns the trip lifecycle", icon: Route },
      { name: "MongoDB", description: "Stores durable trip and fare data", icon: Database },
      { name: "RabbitMQ", description: "Publishes trip-created domain events", icon: MessageSquare },
      { name: "Driver service", description: "Finds an available matching driver", icon: CarFront },
    ],
  },
  {
    title: "Driver matching flow",
    tone: "green",
    nodes: [
      { name: "Driver client", description: "Shares availability, class, and location", icon: MonitorSmartphone },
      { name: "WebSocket gateway", description: "Keeps a live driver connection open", icon: Radio },
      { name: "Driver service", description: "Registers active drivers over gRPC", icon: CarFront },
      { name: "RabbitMQ", description: "Delivers new and declined trip events", icon: MessageSquare },
      { name: "Matching workflow", description: "Selects an eligible nearby driver", icon: Waypoints },
      { name: "Rider stream", description: "Sends driver and trip updates in real time", icon: Radio },
    ],
  },
  {
    title: "Payment & trip events flow",
    tone: "violet",
    nodes: [
      { name: "Trip service", description: "Emits a payment command after acceptance", icon: Route },
      { name: "RabbitMQ", description: "Routes commands between isolated services", icon: MessageSquare },
      { name: "Payment service", description: "Creates a checkout session for the fare", icon: CreditCard },
      { name: "Stripe checkout", description: "Collects payment on a hosted page", icon: ShieldCheck },
      { name: "API webhook", description: "Verifies Stripe and publishes the result", icon: Network },
      { name: "Trip service", description: "Updates payment state in MongoDB", icon: Database },
    ],
  },
];

const tones = {
  blue: {
    border: "border-blue-200",
    accent: "border-l-blue-500",
    badge: "bg-blue-600",
    icon: "bg-blue-50 text-blue-700",
    background: "bg-blue-50/40",
  },
  green: {
    border: "border-emerald-200",
    accent: "border-l-emerald-500",
    badge: "bg-emerald-600",
    icon: "bg-emerald-50 text-emerald-700",
    background: "bg-emerald-50/40",
  },
  violet: {
    border: "border-violet-200",
    accent: "border-l-violet-500",
    badge: "bg-violet-600",
    icon: "bg-violet-50 text-violet-700",
    background: "bg-violet-50/40",
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader active="home" />
      <main className="min-h-[calc(100vh-4rem)] bg-[#f4f6f9] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl space-y-5">
          <section className="grid gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1.05fr_1fr] lg:p-8">
            <div className="flex flex-col justify-center lg:border-r lg:border-slate-200 lg:pr-10">
              <h1 className="text-4xl font-bold tracking-normal text-[#071a3a] sm:text-5xl">RideShare</h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                A full-stack ride-sharing platform connecting riders and drivers in real time through Go microservices, event-driven workflows, and a responsive Next.js client.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/ride-console" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto">
                  <MonitorSmartphone className="size-4" aria-hidden="true" />
                  Open Ride Console
                </Link>
                <a href="https://github.com/martinrgarciap/RideShare" target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto">
                  <Github className="size-4" aria-hidden="true" />
                  View on GitHub
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">Built With</h2>
              <div className="mt-4 space-y-4">
                {technologyGroups.map((group) => (
                  <div key={group.label} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:items-start">
                    <h3 className="pt-2 text-xs font-semibold uppercase text-slate-500">{group.label}</h3>
                    <ul className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 sm:grid-cols-3">
                      {group.items.map((technology) => {
                        const Icon = technology.icon;
                        return (
                          <li key={technology.name} className={`flex min-h-11 items-center gap-2.5 rounded-md border px-3 py-2 text-xs font-semibold text-slate-700 ${technology.className}`}>
                            {technology.logo ? (
                              <Image src={technology.logo} alt="" width={22} height={22} className="size-[22px] shrink-0 object-contain" />
                            ) : Icon ? (
                              <Icon className={`size-[22px] shrink-0 ${technology.iconClassName}`} aria-hidden="true" />
                            ) : null}
                            <span>{technology.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-blue-700">System architecture</p>
                <h2 className="mt-1 text-xl font-bold text-[#071a3a]">How RideShare Works</h2>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600" aria-label="Flow colors">
                <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-blue-600" />Rider</span>
                <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-emerald-600" />Driver</span>
                <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-violet-600" />Payments & events</span>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {flows.map((flow, flowIndex) => {
                const tone = tones[flow.tone];
                return (
                  <article key={flow.title} className={`rounded-md border border-l-4 p-4 ${tone.border} ${tone.accent} ${tone.background}`}>
                    <div className="mb-4 flex items-center gap-3">
                      <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${tone.badge}`}>{flowIndex + 1}</span>
                      <h3 className="text-sm font-semibold text-slate-900">{flow.title}</h3>
                    </div>
                    <ol className="grid grid-cols-1 gap-2 lg:grid-cols-6 lg:gap-8">
                      {flow.nodes.map((node, nodeIndex) => {
                        const Icon = node.icon;
                        return (
                          <li key={`${node.name}-${nodeIndex}`} className="relative flex flex-col">
                            <div className={`flex h-full min-h-24 items-start gap-3 rounded-md border bg-white p-3 ${tone.border}`}>
                              <span className={`flex size-8 shrink-0 items-center justify-center rounded-full ${tone.icon}`}>
                                <Icon className="size-4" aria-hidden="true" />
                              </span>
                              <div className="min-w-0">
                                <h4 className="text-xs font-semibold text-slate-900">{node.name}</h4>
                                <p className="mt-1 text-[11px] leading-4 text-slate-600">{node.description}</p>
                              </div>
                            </div>
                            {nodeIndex < flow.nodes.length - 1 && (
                              <>
                                <ArrowDown className="mx-auto mt-2 size-4 text-slate-400 lg:hidden" aria-hidden="true" />
                                <ArrowRight className="absolute -right-6 top-10 hidden size-4 text-slate-400 lg:block" aria-hidden="true" />
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <InfoPanel icon={Boxes} title="Microservice boundaries" items={[
              "API gateway, trip, driver, and payment services",
              "Synchronous service calls use gRPC",
              "RabbitMQ carries cross-service domain events",
              "Each service can deploy and scale independently",
            ]} />
            <InfoPanel icon={Gauge} title="Real-time trip flow" items={[
              "Rider requests and previews a route",
              "An available driver receives the offer",
              "WebSockets stream driver and rider updates",
              "Stripe completes the payment workflow",
            ]} />
            <InfoPanel icon={GitBranch} title="Project highlights" items={[
              "Distributed tracing with OpenTelemetry and Jaeger",
              "Interactive maps for riders and drivers",
              "Dockerized services on Kubernetes",
              "Fast local development through Tilt",
            ]} />
          </section>
        </div>
      </main>
    </>
  );
}

function InfoPanel({ icon: Icon, title, items }: { icon: LucideIcon; title: string; items: string[] }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-blue-50 text-blue-700">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h2 className="text-base font-bold text-[#071a3a]">{title}</h2>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-5 text-slate-600">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
