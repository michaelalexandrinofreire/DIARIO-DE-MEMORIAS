"use client";
import Image from "next/image";
import logo from "../images/logo.svg";
import Button from "../components/Button";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "../services/firebaseConfig";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export default function Home() {
  const [signOut] = useSignOut(auth);
  const router = useRouter();

  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [memories, setMemories] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      router.push("/");
    }
  };

  const handleAddMemory = async () => {
    if (title && date && description) {
      try {
        await addDoc(collection(db, "memories"), {
          title,
          date,
          description,
        });
        setTitle("");
        setDate("");
        setDescription("");
        setShowMemoryForm(false);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "memories"), (snapshot) => {
      const memoriesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMemories(memoriesList);
    });
    return () => unsubscribe();
  }, []);

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
        <div className="flex justify-between w-full gap-16 mt-4">
          {memories.map((memory) => (
            <div key={memory.id} className="w-1/3 min-h-64 bg-blueProject rounded-[10px] p-3 text-gray-700 font-semibold">
              <div>
                <h2>{memory.title}</h2>
                <p className="text-sm">{memory.date}</p>
                <p className="overflow-clip text-justify mt-3">{memory.description}</p>
              </div>
            </div>
          ))}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="00/00/0000"
                type="date"
                className="bg-transparent w-1/2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <textarea
              className="bg-transparent border border-[#616161] rounded-[10px] py-1 px-2"
              rows="8"
              cols="40"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-center">
              <Button
                label="ENVIAR"
                className="max-w-min items-center justify-center text-sm text-gray-300"
                color="bg-[#242424]"
                onClick={handleAddMemory}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
