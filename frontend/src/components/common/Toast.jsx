export default function Toast({ isOpen, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300">
      <div className="w-6 h-6 rounded-full bg-white text-emerald-600 flex items-center justify-center font-bold text-sm">
        ✓
      </div>
      <span className="font-semibold text-sm">{message}</span>
    </div>
  );
}
