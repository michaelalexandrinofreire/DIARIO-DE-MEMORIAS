"use client";
import Button from "../components/Button";
import Input from "../components/Input";
import logo from "../images/logo.svg";
import Image from "next/image";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [accountCreated, setAccountCreated] = useState(false);
  const [accountError, setAccountError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) {
      setAccountCreated(true);
      // Ocultar a mensagem após 2 segundos
      const timer = setTimeout(() => {
        setAccountCreated(false);
      }, 2000);
      return () => clearTimeout(timer); // Limpar o timer se o componente for desmontado
    }

    if (error) {
      setAccountError("E-mail já está cadastrado.");
      const timer = setTimeout(() => {
        setAccountError("");
      }, 2000);
      return () => clearTimeout(timer); // Limpar o timer se o componente for desmontado
    }
  }, [user, error]);

  function validateEmail(email) {
    // Regex para validação de e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    // Verifica se a senha tem pelo menos 6 caracteres
    return password.length >= 6;
  }

  async function handleSignin(e) {
    e.preventDefault();

    // Validações
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      await createUserWithEmailAndPassword(email, password);
    }
  }

  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <header className="flex justify-between p-4">
        <a href="./">
          <Image src={logo} priority />
        </a>
      </header>
      <main className="flex items-center justify-center flex-col flex-grow">
        <div className="flex gap-6 flex-col justify-center items-center">
          <div className="flex justify-center relative">
            <Input
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && (
              <p className="text-red-500 absolute -bottom-5 text-sm">
                {emailError}
              </p>
            )}
          </div>
          <div className="flex justify-center relative">
            <Input
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            {passwordError && (
              <p className="text-red-500 absolute -bottom-5 text-sm">
                {passwordError}
              </p>
            )}
          </div>
          <p className="text-[#A6A6A6]">
            Já possui conta?{" "}
            <a href="/login" className="text-blueProject">
              Entrar
            </a>{" "}
          </p>
        </div>
        <div className="flex justify-center relative">
          {loading && (
            <p className="text-base text-blueProject absolute top-4">
              Carregando...
            </p>
          )}
          <Button
            label="Criar conta"
            className="w-96 bg-blueProject mt-12"
            onClick={handleSignin}
          />
          {accountCreated && (
            <p className="text-base text-green-500 mt-4 absolute">
              Conta criada!
            </p>
          )}
          {accountError && (
            <p className="text-base text-red-500 mt-4 absolute">
              {accountError}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
