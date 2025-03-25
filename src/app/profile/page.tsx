import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";

export default async function Acccount() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  // var createdAt = new Date(profile.data.createdAt);
  console.log(profile);

  return (
    <main className="w-full h-auto">
      <div className="absolute left-25 top-40 text-7xl font-bold">
        <div className="text-blue-400">Hello!</div>
        <div className="mt-5 text-gray-700">{profile.data.name}</div>
        <div className="mt-10">
          <div className="text-xl">Contact Number</div>
          <div className="w-[125%] bg-slate-300 h-[40px] rounded mt-1 text-lg flex items-center p-5">
            {profile.data.tel}
          </div>
        </div>
        <Link href='/api/auth/signout'>
          <div className="mt-7 px-2 py-1 bg-red-400 rounded text-2xl cursor-pointer w-[100px]">
            Logout
          </div>
        </Link>
      </div>
      <div className="w-[5px] absolute left-[35%] top-[20%] bg-slate-300 h-[500px] rounded"></div>
    </main>
  );
}
