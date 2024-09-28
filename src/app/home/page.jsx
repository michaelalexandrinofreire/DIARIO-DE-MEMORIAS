"use client";
import Image from "next/image";
import logo from ".././images/logo.svg";
import Button from ".././components/Button";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import { useState } from "react";

export default function Home() {
  const [signOut] = useSignOut(auth);
  const router = useRouter();

  const [showMemoryForm, setShowMemoryForm] = useState(false);

  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between w-full">
        <a href="">
          <Image src={logo} priority />
        </a>
        <div className="flex justify-between gap-5 items-center">
          <p className="text-sm">SAIR</p>
          <Button
            color="bg-[#D9D9D9]"
            label="->"
            className="px-1.5 py-1.5 text-xs"
            onClick={handleSignOut}
          />
        </div>
      </header>
      <main className="flex justify-start w-full flex-col flex-1">
        <Button
          label="NOVA MEMÓRIA"
          color="bg-transparent"
          className="bg-transparent border border-[#616161] rounded-[10px] py-1 px-2 text-gray-300 font-medium 
          hover:bg-[#E0BCF1] hover:text-gray-900 transition-colors w-60 mt-14"
          onClick={() => setShowMemoryForm(true)}
        />
        <h1 className="mt-14">MINHAS MEMÓRIAS</h1>
        <div className="flex justify-between w-full">
          <div className="">
            
          </div>
        </div>
      </main>

      {showMemoryForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="relative w-[610px] h-96 bg-[#E0BCF1] rounded-xl border-[35px] border-[#E0BCF1] flex flex-col justify-between gap-4 text-gray-950">
            <Button
              label="X"
              className="absolute -right-6 -top-7 px-1.5 py-0 rounded-full bg-transparent text-xl"
              onClick={() => setShowMemoryForm(false)}
            />
            <div className="flex gap-2">
              <Input
                placeholder="TÍTULO"
                className="bg-transparent w-1/2 placeholder-gray-950"
              />
              <Input
                placeholder="00/00/0000"
                type="date"
                className="bg-transparent w-1/2"
              />
            </div>
            <textarea
              name=""
              id=""
              className="bg-transparent border border-[#616161] rounded-[10px] py-1 px-2"
              rows="8"
              cols="40"
            ></textarea>
            <div className="flex justify-center">
              <Button
                label="ENVIAR"
                className="max-w-min items-center justify-center text-sm text-gray-300"
                color="bg-[#242424]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
