import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CekTimer from "./CekTimer.jsx";
import AutoFocusInput from "./UseRefFocus.jsx";

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <CekTimer /> */}
    {/* <AutoFocusInput /> */}
    <App initialTasks={DATA} />
  </StrictMode>
);
