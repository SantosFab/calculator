import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-center text-5xl ">Página não encontrada</h1>
      <p className="m-4 text-xl">
        Não foi possível encontrar o recurso solicitado
      </p>
      <div>
        Para retornar para a Página Inicial:{" "}
        <Link className="underline decoration-pink-500" href="/">
          CLICK AQUI!
        </Link>
      </div>
    </div>
  );
}
