import React, { useEffect } from "react";
import { ArrowRight, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { removeSkip } from "@/redux/app/bookSkip/skipSlice";
import { RootState } from "@/redux/app/store";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, onOpen }) => {
  const dispatch = useAppDispatch();
  const skipData = useAppSelector((state: RootState) => state.skips.selectedSkip);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const handleClick = () => {
    dispatch(removeSkip());
    onClose();
  };

  return (
    <div className="relative">
      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-xl p-4 shadow-lg transition-transform duration-300 flex justify-between ease-in-out bg-slate-900 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "20rem" }}
      >
        {skipData ? (
          <div>
            <h3 className="text-2xl font-bold">{skipData.size} Yard Skip</h3>
            <p className="text-lg">Hire Period: {skipData.hire_period_days} days</p>
            <p className="text-lg">Price: £{skipData.price_before_vat}</p>

            <Button
              variant="default"
              className="mt-4 h-12 w-fit bg-red-500 text-white rounded-md"
              onClick={handleClick}
            >
              Remove Selection
            </Button>
          </div>
        ) : (
          <p className="text-lg text-gray-400">No selection made.</p>
        )}

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
          <ChevronUp className="w-8 sm:w-12 h-12 text-gray-500 drop-shadow-md" />
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
            animation-delay: 1s;
          }
        `}
      </style>
    </div>
    
  );
};

export default Drawer;
