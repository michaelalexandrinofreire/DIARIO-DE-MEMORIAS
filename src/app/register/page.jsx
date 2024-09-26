import Button from "../components/Button";
import Input from "../components/Input";
import logo from "../images/logo.svg";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <header className="flex justify-between p-4">
        <a href="./">
          <Image src={logo} priority />
        </a>
      </header>
      <main className="flex items-center justify-center flex-col flex-grow gap-16">
        <div className="flex gap-4 flex-col justify-center items-center">
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" />
          <p className="text-[#A6A6A6]">
            Já possui conta?{" "}
            <a href="/login" className="text-blueProject">
              Entrar
            </a>{" "}
          </p>
        </div>

        <Button label="Criar conta" className="w-96" color="bg-blueProject" />
      </main>
    </div>
  );
}
