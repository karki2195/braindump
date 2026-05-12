"use client";

import { useState, useEffect } from "react";

type Dump = {
  id: number;
  text: string;
  createdAt: string;
}

export default function Home() {

  const [input, setInput] = useState("");
  const [dumps, setDumps] = useState<Dump[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    fetch("/api/dumps")
    .then((res) => res.json())
    .then((data) => setDumps(data));
}, []);

  async function handleDump(){
    if (input.trim() === "") return;
    const res = await fetch("/api/dumps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });
    const newDump = await res.json();
  setDumps([newDump, ...dumps]);
  setInput("");
}

async function dumpDelete(id: number) {
  await fetch (`/api/dumps/${id}`, {method: "DELETE"});
  setDumps(dumps.filter((dump) => dump.id !== id));
}

  return (

    <main className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="text-xl font-bold">BrainDump {dumps.length > 0 && (
          <span className="text-zinc-400 text-sm font-normal">/
            ({dumps.length})
          </span>
        )}</h1>
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

      {dumps.map((dump, id) => (
      <div key={dump.id} className="bg-zinc-900 rounded-2xl p-4">
          <p className="text-white">{dump.text}</p>
          <p className="text-zinc-500 text-sm mt-1">{new Date(dump.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })}</p>
          <button onClick={() => dumpDelete(dump.id)}
          className="text-red-400 text-sm-2">🗑️</button>

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