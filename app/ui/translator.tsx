import clsx from 'clsx';

export function Translator({translateFrom}: {translateFrom: string}) {
  return (
    <div className='flex h-full w-full flex-col rounded-2xl px-4 text-sm text-black bg-white'>
        <h2 className='font-semibold text-4xl bg-blue-300 px-4 -mx-4 items-center'>{translateFrom === 'English' ? "English → Farsi" : "Farsi → English"}</h2>
        <input className="w-full" placeholder='Press enter to translate'></input>
    </div>
  );
}
