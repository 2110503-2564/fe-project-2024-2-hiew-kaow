"use client";

import Link from "next/link";
import Card from "./Card";

interface Dentist {
  did: string;
  dentistName: string;
  imgSrc: string;
  areasOfExpertise: string;
  yearsOfExperience: string;
}

const dentists: Dentist[] = [
  {
    did: "67c5d2fa965a90abfd126cbb",
    dentistName: "Ebony Mertz",
    imgSrc: "/img/Ebony Mertz.jpg",
    areasOfExpertise: "Oral Surgery",
    yearsOfExperience: "33",
  },
  {
    did: "67c5d2fb965a90abfd126cbe",
    dentistName: "Alan MacGyver",
    imgSrc: "/img/Alan MacGyver.jpg",
    areasOfExpertise: "Periodontics",
    yearsOfExperience: "37",
  },
  {
    did: "67c5d300965a90abfd126cd3",
    dentistName: "Francisco Bartoletti",
    imgSrc: "/img/Francisco Bartoletti.jpg",
    areasOfExpertise: "Cosmetic Dentistry",
    yearsOfExperience: "31",
  },
];

const CardPanel: React.FC = () => {
  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "100px",
          overflowX: "auto",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {dentists.map((d) => (
          <Link key={d.did} href={`/dentist`}>
            <div style={{ textDecoration: "none", color: "inherit" }}>
              <Card
                imgSrc={d.imgSrc}
                dentistName={d.dentistName}
                areasOfExpertise= {d.areasOfExpertise}
                yearsOfExperience= {d.yearsOfExperience}
              />
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default CardPanel;
