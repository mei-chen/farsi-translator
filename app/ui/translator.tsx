import clsx from 'clsx';
import { SpeakerWaveIcon, ClipboardIcon } from '@heroicons/react/20/solid';

export function Translator({translateFrom}: {translateFrom: string}) {
  return (
    <div className='flex h-full w-full flex-col rounded-2xl px-4 text-sm text-black bg-white'>
        <h2 className='font-semibold text-4xl rounded-t-2xl bg-blue-300 px-4 -mx-4 items-center'>{translateFrom === 'English' ? "English → Farsi" : "Farsi → English"}</h2>
        <input className="w-full" placeholder='Press enter to translate'></input>
        <div className='flex h-full flex-row justify-start rounded-2xl px-4 text-sm text-black bg-white'>
          <button className='transition ease-in-out delay-50 px-5 py-3 hover:bg-sky-100 hover:text-blue-600'><SpeakerWaveIcon />Speak</button>
          <button className='transition ease-in-out delay-50 px-5 py-3 hover:bg-sky-100 hover:text-blue-600'><ClipboardIcon />Copy</button>
        </div>
    </div>
  );
}
