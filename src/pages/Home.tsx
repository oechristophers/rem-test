import { useGetSkipsByLocationQuery } from "@/redux/app/bookSkip/skipApi";
import { addSkip } from "@/redux/app/bookSkip/skipSlice";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import React, { useState, useEffect } from "react";
import Drawer from "@/components/skipComponents/Drawer";
import SpinLoader from "@/components/Loader";
import { Carousel } from "@/components/Carousel";
import { Card } from "@/components/skipComponents/skipDataCard";
export const Home = () => {
  const [postcode, setPostcode] = useState("NR32"); // Default postcode for demo
  const [area, setArea] = useState("Lowestoft"); // Default area for demo
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer open/close state
  const [selectedSkipData, setSelectedSkipData] = useState(null); // Selected skip info

  // Use the query hook to fetch skips
  const {
    data: skipData,
    error,
    isLoading,
  } = useGetSkipsByLocationQuery({ postcode, area });

  const dispatch = useAppDispatch();
  const selectedSkip = useAppSelector((state) => state.skips.selectedSkip);

  // Function to get the correct image path based on skip size
  const getSkipImage = (size: number) => {
    return "/images/4Skip.jpg"; // Default image instead
  };

  // Handle selectedSkip inside useEffect to react to changes
  useEffect(() => {
    if (selectedSkip) {
      // console.log("Selected skip:", selectedSkip);
      // Open the drawer and set selected skip data
      setSelectedSkipData(selectedSkip);
      setIsDrawerOpen(true);
    }
  }, [selectedSkip]); // Only runs when selectedSkip changes
  const handleDrawerOpen = () => setIsDrawerOpen(true);
  // Handle the skip data and set cards when data is fetched
  const cards = skipData?.map((card, index) => {
    const handleClick = () => {
      dispatch(addSkip(card));
    };

    return (
      <Card
        key={card.id}
        card={{ ...card, image: getSkipImage(card.size) }}
        index={index}
        handleClick={handleClick}
      />
    );
  });

  // Early return for loading and error states
  if (isLoading)
    return (
      <div className="mx-auto w-full h-screen items-center flex justify-center ">
        <SpinLoader />
      </div>
    );
  if (error || !skipData) return <div>Error loading skips.</div>;

  return (
    <div className="w-full h-screen md:h-full flex flex-col justify-center md:justify-normal py-20">
      <div className="flex flex-col gap-2">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Choose your skip size.
        </h2>
        <p className="max-w-7xl pl-4 mx-auto text-sm md:text-sm font-semibold text-neutral-600 dark:text-neutral-500 font-sans">
          Select the skip size that best suits your needs
        </p>
      </div>

      <Carousel items={cards} />

      {/* Drawer for displaying selected skip information */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)} // Close the drawer
        onOpen={handleDrawerOpen}
      />
    </div>
  );
};
