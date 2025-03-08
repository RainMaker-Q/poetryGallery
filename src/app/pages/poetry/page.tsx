import Link from "next/link";
import Image from "next/image";
import { PoetryDetailPageImageList, PoetryImage } from "./config";

interface IPoetry {
  id: number;
  number: number;
  title: string;
  // status: 0,
  create_time: string;
  update_time: string;
}

const PoetryPage = async () => {
  const res = await fetch("https://www.qingsweetdays.top/api/poetry/list");
  const list: IPoetry[] = await res.json();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部大标题 */}
      <header className="relative h-96 bg-gray-900 text-white">
        {/* 背景图 */}
        <div className="absolute inset-0">
          <Image
            src={PoetryImage.main} // 需要准备图片或使用在线图片
            alt="Shakespeare Background"
            fill
            className="object-cover opacity-70"
            priority
          />
        </div>

        {/* 标题内容 */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            威廉·莎士比亚诗集
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            穿越时空的文学经典
          </p>
        </div>
      </header>

      {/* 诗词卡片列表 */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((poem) => {
            const imgIdx = Number(poem.id) % PoetryDetailPageImageList.length;
            const imgUrl = PoetryDetailPageImageList[imgIdx];

            return (
              <Link
                href={`poetry/${poem.id}`}
                key={poem.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={imgUrl}
                    alt={poem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{poem.title}</h2>
                  {/* <p className="text-gray-600 mb-4">{poem.excerpt}</p> */}
                  <div className="text-sm text-blue-600">
                    更新时间: {new Date(poem.update_time).toLocaleString()}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default PoetryPage;
