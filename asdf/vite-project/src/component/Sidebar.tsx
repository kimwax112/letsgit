"use client";
import { useState } from "react";

export const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { kr: "상의", en: "Top" },
    { kr: "아우터", en: "Outer" },
    { kr: "바지", en: "Pants" },
    { kr: "원피스", en: "Onepiece" },
    { kr: "스커트", en: "Skirt" },
    { kr: "스니커즈", en: "Sneakers" },
    { kr: "신발", en: "Shoes" },
    { kr: "가방", en: "Bag" },
  ];

  return (
    <aside className="w-[33%] max-md:ml-0 max-md:w-full">
      <h1 className="z-10 mr-6 ml-6 text-4xl text-black max-md:mx-2.5">
        디자이너 찾기
      </h1>
      <div className="flex overflow-hidden flex-col items-start py-52 pr-2 pl-8 w-full border border-white border-solid max-md:py-24 max-md:pl-5">
        <section className="flex ml-5 max-md:ml-2.5">
          <div className="flex overflow-hidden flex-col px-6 py-5 rounded-xl border border-solid border-slate-400 max-md:px-5">
            <h2 className="self-start text-lg text-black">결과내 검색</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex shrink-0 mt-2 bg-white border border-solid border-slate-400 h-[50px] w-[166px] max-md:mr-2 max-md:ml-1.5"
            />
            <div className="flex gap-2.5 mt-2.5 w-full">
              <label className="flex gap-2.5 text-lg font-thin text-stone-400">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 border-neutral-400"
                />
                검색어 제외
              </label>
              <button className="px-2 text-lg font-thin text-center whitespace-nowrap bg-white rounded-md border border-solid border-slate-400 text-slate-400">
                적용
              </button>
            </div>
          </div>
        </section>

        <nav className="w-full mt-20">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`#${category.en.toLowerCase()}`}
              className="flex overflow-hidden gap-8 px-5 py-5 text-base font-bold border-b border-slate-400"
            >
              <span className="font-extrabold text-black">{category.kr}</span>
              <span className="basis-auto text-neutral-300">{category.en}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};
