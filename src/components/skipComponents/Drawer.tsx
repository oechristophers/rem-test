import React, { useEffect } from "react";
import { ArrowRight, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

interface DrawerProps {
  isOpen: boolean;
  skipData: {
    size: string;
    hire_period_days: number;
    price_before_vat: number;
  } | null;
  onClose: () => void;
  onOpen: () => void;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  skipData,
  onClose,
  onOpen,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div className="relative">
      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-xl p-4 shadow-lg transition-transform duration-300 flex justify-between ease-in-out bg-slate-900 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "20rem" }}
      >
        <div>
          <h3 className="text-2xl font-bold">{skipData?.size} Yard Skip</h3>
          <p className="text-lg">
            Hire Period: {skipData?.hire_period_days} days
          </p>
          <p className="text-lg">Price: £{skipData?.price_before_vat}</p>

          <Button
            variant="default"
            className="mt-4 h-12 w-fit bg-red-500 text-white rounded-md"
            onClick={onClose}
          >
            Remove Selection
          </Button>
        </div>
        <Button className="p-2 h-12 mt-auto px-4">
          Continue <ArrowRight />
        </Button>
      </div>

      {/* Wobbling Icon to Open Drawer */}
      {!isOpen && skipData && (
        <div
          className="fixed bottom-4 left-4 z-50 cursor-pointer animate-jump"
          onClick={onOpen}
        >
          <ChevronUp className="w-8 sm:w-12 h-12 text-gray-600 drop-shadow-md" />
        </div>
      )}

      {/* Animation */}
      <style>
        {`
          @keyframes jump {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-jump {
            animation: jump 0.6s ease-in-out infinite;
            animation-delay: 5s;
          }
        `}
      </style>
    </div>
  );
};

export default Drawer;
