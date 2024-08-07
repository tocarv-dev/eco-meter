import clsx from 'clsx';

export default function ResultWrapper({
  children
}: ResultWrapperProps) {
  return (
    <section
      className={clsx(
        'flex flex-col justify-center bg-white lg:bg-transparent items-center px-6 lg:px-[100px] py-20 lg:pt-12 lg:pb-4 w-full h-full rounded-lg lg:rounded-none shadow-lg lg:shadow-none',
        'px-6 lg:px-[100px] pt-7 lg:pt-12 pb-8 lg:pb-4',
        'bg-white lg:bg-transparent rounded-lg lg:rounded-none shadow-lg lg:shadow-none'
      )}
    >
      <h1 className="text-2xl lg:text-[34px] font-bold text-dark-green">
        Resultado
      </h1>
      { children }
    </section>
  );
}

interface ResultWrapperProps {
  children: React.ReactNode;
}