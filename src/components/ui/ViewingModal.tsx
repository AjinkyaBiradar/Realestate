"use client";

import { useState } from "react";
import { X, Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";

interface ViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig?: string;
}

export default function ViewingModal({
  isOpen,
  onClose,
  initialConfig,
}: ViewingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDay: "Saturday",
    timeSlot: "Sunset (17:30)",
    notes: initialConfig ? `Configured with: ${initialConfig}` : "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#0d0d0f] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl z-10 overflow-hidden">
        {/* Subtle top edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Viewing Request Confirmed
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              Thank you, <span className="text-white font-medium">{formData.name || "Guest"}</span>.
              Our private concierge will contact you at{" "}
              <span className="text-white font-medium">{formData.phone}</span> to finalize your
              private boat transfer and architectural tour on {formData.preferredDay} ({formData.timeSlot}).
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
                <span>Private Access</span>
                <span>•</span>
                <span>Lake Lucerne</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Schedule a Private Viewing
              </h3>
              <p className="text-sm text-neutral-400 mt-2">
                Experience the spatial geometry and tranquil lakefront firsthand. Tours include private
                dock arrival by boat.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Christian Meier"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#161619] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+41 79 000 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#161619] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="christian@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#161619] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Preferred Day
                  </label>
                  <select
                    value={formData.preferredDay}
                    onChange={(e) => setFormData({ ...formData, preferredDay: e.target.value })}
                    className="w-full bg-[#161619] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Thursday">Thursday, Private Access</option>
                    <option value="Friday">Friday, Afternoon Access</option>
                    <option value="Saturday">Saturday, Open Horizon</option>
                    <option value="Sunday">Sunday, Quiet Reserve</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Preferred Light Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#161619] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Morning (10:00)">Morning Light (10:00)</option>
                    <option value="Midday (13:30)">Midday Architectural (13:30)</option>
                    <option value="Sunset (17:30)">Golden Hour & Sunset (17:30)</option>
                  </select>
                </div>
              </div>

              {initialConfig && (
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-xs text-neutral-300 font-mono">
                  Attached Configuration: {initialConfig}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-6 rounded-lg bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Confirm Viewing Request</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

