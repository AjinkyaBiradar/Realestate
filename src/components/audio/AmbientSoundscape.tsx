"use client";

import { useState, useEffect, useRef } from "react";

export default function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const initAndPlayAudio = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // 1. Lake Water Swell Generator (Brownian/Pink Noise through resonant Low-pass)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.96 * b1 + white * 0.11;
          b2 = 0.86 * b2 + white * 0.25;
          output[i] = (b0 + b1 + b2) * 0.35;
        }

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        // Water Lowpass filter
        const waterFilter = ctx.createBiquadFilter();
        waterFilter.type = "lowpass";
        waterFilter.frequency.setValueAtTime(320, ctx.currentTime);
        waterFilter.Q.setValueAtTime(3.5, ctx.currentTime);

        // LFO modulating water filter frequency to mimic rhythmic lake waves (0.12 Hz = ~8 second wave period)
        const waterLfo = ctx.createOscillator();
        waterLfo.frequency.setValueAtTime(0.12, ctx.currentTime);
        const waterLfoGain = ctx.createGain();
        waterLfoGain.gain.setValueAtTime(180, ctx.currentTime);

        waterLfo.connect(waterLfoGain);
        waterLfoGain.connect(waterFilter.frequency);

        const waterGain = ctx.createGain();
        waterGain.gain.setValueAtTime(0.45, ctx.currentTime);

        noiseSource.connect(waterFilter);
        waterFilter.connect(waterGain);
        waterGain.connect(masterGain);

        // 2. Pine Canopy Wind Whispering (Filtered Soft Noise)
        const windFilter = ctx.createBiquadFilter();
        windFilter.type = "bandpass";
        windFilter.frequency.setValueAtTime(440, ctx.currentTime);
        windFilter.Q.setValueAtTime(1.2, ctx.currentTime);

        const windLfo = ctx.createOscillator();
        windLfo.frequency.setValueAtTime(0.06, ctx.currentTime); // ~16 second slow wind gusts
        const windLfoGain = ctx.createGain();
        windLfoGain.gain.setValueAtTime(160, ctx.currentTime);

        windLfo.connect(windLfoGain);
        windLfoGain.connect(windFilter.frequency);

        const windGain = ctx.createGain();
        windGain.gain.setValueAtTime(0.2, ctx.currentTime);

        noiseSource.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(masterGain);

        noiseSource.start(0);
        waterLfo.start(0);
        windLfo.start(0);
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (gainNodeRef.current) {
        gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.2);
      }
      isRunningRef.current = true;
      setIsPlaying(true);
    } catch (e) {
      console.warn("Soundscape activation error:", e);
    }
  };

  const stopAudio = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      setTimeout(() => {
        if (!isRunningRef.current && audioCtxRef.current?.state === "running") {
          audioCtxRef.current.suspend().catch(() => {});
        }
      }, 850);
    }
    isRunningRef.current = false;
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      initAndPlayAudio();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      className="sound-toggle"
      aria-label={isPlaying ? "Mute ambient sanctuary audio" : "Play ambient sanctuary audio"}
      title={isPlaying ? "Mute Nordic water & pine soundscape" : "Play ambient sanctuary soundscape"}
    >
      <span className="sound-toggle__bars" aria-hidden="true">
        <span className={`sound-bar ${isPlaying ? "sound-bar--animated" : ""}`} style={{ animationDelay: "0ms" }} />
        <span className={`sound-bar ${isPlaying ? "sound-bar--animated" : ""}`} style={{ animationDelay: "220ms" }} />
        <span className={`sound-bar ${isPlaying ? "sound-bar--animated" : ""}`} style={{ animationDelay: "440ms" }} />
      </span>
      <span className="sound-toggle__label">{isPlaying ? "Audio On" : "Audio Off"}</span>
    </button>
  );
}
