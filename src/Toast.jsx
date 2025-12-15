export default function Toast({ message, show, type = "success" }) {
  const typeStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        fixed top-6 right-6 px-6 py-3 rounded-lg shadow text-white
        transition transform
        ${typeStyles[type]}
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
      style={{ transitionDuration: "300ms" }}
    >
      {message}
    </div>
  );
}
