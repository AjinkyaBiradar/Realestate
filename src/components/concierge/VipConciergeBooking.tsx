"use client";

import { useState, useEffect } from "react";

interface TransportOption {
  id: string;
  title: string;
  badge: string;
  desc: string;
  icon: string;
}

const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    id: "chauffeur",
    title: "Private Electric Chauffeur",
    badge: "Complimentary",
    desc: "Door-to-door transfer in a silent Porsche Taycan / Lucid Air with chilled refreshments.",
    icon: "🚗",
  },
  {
    id: "heliport",
    title: "Helicopter Transfer",
    badge: "14 min direct",
    desc: "Direct flight to the private KAIROS helipad from the capital or regional private airport.",
    icon: "🚁",
  },
  {
    id: "spatial",
    title: "Apple Vision Pro Spatial Tour",
    badge: "Global Remote",
    desc: "Courier-delivered Spatial headset for an immersive, millimeter-accurate 1:1 live walkthrough.",
    icon: "🥽",
  },
];

export default function VipConciergeBooking() {
  const [selectedTransport, setSelectedTransport] = useState<string>("chauffeur");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [fullName, setFullName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "submitting" | "confirmed">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !contact) return;
    setStatus("submitting");
  };

  useEffect(() => {
    if (status !== "submitting") return;
    const id = setTimeout(() => setStatus("confirmed"), 900);
    return () => clearTimeout(id);
  }, [status]);

  return (
    <div className="vip-concierge" aria-label="VIP Concierge Booking & Private Transport Selection">
      {status === "confirmed" ? (
        <div className="vip-confirmed">
          <div className="vip-confirmed__icon">✦</div>
          <h3 className="vip-confirmed__title">Private Viewing Reserved</h3>
          <p className="vip-confirmed__desc">
            Thank you, {fullName}. Our Lead Estate Director has received your request for{" "}
            <strong>{TRANSPORT_OPTIONS.find((t) => t.id === selectedTransport)?.title}</strong>
            {preferredDate ? ` on ${preferredDate}` : ""}. A personalized security brief and itinerary will arrive via {contact} within 2 hours.
          </p>
          <button
            type="button"
            className="btn btn--ghost"
            style={{ marginTop: "16px" }}
            onClick={() => setStatus("idle")}
          >
            Modify or schedule another inquiry
          </button>
        </div>
      ) : (
        <form className="form vip-form" onSubmit={handleSubmit} noValidate>
          {/* Transport Tier Selection */}
          <div className="vip-transport">
            <span className="vip-transport__label">Select Arrival &amp; Viewing Format</span>
            <div className="vip-transport__grid">
              {TRANSPORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedTransport(opt.id)}
                  className={`vip-transport__card ${
                    selectedTransport === opt.id ? "vip-transport__card--active" : ""
                  }`}
                >
                  <div className="vip-transport__top">
                    <span className="vip-transport__icon">{opt.icon}</span>
                    <span className="vip-transport__badge">{opt.badge}</span>
                  </div>
                  <h4 className="vip-transport__name">{opt.title}</h4>
                  <p className="vip-transport__desc">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="vip-fields">
            <div className="field">
              <label htmlFor="vip-name">Full Name</label>
              <input
                id="vip-name"
                name="name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Lord / Lady / Mr. / Ms. Alexander Wright"
                autoComplete="name"
              />
            </div>

            <div className="field">
              <label htmlFor="vip-contact">Direct Phone / Signal / WhatsApp</label>
              <input
                id="vip-contact"
                name="contact"
                type="tel"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+1 (555) 234-5678"
                autoComplete="tel"
              />
            </div>

            <div className="vip-row-split">
              <div className="field">
                <label htmlFor="vip-date">Preferred Date &amp; Window</label>
                <input
                  id="vip-date"
                  name="preferredDate"
                  type="text"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  placeholder="e.g. Next Saturday, Sunset window"
                />
              </div>

              <div className="field">
                <label htmlFor="vip-party">Party Size</label>
                <select
                  id="vip-party"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="vip-select"
                >
                  <option value={1}>1 Principal</option>
                  <option value={2}>2 Guests</option>
                  <option value={4}>4 Guests (Family / Advisory)</option>
                  <option value={6}>6 Guests (Private Delegation)</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="vip-notes">Bespoke Requirements (NDA, dietary, runway clearance)</label>
              <input
                id="vip-notes"
                name="notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Confidentiality requirements, dietary requests, or flight tail number"
              />
            </div>
          </div>

          <div className="form__foot">
            <button
              className="btn btn--full"
              type="submit"
              disabled={status === "submitting" || !fullName || !contact}
            >
              {status === "submitting" ? "Reserving Itinerary..." : "Confirm VIP Viewing Request"}
            </button>
            <p className="privacy">
              Strict client discretion guaranteed. All inquiries handled under bilateral NDA upon request. No automated calls or marketing syndication.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
