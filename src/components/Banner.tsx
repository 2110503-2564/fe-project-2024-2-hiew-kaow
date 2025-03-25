'use client'
import Image from "next/image";
import { useState } from "react";
import { useSession } from 'next-auth/react'

export default function () {

    const { data: session } = useSession();

    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg']
    const [idx, setIndex] = useState(0);

  return (
    <div className="m-0 p-0 w-[100vw] h-[50vh]" onClick={() => {setIndex(idx+1)}}>
      {
        session ? (
          <div className="absolute top-20 right-20 z-30 text-center text-xl text-white 
            text-shadow-lg" style={{ textShadow: '0px 0px 5px rgba(0, 255, 0, 1), 0px 0px 10px rgba(0, 255, 0, 1)' }}>
            Logged in
          </div>
        ) : (
          <div className="absolute top-20 right-20 z-30 text-center text-xl text-white 
            text-shadow-lg" style={{ textShadow: '0px 0px 5px rgba(255, 0, 0, 1), 0px 0px 10px rgba(255, 0, 0, 1)' }}>
            Please login
          </div>
        )
      }


      <Image
        src={covers[idx % covers.length]}
        alt="cover"
        width={1920}
        height={1080}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
