"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import ViewingModal from "@/components/ui/ViewingModal";

interface ViewingModalContextType {
  openViewingModal: (initialConfig?: string) => void;
  closeViewingModal: () => void;
}

const ViewingModalContext = createContext<ViewingModalContextType | undefined>(undefined);

export function ViewingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialConfig, setInitialConfig] = useState<string | undefined>();

  const openViewingModal = (config?: string) => {
    setInitialConfig(config);
    setIsOpen(true);
  };

  const closeViewingModal = () => {
    setIsOpen(false);
    setInitialConfig(undefined);
  };

  return (
    <ViewingModalContext.Provider value={{ openViewingModal, closeViewingModal }}>
      {children}
      <ViewingModal
        isOpen={isOpen}
        onClose={closeViewingModal}
        initialConfig={initialConfig}
      />
    </ViewingModalContext.Provider>
  );
}

export function useViewingModal() {
  const context = useContext(ViewingModalContext);
  if (!context) {
    throw new Error("useViewingModal must be used within a ViewingModalProvider");
  }
  return context;
}

