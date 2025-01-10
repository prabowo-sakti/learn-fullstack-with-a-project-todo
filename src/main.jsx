import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CekTimer from "./CekTimer.jsx";
import AutoFocusInput from "./UseRefFocus.jsx";

const DATA = [
  { id: "todo-0", message: "Eat", completed: true },
  { id: "todo-1", message: "Sleep", completed: false },
  { id: "todo-2", message: "Repeat", completed: false },
];

createRoot(document.getElementById("root")).render(
  <>
    {/* <CekTimer /> */}
    {/* <AutoFocusInput /> */}
    <App initialTasks={DATA} />
  </>
);
