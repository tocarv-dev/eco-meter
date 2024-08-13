import clsx from 'clsx';
// Styles
import '@/stylesheets/globals.css';
import '@/stylesheets/fonts.css';
import '@/stylesheets/switzer.css';

import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

import { signIn } from "@/lib/auth/auth"

import { SubmitButton } from "@/components/submit-button"

import Image from 'next/image';
import {NextUIProvider} from "@nextui-org/react";
import siteBackGround1 from '@/images/arrows-8841234_1280.jpg';
import siteBackGround2 from '@/images/tree-5725540_1280.jpg';
import siteBackGround3 from '@/images/sustainability-8438275_1280.png';
import siteBackGround4 from '@/images/bg-cooler-world.svg';
import siteBackGround5 from '@/images/bg-cooler-world.jpeg';
import userIcon from '@/images/user.svg'

import {Providers} from "./providers";

let title = 'Cooler World - Uma calculadora de pegada de carbono';
let description =
  'Esta é uma  calculadora de pegada de carbono para pessoas residentes em Portugal';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" className="h-full">
        <style jsx="true" global>
        {`
        :root {
          --font-poppins: ${poppins.style.fontFamily};
        }
        `}
        </style>
        <body className="lg:bg-faint-green font-switzer h-full flex flex-col justify-start lg:justify-center items-center">
          <Image src={siteBackGround5} alt="" className="w-[250px] lg:h-auto backgroundImage" fill style={{objectFit: 'cover',}}/>
          <Providers>
            <main className="font-normal relative w-full max-w-lg lg:max-w-[940px]">
              <form
                  action={async () => {
                    "use server"
                    await signIn("google")
                  }}
                >
                <button type= 'submit' className="absolute top-2 right-2 p-2 bg-white-green rounded-md border text-sm transition-all focus:outline-none">
                  <Image src={userIcon} alt="" className="w-4"/>
                </button>
              </form>
               {children}
            </main>
          </Providers>
        </body>
      </html>
  );
}
  