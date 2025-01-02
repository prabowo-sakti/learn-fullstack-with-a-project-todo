import { useState } from "react";

function Form({ onSubmit, isLoading }) {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (message.trim()) {
      onSubmit({ message });
      setMessage("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="label-wrapper mb-4">
        <label htmlFor="taskMessage" className="text-lg font-medium">
          What needs to be done?
        </label>
      </div>
      <input
        type="text"
        id="taskMessage"
        name="text"
        autoComplete="off"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 border-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter task message"
        disabled={isLoading}
        required
      />
      <button
        type="submit"
        className="btn w-full bg-black text-white py-2 rounded-md mt-2 hover:bg-gray-800 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? "Menambahkan..." : "Add Task"}
      </button>
    </form>
  );
}

export default Form;
