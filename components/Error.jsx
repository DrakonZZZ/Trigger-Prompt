'use client';

const ErrorPage = ({ message, code }) => {
  return (
    <div className="font-inter w-full w-max-full h-80v flex justify-center flex-col items-center ">
      <h1 className="text-9xl font-extrabold mb-6 tracking-widest trigger_card">
        {code}
      </h1>
      <p className="text-3xl font-medium tracking-widest uppercase">
        {message}
      </p>
    </div>
  );
};

export default ErrorPage;
