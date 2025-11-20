export default function Toast({ message, show }) {
  return (
    <div
      className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow text-white bg-green-600 transition
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
      style={{ transitionDuration: "300ms" }}
    >
      {message}
    </div>
  );
}
