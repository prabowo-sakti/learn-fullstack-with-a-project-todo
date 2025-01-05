import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import Form from "./Form";
function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function addTask(name) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/v1/whisper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: name }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const result = await res.json();
      const newTask = {
        id: result.id || "todo-" + nanoid(),
        message: result.message || message,
        completed: result.completed || false,
      };
      setTasks([...tasks, newTask]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg my-8">
        <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
        <Form addTask={addTask} isLoading={isLoading} error={error} />
        <div className="flex space-x-4 my-4">FilterList</div>
        <h2
          id="list-heading"
          tabIndex="-1"
          className="text-xl font-semibold mb-2"
        >
          Heading Text
        </h2>
        <ul aria-labelledby="list-heading" className="space-y-2" role="list">
          TaskList
        </ul>
      </div>
    </>
  );
}

export default App;
