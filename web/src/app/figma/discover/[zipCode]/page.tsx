"use client";

import { useParams, useRouter } from "next/navigation";
import { MapPin, DollarSign, Clock, Shield, Filter, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { mockOpportunities, Opportunity, opportunityTypes, calculateWeeklyEarnings } from "@/lib/figma-opportunities";
import { useState } from "react";
import ZipMap, { MapPin as ZipMapPin } from "@/components/ZipMap";

const CHICAGO_CENTER: [number, number] = [-87.6298, 41.8781];

const DEMO_PINS: ZipMapPin[] = [
  { id: 1, lng: -87.6457, lat: 41.9267, label: "$110", color: "#C8861A" },
  { id: 2, lng: -87.6324, lat: 41.8828, label: "$50",  color: "#9B3333" },
  { id: 3, lng: -87.6219, lat: 41.8952, label: "$300", color: "#2A5BA8" },
  { id: 4, lng: -87.6453, lat: 41.9432, label: "$95",  color: "#C8861A" },
  { id: 5, lng: -87.6261, lat: 41.8826, label: "$8K+", color: "#2D7A5A" },
  { id: 6, lng: -87.6329, lat: 41.8794, label: "$40",  color: "#9B3333" },
  { id: 7, lng: -87.6670, lat: 41.8747, label: "$150", color: "#2A5BA8" },
  { id: 8, lng: -87.6318, lat: 41.8817, label: "$175", color: "#6B4A9B" },
];

export default function DiscoverPage() {
  const { zipCode } = useParams<{ zipCode: string }>();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const filteredOpportunities = selectedType
    ? mockOpportunities.filter(op => op.type === selectedType)
    : mockOpportunities;

  const weeklyEarnings = calculateWeeklyEarnings(filteredOpportunities);
  const estimatedPatients = filteredOpportunities.length * 2;

  return (
    <div className="min-h-screen bg-muted">
      {/* Header Stats */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Opportunities near {zipCode}</h1>
                <p className="text-muted-foreground">Within 5 miles of your location</p>
              </div>
              <button
                onClick={() => router.push("/figma")}
                className="text-sm text-secondary hover:text-secondary/80 transition-colors"
              >
                Change location
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-muted p-6 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Verified Opportunities</p>
                <p className="text-3xl font-bold text-primary">{filteredOpportunities.length}</p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Potential Weekly Earnings</p>
                <p className="text-3xl font-bold text-accent">${weeklyEarnings}</p>
              </div>
              <div className="bg-muted p-6 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Estimated Patients Helped</p>
                <p className="text-3xl font-bold text-secondary">{estimatedPatients}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Filters */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Filter by Type</h3>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedType(null)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                    selectedType === null ? "bg-secondary text-white" : "hover:bg-muted text-foreground"
                  }`}
                >
                  All Opportunities
                </button>

                {Object.entries(opportunityTypes).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedType(key)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                      selectedType === key ? "bg-secondary text-white" : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <div className="font-medium">{value.label}</div>
                    <div className={`text-sm mt-1 ${selectedType === key ? "text-white/80" : "text-muted-foreground"}`}>
                      {value.avgCompensation}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-semibold mb-3 text-sm">Safety & Verification</h4>
                <div className="space-y-3">
                  {[
                    "All providers are licensed and verified",
                    "Regular health screenings required",
                    "HIPAA compliant facilities",
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-3">
                      <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map & Listings */}
          <div className="col-span-2 space-y-6">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-border overflow-hidden"
              style={{ height: 384 }}
            >
              <ZipMap
                center={CHICAGO_CENTER}
                pins={DEMO_PINS}
                initialZip={zipCode}
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>

            {/* Opportunity Listings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{filteredOpportunities.length} Opportunities Available</h3>

              {filteredOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-lg border transition-all ${
                    selectedOpportunity?.id === opportunity.id
                      ? "border-secondary shadow-md"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-semibold">{opportunity.name}</h4>
                          {opportunity.verified && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded text-xs font-medium text-accent">
                              <Shield className="w-3 h-3" />
                              Verified
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{opportunity.providerName}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${opportunity.compensation}</p>
                        <p className="text-sm text-muted-foreground">Compensation</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{opportunity.distance} miles</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{opportunity.timeRequired}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{opportunity.availableSlots} slots</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-medium mb-2">Eligibility Requirements</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {opportunity.eligibility.map((req, idx) => (
                          <span key={idx} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                            {req}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => router.push("/figma/dashboard")}
                          className="flex-1 py-2.5 bg-secondary text-white rounded-md font-medium hover:bg-secondary/90 transition-colors"
                        >
                          Schedule Appointment
                        </button>
                        <button
                          onClick={() => setSelectedOpportunity(opportunity)}
                          className="px-4 py-2.5 border border-border rounded-md font-medium hover:bg-muted transition-colors flex items-center gap-2"
                        >
                          Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
