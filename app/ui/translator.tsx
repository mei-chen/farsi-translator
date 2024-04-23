'use client';
import clsx from 'clsx';
import { SpeakerWaveIcon, ClipboardIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import OpenAI from 'openai';

export function Translator({translateFrom}: {translateFrom: string}) {
  const [translate, setTranslate] = useState('')

  const keyDownHandler = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Key Pressed: ", e.key);
    }}

  return (
  <div className="flex w-6/12 rounded-2xl flex-col px-6 bg-white">
  <div className="justify-start items-center gap-4 inline-flex p-6 -mx-6 bg-blue-300 rounded-t-2xl">
    <h2 className="text-blue-950 w-screen text-3xl font-bold">{translateFrom === 'English' ? "English → Farsi" : "Farsi → English"}</h2>
  </div>
  <input type='text' className="my-4 text-blue-950 p-2 placeholder-blue-950 placeholder-opacity-45" onKeyDown={keyDownHandler} onChange={e => setTranslate(e.currentTarget.value)} placeholder='Type here...'/>
  <div className="h-10/12"></div>
  <div className="justify-between items-end flex">
  <div className="flex gap-4">
    <div className="flex-col items-end gap-1 flex">
      <button className='flex flex-col items-center text-opacity-45 text-blue-950 text-center transition ease-in-out py-2 delay-75 hover:text-opacity-100' onClick={() => console.log('wow')}>
      <SpeakerWaveIcon className="h-8"/>
       <span>Speak</span>
        </button>
    </div>
    <div className="flex-col items-end gap-1 flex">
      <button className='flex flex-col items-center text-opacity-45 text-blue-950 text-center transition ease-in-out py-2 delay-75 hover:text-opacity-100'>
      <ClipboardIcon className="h-8"/>
       <span>Copy</span>
        </button>
    </div>
  </div>
    <div className="text-blue-950 text-opacity-70 font-normal py-2">Press enter to translate</div>
  </div>
  </div>)
}
