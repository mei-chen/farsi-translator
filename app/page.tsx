import { Translator } from "./ui/translator";


export default function Home() {
  return (
    <main className="p-7 flex min-h-screen flex-col items-center bg-indigo-50 font-['Schibsted Grotesk'] text-black">
        <h1 className="text-3xl font-bold text-blue-950 text-center">koobidic</h1>
        <div className="w-10/12 py-36 items-center justify-center gap-12 flex flex-row">
          <Translator translateFrom='English'></Translator>
          <Translator translateFrom='Farsi'></Translator>
        </div>
    </main>
  );
}
