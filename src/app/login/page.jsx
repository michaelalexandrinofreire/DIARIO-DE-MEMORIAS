"use client";
import Button from "../components/Button";
import Input from "../components/Input";
import logo from "../images/logo.svg";
import Image from "next/image";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa o hook de navegação

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // Inicializa o roteador

  useEffect(() => {
    if (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage("Usuário não encontrado.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Senha incorreta.");
      } else {
        setErrorMessage("E-mail ou senha incorretos.");
      }
    } else {
      setErrorMessage("");
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      router.push("/home"); // Redireciona para a página 'home' após login bem-sucedido
    }
  }, [user, router]);

  function handleSignin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <header className="flex justify-between p-4">
        <a href="./">
          <Image src={logo} priority />
        </a>
      </header>
      <main className="flex items-center justify-center flex-col flex-grow gap-16">
        <div className="flex gap-4 flex-col justify-center items-center">
          <Input
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex justify-center relative mb-3">
            <Input
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            {errorMessage && (
              <p className="text-red-500 absolute -bottom-7 text-sme">
                {errorMessage}
              </p>
            )}
          </div>
          <p className="text-[#A6A6A6]">
            Não possui conta?{" "}
            <a href="/register" className="text-purpleProject">
              criar conta
            </a>
          </p>
        </div>

        <Button
          label="Entrar"
          className="w-96 bg-purpleProject"
          onClick={handleSignin}
        />
      </main>
    </div>
  );
}
