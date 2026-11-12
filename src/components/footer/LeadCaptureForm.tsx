"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Phone, Calendar, User } from "lucide-react";

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferredDay: "Saturday",
    timePreference: "Golden Hour (17:30)",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const days = [
    { label: "Friday", desc: "Private Arrival" },
    { label: "Saturday", desc: "Open Panorama" },
    { label: "Sunday", desc: "Quiet Reserve" },
    { label: "Weekday", desc: "By Appointment" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {submitted ? (
        <div className="bg-[#111115] border border-white/20 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-white/10 text-white border border-white/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Private Tour Requested
          </h3>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Thank you, <span className="text-white font-medium">{formData.name}</span>. Our concierge desk will reach you shortly at{" "}
            <span className="text-white font-mono font-medium">{formData.phone}</span> to confirm your private water transfer on{" "}
            <span className="text-white font-medium">{formData.preferredDay}</span> ({formData.timePreference}).
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-widest hover:bg-white/20 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#0e0e12] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
        >
          {/* Form Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              Direct Viewing Concierge
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Tours
            </span>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Maximilian von Berg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#18181d] border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> Phone Number
            </label>
            <input
              type="tel"
              required
              placeholder="+41 79 123 45 67"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#18181d] border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none focus:border-white transition-colors font-mono"
            />
          </div>

          {/* Preferred Day Pills */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Preferred Viewing Day
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {days.map((day) => {
                const active = formData.preferredDay === day.label;
                return (
                  <button
                    key={day.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredDay: day.label })}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      active
                        ? "bg-white text-black font-bold border-white shadow-md"
                        : "bg-[#18181d] text-neutral-300 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-semibold">{day.label}</div>
                    <div className="text-[10px] opacity-75 font-mono">{day.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Preferred Viewing Time Slot
            </label>
            <select
              value={formData.timePreference}
              onChange={(e) => setFormData({ ...formData, timePreference: e.target.value })}
              className="w-full bg-[#18181d] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-white transition-colors"
            >
              <option value="Morning Light (10:00 AM)">Morning Light (10:00 AM)</option>
              <option value="Midday Alpine Sun (13:30 PM)">Midday Alpine Sun (13:30 PM)</option>
              <option value="Golden Hour (17:30 PM)">Golden Hour & Sunset (17:30 PM)</option>
              <option value="Twilight Lake Atmosphere (19:00 PM)">Twilight Lake Atmosphere (19:00 PM)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-white text-black font-bold text-sm tracking-wider uppercase hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Book a viewing</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] font-mono text-neutral-400">
            Strict confidentiality guaranteed. Private dock arrivals arranged upon request.
          </p>
        </form>
      )}
    </div>
  );
}

