import React from "react";

interface ILoading {
  className?: string;
}

const Loading: React.FC<ILoading> = ({ className }) => (
  <div className={className}>Loading...</div>
);

export default Loading;
