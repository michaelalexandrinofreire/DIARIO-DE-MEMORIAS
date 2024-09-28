"use client";
import Image from "next/image";
import logo from ".././images/logo.svg";
import Button from ".././components/Button";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Home() {
  const [signOut] = useSignOut(auth);
  const router = useRouter();

  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
      <main className="flex justify-between w-full">
        
      </main>
    </div>
  );
}
