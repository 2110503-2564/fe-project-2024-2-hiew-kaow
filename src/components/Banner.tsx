'use client'
import Image from "next/image";
import { useState } from "react";
import { useSession } from 'next-auth/react'

export default function () {

    const { data: session } = useSession();

    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg']
    const [idx, setIndex] = useState(0);

  return (
    <div className="m-0 p-0 w-[100vw] h-[60vh]" onClick={() => {setIndex(idx+1)}}>
        {
            session? <div className="absolute top-20 right-20 z-30 text-center text-xl text-red-500">Logged in</div> 
            : <div className="absolute top-20 right-20 z-30 text-center text-xl text-red-500">Please login</div>
        }
      {/* <Image
        src={covers[idx%3]}
        alt="cover"
        width={0}
        height={0}
        sizes="100vh"
        className="w-2/3 object-fill"
      /> */}
      <div className="w-full h-[70vh] bg-blue-300 flex justify-center items-center text-center text-xl"> Banner </div>
    </div>
  );
}
