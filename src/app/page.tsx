import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* 主标题 */}
      <h1 className="text-4xl font-bold text-blue-600 mb-8 animate-fade-in">
        Hello! Welcome to RainMaker`s Playground.
      </h1>

      {/* 跳转按钮 */}
      <Link
        href="/pages/poetry"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg 
                   hover:bg-blue-600 transition-colors duration-300
                   shadow-lg hover:shadow-blue-500/30"
      >
        点击探索更多 →
      </Link>
    </div>
  );
}
