// app/poems/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { PoetryDetailPageImageList } from "../config";

// 扩展的诗词详情数据接口
interface PoemDetail {
  id: number;
  title: string;
  contentEn: string;
  contentZh: string;
  note: string;
  image: string;
  create_time: string;
}

async function getPoemDetail(id: string): Promise<PoemDetail | null> {
  try {
    const response = await fetch(
      `https://www.qingsweetdays.top/api/poetry/${id}`,
      {
        // next: { revalidate: 3600 }, // ISR 每1小时重新验证
      }
    );

    if (!response.ok) throw new Error("数据获取失败");
    return response.json();
  } catch (error) {
    console.error("获取诗词详情失败:", error);
    return null;
  }
}

// 模拟数据（实际应从API或数据库获取）

export default async function PoemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const poem = await getPoemDetail(id);

  const imgIdx = Number(id) % PoetryDetailPageImageList.length;
  const imgUrl = PoetryDetailPageImageList[imgIdx];

  if (!poem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-600">诗篇加载失败，请稍后重试</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按钮 */}
      <nav className="container mx-auto px-4 py-4">
        <Link
          href="/pages/poetry"
          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
        >
          ← 返回诗集列表
        </Link>
      </nav>

      {/* 主要内容区 */}
      <main className="container mx-auto px-4 py-8">
        {/* 标题区 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {poem.title}
          </h1>
          <p className="text-gray-600">
            更新时间：{new Date(poem.create_time).toLocaleString()}
          </p>
        </div>

        {/* 图文内容区 */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* 图片区 */}
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imgUrl}
              alt={poem.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 文本内容区 */}
          <div className="space-y-8">
            {/* 英文原文 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gold-500 pb-2">
                原文
              </h2>
              <pre className="whitespace-pre-wrap font-serif text-gray-700 leading-relaxed">
                {poem.contentEn}
              </pre>
            </section>

            {/* 中文译文 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gold-500 pb-2">
                译文
              </h2>
              <div className="font-serif text-gray-700 leading-relaxed space-y-4">
                {poem.contentZh}
              </div>
            </section>

            {/* 注释 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gold-500 pb-2">
                注释
              </h2>
              <pre className="list-disc  space-y-3 text-gray-600">
                {poem.note}
              </pre>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  // 预获取所有诗词ID
  const response = await fetch(`https://www.qingsweetdays.top/api/daily/all`);
  const ids: number[] = await response.json();

  return ids.map((id) => ({
    id: id.toString(),
  }));
}
