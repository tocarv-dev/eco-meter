import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-white flex flex-col lg:flex-row rounded-2xl lg:shadow-lg">
        <div className="text-center max-w-screen-sm p-8 rounded-2xl">
          <h1 className="text-deep-green font-bold text-2xl">
            Descubra o seu impacto no planeta e como pode fazer a diferença! 
          </h1>
          <p className="text-deep-green mt-5">
          Calcule a sua pegada de carbono e fique a conhecer a personagem que melhor o/a representa. Receba dicas práticas para tornar a sua vida mais sustentável.
          </p>
          <p className="text-deep-green mt-5">
            <a
              href="survey"
              rel="noopener noreferrer"
              className="text-deep-green underline hover:text-mid-green transition-all"
            > Inicie aqui</a>
            {' '}
            a sua jornada para um COOLER WORLD!
          </p>
        </div>
      </div>
 );
}
