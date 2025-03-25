import Banner from "@/components/Banner";
import Link from "next/link";

interface Dentist {
  _id: string;
  name: string;
  yearsOfExperience: number;
  areasOfExpertise: string[];
}

export default async function DentistPage({ params }: { params: Promise<{ did: string }> }) {
  const resolvedParams = await params;
  const { did } = resolvedParams;

  const res = await fetch("https://hiew-kaow-dentist.vercel.app/api/v1/dentists", { cache: "no-store" });
  const json = await res.json();
  const dentists: Dentist[] = json.data;
  const dentist = dentists.find((d) => d._id === did);

  const index = dentists.findIndex((d) => d._id === did);
  const prevDentist = index > 0 ? dentists[index - 1] : null;
  const nextDentist = index < dentists.length - 1 ? dentists[index + 1] : null;

  if (!dentist) {
    return (
      <main style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", margin: 0, overflow: "hidden" }}>
        <Banner />
        <div className="p-8 text-center text-black">Dentist not found.</div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", margin: 0, overflow: "hidden" }}>
      <Banner />

      {/* Main content container */}
      <div className="flex justify-center p-8">
        <div className="flex gap-8">
          <img
            src={`/img/${dentist.name}.jpg`}
            alt={dentist.name}
            className="w-65 h-65 rounded-full"
          />
          <div className="flex flex-col justify-center text-black">
            <h2 className="text-2xl font-semibold">{dentist.name}</h2>
            <p className="text-lg">Years of Experience: {dentist.yearsOfExperience}</p>
            <p className="text-lg">Expertise: {dentist.areasOfExpertise.join(", ")}</p>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded">
              Book an Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Navigation buttons container spanning the full width */}
      <div className="flex justify-between px-8">
        {prevDentist ? (
          <Link href={`/dentist/${prevDentist._id}`}>
            <button className="p-2 bg-blue-500 rounded">Previous</button>
          </Link>
        ) : <div /> /* Empty div to keep spacing */}
        {nextDentist ? (
          <Link href={`/dentist/${nextDentist._id}`}>
            <button className="p-2 bg-blue-500 rounded">Next</button>
          </Link>
        ) : <div />}
      </div>
    </main>
  );
}
