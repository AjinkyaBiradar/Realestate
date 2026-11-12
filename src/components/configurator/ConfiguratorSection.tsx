"use client";

import { useState } from "react";
import HouseCanvas from "./HouseCanvas";
import ConfiguratorControls from "./ConfiguratorControls";
import { FinishType, BedroomCount, TimeOfDay } from "@/types";
import SectionHeading from "../ui/SectionHeading";
import { useViewingModal } from "@/context/ViewingModalContext";

export default function ConfiguratorSection() {
  const { openViewingModal } = useViewingModal();
  const [finish, setFinish] = useState<FinishType>("white");
  const [bedrooms, setBedrooms] = useState<BedroomCount>(4);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const handleOpenViewing = () => {
    const configDescription = `${finish.toUpperCase()} Finish, ${bedrooms} Bedrooms, ${timeOfDay.toUpperCase()} Ambience`;
    openViewingModal(configDescription);
  };

  return (
    <section id="configurator" className="relative py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeading
          number="02"
          tag="INTERACTIVE GEOMETRY"
          title="This is not a video; it is real three-dimensional geometry."
          description="A tactile digital twin calculated in real-time WebGL. Test tactile material finishes, customize modular bedroom wings, and manipulate the solar trajectory around the shoreline."
        />

        {/* Split Layout: 3D Canvas Left, Control Panel Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: 3D R3F Canvas */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
            <HouseCanvas
              finish={finish}
              bedrooms={bedrooms}
              timeOfDay={timeOfDay}
              autoRotate={autoRotate}
              onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
            />
          </div>

          {/* Right Side: UI Control Panel */}
          <div className="lg:col-span-5 xl:col-span-4">
            <ConfiguratorControls
              finish={finish}
              onChangeFinish={setFinish}
              bedrooms={bedrooms}
              onChangeBedrooms={setBedrooms}
              timeOfDay={timeOfDay}
              onChangeTimeOfDay={setTimeOfDay}
              onRequestViewingWithConfig={handleOpenViewing}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
