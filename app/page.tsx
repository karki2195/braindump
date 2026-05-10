"use client";

import { useState } from "react";

export default function Home() {

  const [input, setInput] = useState("");
  const [dumps, setDumps] = useState<string[]>([]);

  function handleDump(){
    if (input.trim() === "") return;
    setDumps([...dumps, input]);
    setInput("");
  }

  return (

    <main className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <div className="flex items-centre justify-between px-4 py-4">
        <h1 className="text-xl font-bold">BrainDump</h1>
      </div>

      <div className="flex flex-col flex-1 px-4 gap-4 justify-center">

        <textarea
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full bg-zinc-900 text-white rounded-2xl p-4 text-lg resize-none h-40 focus:outline-none"/>

          <button
            onClick={handleDump}
            className="w-full bg-white text-black font-semibold py-4 rounded-2xl text-lg">
              Dump It!
            </button>


        </div>







    </main>

  );



}