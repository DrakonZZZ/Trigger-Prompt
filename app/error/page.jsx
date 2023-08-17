'use client';
import { useRouter } from 'next/navigation';

const ErrorPage = ({ message, code }) => {
  const Router = useRouter();

  setTimeout(() => {
    Router.push('/');
  }, 1000);
  return (
    <div className="font-inter w-full w-max-full h-80v flex justify-center flex-col items-center ">
      <h1 className="text-9xl font-extrabold mb-6 tracking-widest">{code}</h1>
      <p className="text-3xl font-medium tracking-widest uppercase text-gray-600 ">
        {message}
      </p>
    </div>
  );
};

export default ErrorPage;
