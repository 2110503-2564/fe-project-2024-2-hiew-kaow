"use client";

import React, { ReactNode, useState } from "react";

interface InteractiveCardProps {
  children: ReactNode;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = "rounded-lg transition-all duration-300";
  const idleClasses = "shadow-lg bg-white";
  const hoverClasses = "shadow-2xl bg-neutral-200";

  const classNames = `${baseClasses} ${isHovered ? hoverClasses : idleClasses}`;

  return (
    <div
      className={classNames}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default InteractiveCard;
