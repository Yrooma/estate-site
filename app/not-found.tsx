export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">404 - الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-4">عذراً، الصفحة التي تبحث عنها غير موجودة</p>
        <a
          href="/"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          العودة للصفحة الرئيسية
        </a>
      </div>
    </div>
  );
} 