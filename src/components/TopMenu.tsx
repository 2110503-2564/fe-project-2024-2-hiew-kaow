import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function TopMenu() {

  const session = await getServerSession(authOptions);

  return (
    <div className="h-[60px] bg-white fixed inset-0 z-30 border-1 border-gray-400 shadow-xl flex flex-row text-center items-center">
      <div className="flex absolute flex-row left-0 items-center">
        <Image
          src={"/img/logo.jpg"}
          className="h-[50px] w-auto rounded-[50%] m-2"
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
        />
        <div className="ml-5 text-md text-center text-cyan-600 hover:text-indigo-600 transition-all">
          Hiew Kaow Dental Clinic
        </div>
      </div>
      <div className="flex absolute flex-row right-0 mr-10">
        <TopMenuItem title="Booking" pageRef="/booking" />
        {session ? (
          <Link href="/api/auth/signout">
            <div className="h-full px-2 text-cyan-600 text-sm">My Account</div>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <div className="h-full px-2 text-cyan-600 text-sm">Sign in</div>
          </Link>
        )}
      </div>
    </div>
  );
}
