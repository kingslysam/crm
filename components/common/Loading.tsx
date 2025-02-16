const LoadingComponent = () => {

  return (
    <div className="h-full my-20 flex items-center justify-center">
    <main id="container">
        
        <div className="dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
        <div className="dots2">
            <div className="dot2"></div>
            <div className="dot2"></div>
            <div className="dot2"></div>
            <div className="dot2"></div>
            <div className="dot2"></div>
            <div className="dot2"></div>
            <div className="dot2"></div>
            <div className="dot2"></div>
            <div className="dot2"></div>
            <div className="dot2"></div>
        </div>
        <div className="circle"></div>
    </main>

      {/* <div className="p-2 animate-spin drop-shadow-2xl bg-gradient-to-bl from-yellow-300 via-blue-400 to-green-300 md:w-14 md:h-14 h-10 w-10 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
      </div> */}
    </div>
  );
};

export default LoadingComponent;
