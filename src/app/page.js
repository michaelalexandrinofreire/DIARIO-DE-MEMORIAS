import Image from "next/image";
import logo from "./images/logo.svg";
import Girl from "./images/girl.svg"
import Button from "./components/Button";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between w-full">
        <a href="">
          <Image src={logo} priority />
        </a>
        <div className="flex justify-between gap-5">
          <Button label="Entrar" color="bg-purpleProject" />
          <Button label="Criar Conta" color="bg-blueProject" />
        </div>
      </header>
      <main className="flex justify-between w-full">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div>
            <div className="font-medium text-3xl">
              <p>
                Armazene <span className="text-yellowProject">memórias</span>.
              </p>
              <p>
                Construa sua <span className="text-redProject">história</span>.
              </p>
            </div>
          </div>
          <div className="font-medium text-xl">
            <p>
              Libere seus sentimentos em um lugar
              <span className="text-greenProject"> seguro</span> e
            </p>
            <span className="text-pinkProject"> livre</span> para você.
          </div>
          <Button label="Começar agora" color="bg-purpleProject" />
        </div>
        <div>
          <Image src={Girl}/>
        </div>
      </main>
    </div>
  );
}
