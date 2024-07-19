import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-white flex flex-col lg:flex-row m-10 rounded-2xl lg:shadow-lg">
        <div className="text-center max-w-screen-sm p-8 rounded-2xl">
          <h1 className="text-deep-green font-bold text-2xl">
           Are you an eco-Star?
          </h1>
          <p className="text-deep-green mt-5">
            Join us on this journey to building a Cooler World! The read ahead is long and winding, there will be bumps along the way! But you will not regret it!
          </p>
          <p className="text-deep-green mt-5">
            But let&apos;s start by assessing your starting point. Are you an Eco-Star?
            Take our 
            {' '}
            <a
              href="survey"
              rel="noopener noreferrer"
              className="text-deep-green underline hover:text-mid-green transition-all"
            > survey</a>
            {' '}
             to find out!
          </p>
        </div>
      </div>
 );
}
