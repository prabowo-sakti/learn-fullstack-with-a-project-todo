import { useState } from "react";

function Form({ addTask, isLoading, error }) {
  const [nameTasks, setNameTasks] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addTask(nameTasks);
    setNameTasks("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
      <div className="label-wrapper mb-4">
        <label htmlFor="taskMessage" className="text-lg font-medium">
          What needs to be done?
        </label>
      </div>
      <input
        type="text"
        name="text"
        autoComplete="off"
        value={nameTasks}
        onChange={(e) => setNameTasks(e.target.value)}
        className="flex-1 rounded border border-gray-300 p-2"
        placeholder="Add a new task "
        disabled={isLoading}
      />
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? "Menambahkan..." : "Add Task"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default Form;
