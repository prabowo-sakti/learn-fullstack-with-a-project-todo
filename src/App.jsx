import { useState, useEffect, useRef } from "react";

function App(props) {
  const [tasks, setTasks] = useState(props.task || []);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  function usePrevious(value) {
    const ref = useRef(null);
    useEffect(() => {
      ref.current = value;
    });
  }

  async function addTask({ message }) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/whisper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
    } catch {}
  }

  return (
    <>
      <div className="">
        <div className="menu bg-[#343E8B] pb-5">
          <span className="text-white left-20 relative text-lg cursor-pointer top-[0.5em]">
            Whispering wish
          </span>
          <ul>
            Decision Maker
            <li> </li>
          </ul>
        </div>
        <div className="flex m-auto flex-col relative top-[1.5em] items-center">
          <h1>Whisper Wish</h1>
          <span className="h-1 bg-black w-96"></span>
        </div>
        <div className="flex m-auto relative w-[500px] p-4 z-20 rounded-md top-7">
          <button className="absolute top-[-1.5rem] right-4  bg-blue-600 text-white px-4 py-2 rounded-md shadow-md">
            ADD
          </button>
          <div className="wishpering m-auto relative border-[#343E8B] border-2 border-spacing-5 h-[200px] w-[494px] "></div>
        </div>
      </div>
    </>
  );
}

export default App;
