'use client';
import { SpeakerWaveIcon, ClipboardIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { ReactTyped, Typed } from "react-typed";

export function Translator({translateFrom}: {translateFrom: string}) {
  const [translate, setTranslate] = useState('')
  const [text, setText] = useState('')
  const [farsi, setFarsi] = useState('')
  const [open, setOpen] = useState(false)
  const [speakOpen, setSpeakOpen] = useState(false)
  const [typed,setTyped] = useState<Typed| undefined>()
  const [audio, setAudio] = useState('')

  const fetchVoiceResponse = async () => {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: translateFrom === "English" ? farsi : text }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const buffer = new Uint8Array(data.buffer.data).buffer;
    return buffer;
  }

  const voiceClick = async () => {
    if (text) {
    setSpeakOpen(true);
    const buffer = await fetchVoiceResponse();
    const audioBlob = new Blob([buffer], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudio(audioUrl)
    setSpeakOpen(false);
    }
  }

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
      typed?.start()
    }
  }

  const copyClick = async () => {
    if (text) {
    navigator.clipboard.writeText(text)
    setOpen(true);
    await new Promise(_ => setTimeout(() => {setOpen(false)}, 1000)); // 1 second delay
    }
  }

  return (
  <div className="flex w-6/12 rounded-2xl flex-col px-6 bg-white">
  <div className="justify-start items-center gap-4 inline-flex p-6 -mx-6 bg-blue-300 rounded-t-2xl">
    <h2 className="text-white w-screen text-3xl font-bold">{translateFrom === 'English' ? "English ➜ Farsi" : "Farsi ➜ English"}</h2>
  </div>
  <textarea rows={4} className="my-4 p-2 text-blue-950 placeholder-blue-950 placeholder-opacity-45 outline-none text-wrap resize-none" onKeyDown={keyDownHandler} onChange={e => setTranslate(e.currentTarget.value)} placeholder='Type here...'/>
  <hr className="px-2"></hr>
  <ReactTyped
    className="text-blue-950 p-2 outline-none text-wrap"
    typedRef={setTyped}
    strings={[text]}
    typeSpeed={1}
    showCursor={false}
/>
<ReactTyped
    className="text-blue-950 p-2 outline-none text-wrap"
    typedRef={setTyped}
    strings={[farsi]}
    typeSpeed={1}
    showCursor={false}
/>

  {audio && (
                <div>
                    <audio className='my-2 px-2 w-full' controls autoPlay={true}>
                        <source src={audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
  <div className="justify-between items-end flex py-4">
  <div className="flex gap-4">
    <div className="flex-col items-end gap-1 flex">
      <button id={"voice" + translateFrom} className='flex flex-col items-center text-opacity-45 text-blue-950 text-center transition ease-in-out p-2 delay-75 hover:text-opacity-100' onClick={voiceClick}>
      <SpeakerWaveIcon className="h-8"/>
       <span>Speak</span>
        </button>
    <Tooltip anchorSelect={'#voice' + translateFrom} isOpen={speakOpen} content="Generating audio..." className='!bg-blue-300 !rounded-lg'/>

    </div>
    <div className="flex-col items-end gap-1 flex"><button id={"copy" + translateFrom} className='flex flex-col items-center text-opacity-45 text-blue-950 text-center transition ease-in-out p-2 delay-75 hover:text-opacity-100' onClick={copyClick}>
      <ClipboardIcon className="h-8"/>
       <span>Copy</span>
        </button>
    <Tooltip anchorSelect={"#copy" + translateFrom} isOpen={open} content="Copied to clipboard!" className='!bg-blue-300 !rounded-lg'/>
    </div>
  </div>
    <div className="text-blue-950 text-opacity-70 font-normal py-2">Press enter to translate</div>
  </div>
  </div>)
}
