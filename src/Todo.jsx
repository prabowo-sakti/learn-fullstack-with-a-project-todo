import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Todo = ({
  id,
  name,
  completed,
  toggleTaskCompleted,
  deleteTask,
  editTask,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="space-y-4 relative top-10" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor={id} className="text-lg font-medium mb-2 top-20">
          New name for {name}
        </label>
        <input
          type="text"
          id={id}
          className="border-2 border-gray-600 p-2"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          ref={editFieldRef}
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          className="border border-gray-700 cursor-pointer px-4 py-2 capitalize bg-red-600 text-white"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="sr-only">renaming {name}</span>
        </button>
        <button
          ype="submit"
          className="border border-gray-700 cursor-pointer px-4 py-2 capitalize bg-black text-white"
        >
          {" "}
          Save <span className="sr-only"> new name for {name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="flex justify-between items-center space-y-4 relative -bottom-20">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
          className="mr-2 h-5 w-5 cursor-pointer"
        />
        <label htmlFor={id} className="text-lg">
          {name}
        </label>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          className="border border-gray-700 cursor-pointer px-4 py-1 capitalize"
          ref={editButtonRef}
          onClick={() => setEditing(true)}
        >
          Edit <span className="sr-only">{name}</span>
        </button>
        <button
          type="button"
          className="border border-gray-700 cursor-pointer px-4 py-2 capitalize bg-red-600 text-white"
          onClick={() => deleteTask(id)}
        >
          {" "}
          Delete <span className="sr-only">{name}</span>{" "}
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <li className="border-b border-gray-200 py-4">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
};
export default Todo;
