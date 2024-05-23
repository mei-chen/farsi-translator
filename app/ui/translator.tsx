'use client';
import { SpeakerWaveIcon, ClipboardIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import Typewriter from 'typewriter-effect';
import Tippy from '@tippyjs/react';

export function Translator({translateFrom}: {translateFrom: string}) {
  const [translate, setTranslate] = useState('')
  const [text, setText] = useState('')
  const [farsi, setFarsi] = useState('')

  const fetchAIResponse = async () => {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language: translateFrom, text: translate }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return data;
  }
  

  const keyDownHandler = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && translate) {
      e.preventDefault();
      const data = await fetchAIResponse();
      setText(data.write_stream)
      setFarsi(data.write_farsi)
    }
  }

  return (
  <div className="flex w-6/12 rounded-2xl flex-col px-6 bg-white">
  <div className="justify-start items-center gap-4 inline-flex p-6 -mx-6 bg-blue-300 rounded-t-2xl">
    <h2 className="text-white w-screen text-3xl font-bold">{translateFrom === 'English' ? "English ➜ Farsi" : "Farsi ➜ English"}</h2>
  </div>
  <input type='text' className="my-4 text-blue-950 p-2 placeholder-blue-950 placeholder-opacity-45 outline-none" onKeyDown={keyDownHandler} onChange={e => setTranslate(e.currentTarget.value)} placeholder='Type here...'/>
  <hr></hr>
  {/* <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: false,
      delay: 1,
    }}
/> */}
  <span className="text-blue-950 p-2 outline-none text-wrap">{text}</span>
  <span className="text-blue-950 p-2 outline-none text-wrap">{farsi}</span>
  <div className="justify-between items-end flex">
  <div className="flex gap-4">
    <div className="flex-col items-end gap-1 flex">
      <button className='flex flex-col items-center text-opacity-45 text-blue-950 text-center transition ease-in-out py-2 delay-75 hover:text-opacity-100' onClick={() => console.log('wow')}>
      <SpeakerWaveIcon className="h-8"/>
       <span>Speak</span>
        </button>
    </div>
    <div className="flex-col items-end gap-1 flex">
    <Tippy content="Copied to clipboard!" trigger='click' arrow='true' className='bg-blue-300 p-1 rounded-lg'>
      <button className='flex flex-col items-center text-opacity-45 text-blue-950 text-center transition ease-in-out py-2 delay-75 hover:text-opacity-100' onClick={() => {navigator.clipboard.writeText(text)}}>
      <ClipboardIcon className="h-8"/>
       <span>Copy</span>
        </button>
    </Tippy>
    </div>
  </div>
    <div className="text-blue-950 text-opacity-70 font-normal py-2">Press enter to translate</div>
  </div>
  </div>)
}
