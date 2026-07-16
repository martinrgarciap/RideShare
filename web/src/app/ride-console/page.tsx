"use client";

import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { DriverPackageSelector } from "../../components/DriverPackageSelector";
import { SiteHeader } from "../../components/SiteHeader";
import { Button } from "../../components/ui/button";
import { CarPackageSlug } from "../../types";

const DriverMap = dynamic(
  () => import("../../components/DriverMap").then((mod) => mod.DriverMap),
  { ssr: false },
);
const RiderMap = dynamic(() => import("../../components/RiderMap"), {
  ssr: false,
});

if (typeof window !== "undefined") {
  import("leaflet").then((L) => {
    const DefaultIcon = L.default.icon({
      iconUrl: icon.src,
      shadowUrl: iconShadow.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.default.Marker.prototype.options.icon = DefaultIcon;
  });
}

function RideConsoleContent() {
  const [userType, setUserType] = useState<"driver" | "rider" | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment = searchParams.get("payment");
  const [packageSlug, setPackageSlug] = useState<CarPackageSlug | null>(null);

  if (payment === "success") {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50">
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center gap-6 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
              <p className="mt-2 text-gray-600">Your ride has been confirmed.</p>
            </div>
            <Button className="w-full py-6 text-lg" variant="outline" onClick={() => router.push("/ride-console")}>
              Return to Ride Console
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50">
      {userType === null && (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Welcome to RideShare</h1>
            <p className="mb-8 text-gray-600">Choose how you&apos;d like to use the service today</p>
            <div className="space-y-4">
              <Button className="w-full bg-primary py-6 text-lg hover:bg-primary/90" onClick={() => setUserType("rider")}>
                I Need a Ride
              </Button>
              <Button className="w-full py-6 text-lg" variant="outline" onClick={() => setUserType("driver")}>
                I Want to Drive
              </Button>
            </div>
          </div>
        </div>
      )}

      {userType === "driver" && packageSlug && <DriverMap packageSlug={packageSlug} />}
      {userType === "driver" && !packageSlug && <DriverPackageSelector onSelect={setPackageSlug} />}
      {userType === "rider" && <RiderMap />}
    </main>
  );
}

export default function RideConsole() {
  return (
    <>
      <SiteHeader active="console" />
      <Suspense
        fallback={
          <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
              <div className="mx-auto h-8 w-32 animate-pulse rounded bg-gray-200" />
            </div>
          </main>
        }
      >
        <RideConsoleContent />
      </Suspense>
    </>
  );
}
