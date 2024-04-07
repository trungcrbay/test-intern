
import Wrapper from "@/components/wrapper";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" w-[590px] gap-4 border-solid border-2 border-black rounded-lg ">
        <Wrapper />
      </div>
    </main>
  );
}
