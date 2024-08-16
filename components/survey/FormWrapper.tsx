import clsx from 'clsx';
import { Poppins } from 'next/font/google'

export default function FormWrapper({
  children,
  heading,
  description,
}: FormWrapperProps) {
  return (
    <section
      className={clsx(
        'flex flex-col w-full h-full',
        'px-6 lg:px-[100px] pt-7 lg:pt-12 pb-8 lg:pb-4',
        'font-poppins bg-white lg:bg-transparent rounded-lg lg:rounded-none shadow-lg lg:shadow-none'
      )}
    >
      <h1 className="text-2xl lg:text-[34px] font-bold text-dark-green">
        {heading}
      </h1>
      <p className="text-cool-gray font-light mt-1">{description}</p>
      <div className="gap-6 mt-2 lg:mt-3 rounded-lg p-2 lg:p-4 bg-white-green">
        {children}
      </div>
    </section>
  );
}

interface FormWrapperProps {
  children: React.ReactNode;
  heading: string;
  description: string;
}
