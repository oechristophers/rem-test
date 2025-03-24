import React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  lazy?: boolean; 
  blurDataURL?: string; 
}

const Image: React.FC<ImageProps> = ({
    src,
    alt,
    width = "100%",
    height = "100%",
    className = "",
    lazy = true,
    ...props
  }) => {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? "lazy" : "eager"}
        className={`w-full h-full object-cover transition-transform duration-300 ease-in-out sm:hover:scale-110 ${className}`}
        {...props}
      />
    );
  };
  
  export default Image;