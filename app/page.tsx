"use client";

import { useState, useEffect } from "react";

type Dump = {
  id: number;
  text: string;
  done: boolean;
  createdAt: string;
}

export default function Home() {

  const [input, setInput] = useState("");
  const [dumps, setDumps] = useState<Dump[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/dumps")
    .then((res) => res.json())
    .then((data) => setDumps(data));
}, []);

const filteredDumps = dumps.filter((dump) =>
  dump.text.toLowerCase().includes(searchTerm.toLowerCase())
);

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

async function handleDone(id: number) {
  const res = await fetch(`/api/dumps/${id}`, {
    method: "PATCH"
  });
  const updatedDump = await res.json();
  setDumps(dumps.map((dump) =>
    dump.id === id ? updatedDump : dump
));

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
<div className="px-4 mb-3">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search your dumps..."
          className="w-full bg-zinc-900 text-white rounded-2xl p-4 text-lg focus:outline-none"
        />
        </div>
     <div className="flex flex-col gap-3 px-4 overflow-y-auto">
      {dumps.length === 0 && (
        <p className="text-zinc-500">Nothing dumped yet.</p>
      )}

      {filteredDumps.map((dump, id) => (
      <div key={dump.id} className="bg-zinc-900 rounded-2xl p-4">
  <p className={`text-white ${dump.done ? "line-through text-zinc-500" : ""}`}>
    {dump.text}
  </p>
  <p className="text-zinc-500 text-sm mt-1">
    {new Date(dump.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })}
  </p>
  <div className="flex gap-3 mt-2">
    {!dump.done && (
      <button onClick={() => handleDone(dump.id)}
        className="text-green-400 text-sm">
        ✓ Done
      </button>
    )}
    <button onClick={() => dumpDelete(dump.id)}
      className="text-red-400 text-sm">
      🗑️
    </button>
  </div>
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