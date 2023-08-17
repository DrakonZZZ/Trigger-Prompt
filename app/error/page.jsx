'use client';
import { useRouter } from 'next/navigation';

const ErrorPage = ({ message, code }) => {
  const Router = useRouter();

  setTimeout(() => {
    Router.push('/');
  }, 2000);
  return (
    <div className="font-inter w-full w-max-full h-80v flex justify-center flex-col items-center">
      <h1 className="header_text text-gray-300 mb-6">{code}</h1>
      <p className="text-3xl font-medium tracking-widest uppercase text-gray-400 ">
        {message}
      </p>
    </div>
  );
};

export default ErrorPage;
