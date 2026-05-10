"use client";

import { useState, useEffect } from "react";

type Dump = {
  text: String
  time: String
}

export default function Home() {

  const [input, setInput] = useState("");
  const [dumps, setDumps] = useState<Dump[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("braindumps");
    if (saved) {
      setDumps(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("braindumps", JSON.stringify(dumps));
  }, [dumps]);

  function handleDump(){
    if (input.trim() === "") return;

    const newDump = {
      text: input,
      time: new Date().toLocaleString([],{
        hour: "2-digit",
        minute: "2-digit"
      })
  };
  setDumps([newDump, ...dumps]);
  setInput("");
}

  return (

    <main className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="text-xl font-bold">BrainDump</h1>
        <button onClick={() => setPanelOpen(true)} className="text-zinc-400 text-2xl">
           ☰
        </button>
      </div>

      {panelOpen && (
        <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col">

    <div className="flex items-center justify-between px-4 py-4">
      <h2 className="text-xl font-bold">Your Dumps</h2>
      <button onClick={() => setPanelOpen(false)} className="text-zinc-400 text-2xl">
         ✕
      </button>
    </div>

     <div className="flex flex-col gap-3 px-4 overflow-y-auto">
      {dumps.length === 0 && (
        <p className="text-zinc-500">Nothing dumped yet.</p>
      )}

      {dumps.map((dump, index) => (
      <div key={index} className="bg-zinc-900 rounded-2xl p-4">
          <p className="text-white">{dump.text}</p>
          <p className="text-zinc-500 text-sm mt-1">{dump.time}</p>
        </div>
      ))}
      </div>
</div>
      )
      }

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