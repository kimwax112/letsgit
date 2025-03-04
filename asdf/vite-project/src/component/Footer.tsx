export const Footer = () => {
  return (
    <footer className="mt-[467px] w-full max-md:mt-10">
      <div className="flex flex-wrap gap-5 justify-between items-start max-md:max-w-full">
        <section className="self-stretch max-md:max-w-full">
          <div className="flex gap-5 text-2xl font-bold whitespace-nowrap text-slate-600">
            <button className="flex-1 px-16 py-4 rounded-md border border-solid border-slate-600 max-md:px-5">
              고객센터
            </button>
            <button className="flex-1 px-14 py-4 rounded-md border border-solid border-slate-600 max-md:px-5">
              전문가센터
            </button>
          </div>
          <div className="flex flex-col pl-2 mt-8 text-lg max-md:max-w-full">
            <p className="self-start text-neutral-400">
              10:30 ~ 18:00 (점심시간 13:00 ~ 14:00)
              <br />
              주말, 공휴일 휴무
            </p>
            <p className="px-16 py-2.5 mt-8 rounded-md bg-slate-300 text-slate-400 max-md:px-5 max-md:max-w-full">
              여기는 서비스 중개 플랫폼이예요.작업 의뢰는 전문가에게 문의해
              주세요.
            </p>
          </div>
        </section>

        <nav className="flex gap-20">
          <section>
            <h2 className="text-2xl font-bold text-zinc-500">정보</h2>
            <ul className="mt-6 text-lg text-neutral-400">
              <li>서비스 소개</li>
              <li className="mt-4">인재영업</li>
              <li className="mt-4">제휴 광고</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-500">관련 사이트</h2>
            <ul className="mt-6 text-lg text-neutral-400">
              <li>블로그</li>
              <li className="mt-4">인스타그램</li>
              <li className="mt-4">유튜브</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-zinc-500">지원</h2>
            <ul className="mt-5 text-lg text-neutral-400">
              <li>공지사항</li>
              <li className="mt-4">자주 묻는 질문</li>
              <li className="mt-4">약관 및 정책</li>
              <li className="mt-4 font-bold">개인정보처리방침</li>
            </ul>
          </section>
        </nav>
      </div>

      <hr className="mt-10 border-zinc-500" />

      <p className="text-center mt-8 text-base text-neutral-400">
        (주)중개 플랫폼 | 경기도 부천시 원미구 신흥로56번길 25, 6층 | 팀장 : |
        팀원 : | 사업자등록번호 : 123-45-67891통신판매업신고 :
        2025-부천시초-1234 | 유료직업소개사업등록번호 :
        제2025-12345678-91-0-12345호 | 고객센터 : 1234-1234 | 호스팅 사업자 :
        Bucheon(Bu) | 1:1 문의하기
      </p>

      <p className="text-center mt-9 text-sm text-neutral-400">
        (주)중개플랫폼은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품,
        상품정보, 거래에 관한 의무와 책임은 판매회원에게 있습니다.
        <br />
        (주)중개 플랫폼의 상품/판매회원/중개 서비스/거래 정보, 콘텐츠, UI 등에
        대한 무단복제, 전송, 배포, 스크래핑 등의 행위는 저작권법, 콘텐츠산업
        진흥법 등 관련법령에 의하여 엄격히 금지됩니다.
      </p>

      <p className="text-center mt-8 text-base text-neutral-300">
        Copyright © 2025 kmong Inc. All rights reserved.
      </p>
    </footer>
  );
};
