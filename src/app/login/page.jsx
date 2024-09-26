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
            Não possui conta?{" "}
            <a href="/register" className="text-purpleProject">
              criar conta
            </a>
          </p>
        </div>

        <Button label="Entrar" className="w-96" color="bg-purpleProject" />
      </main>
    </div>
  );
}
