const Loader = () => {
  return (
    <div className="h-50v grid place-content-center">
      <div
        className="animate-spin inline-block w-8 h-8 border-[4px] border-current border-t-transparent text-pink-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
