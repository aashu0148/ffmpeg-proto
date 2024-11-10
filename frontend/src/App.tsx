import { useEffect, useState } from "react";

import Home from "./pages/Home.tsx";
import Spinner from "@components/Spinner/Spinner.tsx";

function App() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  async function wakeUpServer() {
    await fetch("https://ffmpeg-proto.onrender.com/hi");
    setPageLoaded(true);
  }

  useEffect(() => {
    wakeUpServer();
    setTimeout(() => setShowMsg(true), 5000);
  }, []);

  return (
    <div className="flex flex-col gap-5 bg-slate-950 p-10 w-full min-h-screen">
      {pageLoaded ? (
        <Home />
      ) : (
        <div className="flex flex-col gap-3 items-center text-white m-auto">
          <p className="text-xl font-mono font-bold text-center">
            Waking up the Server... {showMsg && `(free server drawbacks🙃)`}
          </p>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default App;
