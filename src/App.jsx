import { useState, useEffect, useRef } from "react";

import Form from "./Form";
import Todo from "./Todo";
import FilterButton from "./FilterButton";
function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function toggleTaskCompleted(id) {
    const updateTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updateTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/whisper"); // Path relatif
        if (!res.ok) {
          throw new Error("Oops, server lagi bermasalah");
        }

        const data = await res.json();
        const previousTasks = initialTasks;
        const result = previousTasks.concat(data);

        // const transFormData = result.map((task) => ({
        //   id: task.id,
        //   message: task.message,
        //   completed: task.completed,
        // }));

        setTasks(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err); // Pastikan menggunakan 'err' bukan 'er'
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []); // Dependency array kosong untuk mencegah infinite loop

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.message}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => {
    return (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
      />
    );
  });

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
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg my-8">
        <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
        <Form
          addTask={addTask}
          isLoading={isLoading}
          setError={setError}
          error={error}
        />
        <div className="flex space-x-4 my-4 absolute">{filterList}</div>
        <h2
          id="list-heading"
          tabIndex="-1"
          className="text-xl font-semibold mb-2"
        >
          {headingText}
        </h2>
        <ul aria-labelledby="list-heading" className="space-y-2" role="list">
          {taskList}
        </ul>
      </div>
    </>
  );
}

export default App;
