function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button
      type="button"
      className={`border ${
        isPressed ? "border-gray-700 underline" : "border-gray-300"
      } cursor-pointer px-4 py-2 capitalize`}
      aria-pressed={isPressed}
    ></button>
  );
}
