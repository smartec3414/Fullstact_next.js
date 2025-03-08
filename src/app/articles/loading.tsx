const LoadingArticle = () => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 80px)" }}
      className="flex flex-col  gap-8 mb-10 container mt-28">
      <div className="w-full md:w-2/3 mx-auto bg-accent h-10 animate-pulse rounded-lg"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="w-full  p-5 border border-border  animate-pulse flex flex-col gap-4 rounded-lg">
            <div className="w-full h-4 bg-accent/60 animate-pulse rounded-lg"></div>
            <div className="w-full h-3 bg-accent/40 animate-pulse rounded-lg"></div>
            <div className="w-full h-6 bg-accent/80 animate-pulse rounded-lg"></div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/2 mx-auto bg-accent h-10 animate-pulse rounded-lg"></div>
    </div>
  );
};

export default LoadingArticle;
