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

  const wasEditing = usePrevious;
  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white shadow-lg rounded-md">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-2"
        />
        <span></span>
      </div>
    </div>
  );
};
export default Todo;
