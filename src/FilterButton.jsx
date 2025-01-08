function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button
      type="button"
      className={`relative border ${
        isPressed ? "border-gray-700 underline" : "border-gray-300"
      } cursor-pointer px-4 py-2 capitalize top-9`}
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="sr-only"> Show</span>
      <span>{name}</span>
      <span className="sr-only"> tasks</span>
    </button>
  );
}

export default FilterButton;
