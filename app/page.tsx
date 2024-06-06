"use client";
import Login from "./Components/login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around bg-black text-white py-20">
      <Login />


      <input type="text" placeholder="Enter OpenAI API Key" className="outline-none rounded-[5px] border-[4px] border-white pl-2 h-[40px] text-white bg-black text-center min-w-[350px]" />
    </main>
  );
}
