'use client'
import Image from "next/image";
import { useState } from "react";
import { useSession } from 'next-auth/react'

export default function Banner() {

    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg']
    const [idx, setIndex] = useState(0);

  return (
    <div className="m-0 p-0 w-[100vw] h-[50vh]" onClick={() => {setIndex(idx+1)}}>
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
