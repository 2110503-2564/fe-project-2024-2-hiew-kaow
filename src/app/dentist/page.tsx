import Card from "@/components/Card"; // Reuse your Card component
import Link from "next/link";
import { DentistItem } from "../../../interface";

// This is an async server component that fetches dentist data from the API.
export default async function DentistPage() {
  const res = await fetch("https://hiew-kaow-dentist.vercel.app/api/v1/dentists", {
    cache: "no-store",
  });
  const json = await res.json();
  const dentists = json.data;

  return (
    <main
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        margin: 0,
        overflow: "hidden",
      }}
    >

      <div className="pt-20 text-center">
        {/* Heading above the dentists grid */}
        <h2 className="text-3xl text-black font-bold mb-8">Our Dentists</h2>

        <div className="grid grid-cols-3 gap-8 justify-items-center mb-5">
          {dentists.map((dentist: DentistItem) => (
            <Link key={dentist._id} href={`/dentist/${dentist._id}`}>
              <Card
                key={dentist._id}
                imgSrc={`/img/${dentist.name}.jpg`}
                dentistName={dentist.name}
                areasOfExpertise={dentist.areaOfExpertise.join(", ")}
                yearsOfExperience={dentist.yearsOfExperience.toString()}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
