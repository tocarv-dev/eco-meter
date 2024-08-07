"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  let returnHome = () => {
    router.back()
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-cool-gray font-light mt-1">Resultado Não Encontrado!</p>
      <p className="mt-4">Não foi possível encontrar este formulário!</p>

      <button
          type="button"
          className="mt-6 bg-dark-green transition duration-300 hover:opacity-80 text-magnolia px-[17px] lg:px-8 py-[10px] lg:py-3 text-sm lg:text-base rounded-[4px] lg:rounded-lg"
          onClick={returnHome}
        >
          Voltar
        </button>
    </div>
  )
}