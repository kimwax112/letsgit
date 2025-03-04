export const Navigation = () => {
  return (
    <nav className="flex flex-wrap gap-10 py-4 pr-6 pl-20 mt-3.5 w-full text-base font-bold text-white bg-slate-400 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-10 my-auto max-md:max-w-full">
        <a href="#" className="grow">
          직접 의류 디자인
        </a>
        <a href="#">의뢰서 작성</a>
        <a href="#" className="basis-auto">
          제작 의뢰 맡기기
        </a>
        <a href="#">대화방</a>
        <a href="#">계약 관리</a>
        <a href="#">의뢰 관리</a>
      </div>
      <button className="px-5 py-2.5 whitespace-nowrap rounded-xl border border-white border-solid">
        마이페이지
      </button>
    </nav>
  );
};
