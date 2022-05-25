import React, { useState } from "react";

import errorImageSec from "../../../assets/noLoaded.png";

interface IImageProps {
  src?: string;
  alt: string;
  className?: string;
}

const Image: React.FC<IImageProps> = ({ alt, className, src }) => {
  const [error, setError] = useState(false);

  return (
    <img
      className={className}
      alt={alt}
      onError={() => setError(true)}
      src={error || !src ? errorImageSec.src : src}
    />
  );
};

export default Image;
