import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Error from "next/error";
import Form from "./Form";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks || []);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [whisperResponse, setWhisperResponse] = useState(null);
  const [error, setError] = useState(null);

  function usePrevious(value) {
    const ref = useRef(null);
    useEffect(() => {
      ref.current = value;
    });
  }

  async function addTask({ message }) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/v1/whisper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const result = await res.json();
      const newTask = {
        id: result.id || "todo" - nanoid(),
        message: result.message || message,
        completed: result.completed || false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setWhisperResponse(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-semibold ">Todo List</h1>
        <Form />
      </div>
    </>
  );
}

export default App;
