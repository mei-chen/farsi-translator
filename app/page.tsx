import Image from "next/image";
import { Translator } from "./ui/translator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <h1 className="text-4xl font-semibold text-center">koobidic</h1>
        <div className="z-10 w-3/4 items-center justify-between flex flex-col p-16">
          <Translator translateFrom='English'></Translator>
          <hr className="p-10"/>
          <Translator translateFrom='Farsi'></Translator>
        </div>
    </main>
  );
}
