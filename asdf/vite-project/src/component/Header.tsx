export const Header = () => {
  return (
    <header className="flex flex-wrap gap-5 justify-between self-end mr-7 w-full text-xs font-bold text-white max-w-[1259px] max-md:mr-2.5 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/031dadb8a801250f6bd993d553df957a49442e07ef8c57829391740647f5dad6?placeholderIfAbsent=true&apiKey=6f59844988ec4f37aebe996720513a45"
        className="object-contain shrink-0 max-w-full aspect-[3.98] w-[231px]"
        alt="Company Logo"
      />
      <nav className="flex gap-1.5 my-auto">
        <p className="grow my-auto text-slate-600">Sample 님, 환영합니다!</p>
        <button className="px-3 py-1.5 text-center whitespace-nowrap rounded-md bg-zinc-800">
          로그아웃
        </button>
        <button className="px-3 py-1.5 text-center whitespace-nowrap rounded-md bg-slate-600">
          고객센터
        </button>
      </nav>
    </header>
  );
};
