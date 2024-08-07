import clsx from 'clsx';

export default function ResultWrapper({
  children,
  title
}: ResultWrapperProps) {
  return (
    <section
      className={clsx(
        'flex flex-col justify-center bg-white lg:bg-transparent items-center w-full h-full rounded-lg lg:rounded-none',
        'bg-white lg:bg-transparent rounded-lg lg:rounded-none'
      )}
    >
      { title && 
        <h1 className="mt-6 text-2xl lg:text-[34px] font-bold text-dark-green">
          { title }
        </h1>
      }
      { children }
    </section>
  );
}

interface ResultWrapperProps {
  children: React.ReactNode;
  title?: string;
}