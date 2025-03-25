// src/components/Card.tsx
"use client";

import React from "react";
import styles from "./card.module.css";

interface CardProps {
  imgSrc: string;
  dentistName: string;
  areasOfExpertise: string;
  yearsOfExperience: string;
}

const Card: React.FC<CardProps> = ({
  imgSrc,
  dentistName,
  areasOfExpertise,
  yearsOfExperience
}) => {
  return (
    <div className={styles.card}>

      <div className={styles.cardImgContainer}>
        <img src={imgSrc} alt={dentistName} className={styles.cardImage} />
      </div>

      <div className={styles.cardText}>
        <h3 className={styles.cardTitle}>{dentistName}</h3>
        <p className={styles.cardDescription}>Area(s) of Expertise: {areasOfExpertise}</p>
        <p className={styles.cardDescription}>Years of Experience: {yearsOfExperience}</p>
      </div>

      <div className={styles.cardOverlay}>
        See More...
      </div>

    </div>
  );
};

export default Card;
