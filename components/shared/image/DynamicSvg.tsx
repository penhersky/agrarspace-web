import React, { useLayoutEffect, useState } from "react";

interface IImageProps {
  url: string;
  className?: string;
}

const Dynamic: React.FC<IImageProps> = ({ url, className }) => {
  const [image, setImage] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!image) {
      fetch(url)
        .then((res) => res.text())
        .then((text) => setImage(text));
    }
  }, [image, url]);

  if (!image) return <div className={className} />;

  return (
    <div dangerouslySetInnerHTML={{ __html: image }} className={className} />
  );
};

export default Dynamic;
