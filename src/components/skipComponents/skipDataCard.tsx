import { AnimatePresence, motion } from "motion/react";
import Image, { ImageProps } from "@/components/Image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Skip } from "@/redux/app/bookSkip/skipApi";
import { Button } from "../ui/button";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CarouselContext } from "../Carousel";
import { TruckIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Card = Skip;

export const Card = ({
  card,
  index,
  layout = false,
  handleClick,
}: {
  card: Card;
  index: number;
  layout?: boolean;
  handleClick?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.id}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl flex flex-col md:flex font-sans relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto z-40 bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <X className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <div className="md:w-60 md:h-60 sm:absolute right-20 top-12">
                <BlurImage
                  src={card.image}
                  alt={`Skip Bin - ${card.size}m³`}
                  className="object-cover rounded-3xl md:absolute z-10 inset-0"
                />
              </div>

              <div className="mt-8 md:mt-0">
                <motion.p
                  layoutId={layout ? `category-${card.id}` : undefined}
                  className="text-base font-medium text-black dark:text-white"
                >
                  {card.allowed_on_road
                    ? "Allowed on Road"
                    : "Not Allowed on Road"}
                </motion.p>
                <motion.p
                  layoutId={layout ? `title-${card.id}` : undefined}
                  className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
                >
                  Skip Bin - {card.size}m³
                </motion.p>
                <div className="md:py-10 gap-4 md:gap-20 text-neutral-700 flex flex-col md:flex-row dark:text-white">
                  <section>
                    <p>Hire Period: {card.hire_period_days} days</p>
                    <p>Price (ex. VAT): ${card.price_before_vat}</p>
                    <p>VAT: ${card.vat}</p>
                    <p>
                      Allows Heavy Waste:{" "}
                      {card.allows_heavy_waste ? "Yes" : "No"}
                    </p>
                  </section>

                  <Button
                    onClick={() => {
                      handleClick();
                      setOpen(false);
                    }}
                    className="w-full h-16 md:w-60 text-lg"
                    variant="default"
                  >
                    Select Skip <TruckIcon />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.id}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-[19rem] w-64 md:h-[30rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative py-3 px-8 z-40 md:p-8">
          <motion.p
            layoutId={layout ? `category-${card.id}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-left"
          >
            {card.allowed_on_road ? "Allowed on Road" : "Private Property Only"}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.id}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left font-sans mt-2"
          >
            Skip Bin - {card.size}yd³
          </motion.p>
        </div>
        <div className="z-40 py-3 px-8 md:p-8 absolute bottom-0 md:bottom-3 ">
          <motion.p
            layoutId={layout ? `price-${card.id}` : undefined}
            className="text-white text-2xl md:text-5xl font-medium font-sans text-left flex "
          >
            £{card.price_before_vat}
            <sub className="text-lg md:text-2xl font-light ml-1 md:mt-[0.6rem] items-baseline text-neutral-600 dark:text-neutral-300 font-sans">
              per week
            </sub>
          </motion.p>
        </div>
        <BlurImage
          src={card.image} // Replace with an actual image path
          alt={`Skip Bin - ${card.size}m³`}
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </>
  );
};
export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
