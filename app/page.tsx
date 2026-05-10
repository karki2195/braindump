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

    <main>
      <h1>BrainDump</h1>

    </main>


  );



}