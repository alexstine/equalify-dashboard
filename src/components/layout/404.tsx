import { Link } from 'react-router-dom';

import RootLayout from '.';

const NotFound = () => (
  <RootLayout>
    <section className="flex flex-col gap-20 md:flex-row h-full w-full items-center justify-center text-black">
      <Link to="/">
        <img
          src="/equalify.svg"
          className="h-auto w-60 md:w-96"
          width={384}
          height="auto"
          alt="Return to the homepage by clicking the Equalify logo"
        />
      </Link>
      <div className="flex flex-col gap-5 text-center">
        <h1 className="text-4xl md:text-5xl font-bold capitalize text-[#186121]">
          404 Error
        </h1>
        <h2 className="text-lg font-medium uppercase lg:text-2xl">
          Page not found
        </h2>
        <p className="max-w-80 text-xl">
          Sorry, we couldn't find the page you're looking for. Please check the
          URL or go back to the homepage.
        </p>
        <Link to="/" aria-label="Go back to the homepage" className='text-white bg-[#186121] px-6 py-2 rounded-md'>
          Go to Homepage
        </Link>
      </div>
    </section>
  </RootLayout>
);

export default NotFound;
