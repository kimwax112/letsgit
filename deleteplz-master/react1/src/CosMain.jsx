import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton'; // ✅ 로그아웃 버튼 추가
import './CosMainCss.css';

export default function CosMain() {
    const [name, setName] = useState("");

    useEffect(() => {
        // localStorage에서 사용자 이름 불러오기
        const storedName = localStorage.getItem("name") || "Guest";
        setName(storedName);
    }, []);

    return (
        <div>
            <div className='WholeWrapper'>
                <div className='LogoStuff'>
                    <img src="image/image.png" alt="이미지없음"></img>
                    <div className='Buttons1' style={{ marginLeft: 'auto' }}>
                        {name} 님, 환영합니다!
                        <LogoutButton />  {/* ✅ 기존 로그아웃 버튼 대신 컴포넌트 사용 */}
                        <button className='ButtonAtLogo' style={{ backgroundColor: '#4A6171' }}>고객센터</button>
                    </div>
                </div>
                <div className='MenuBar'>
                    <nav>
                        <ul>
                            <li><a href='#'>직접 의류 디자인</a></li>
                            <li><a href='#'>제작 의뢰 맡기기</a></li>
                            <li><a href='#'>대화방</a></li>
                            <li><a href='#'>계약 관리</a></li>
                        </ul>
                    </nav>
                    <button className='ButtonAtLogo'>마이페이지</button>
                </div>
                <div className='ContentsWrapper'>
                    <div className='Content2'>
                        <div className='ImageSellleft'>
                            <img className="shortcutimage" src='image/clothesMaking.jpg' alt="옷이미지"></img>
                        </div>
                        <div className='ImageSell'>
                            <img className="shortcutimage" src='image/clothesMaking2.jpg' alt="옷이미지"></img>
                        </div>
                        <div className='ImageSellright'>
                            <img className="shortcutimage" src='image/clothesMaking.jpg' alt="옷이미지"></img>
                        </div>
                    </div>
                    <div className='Content3'>
                        <div className='ContentSell'>진행중인 계약</div>
                    </div>
                    <div className='Content3'>
                        <div className='ContentSell'>추천 디자이너 포트폴리오</div>
                    </div>
                    <div className='Content3'>
                        <div className='ContentSell'>추천 디자인</div>
                    </div>
                </div>
                <div className='ActiveInfo'></div>
                <div className='StaticInfo'>
                    (주)중개 플랫폼 | 경기도 부천시 원미구 신흥로56번길 25, 6층 | 팀장 :  | 팀원 :  | 사업자등록번호 : 123-45-67891
                    <br />
                    통신판매업신고 : 2025-부천시초-1234 | 유료직업소개사업등록번호 : 제2025-12345678-91-0-12345호 | 고객센터 : 1234-1234 | 호스팅 사업자 : Bucheon(Bu) | 1:1 문의하기
                    <br /><br /><br />
                    (주)중개플랫폼은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매회원에게 있습니다.
                    <br />
                    (주)중개 플랫폼의 상품/판매회원/중개 서비스/거래 정보, 콘텐츠, UI 등에 대한 무단복제, 전송, 배포, 스크래핑 등의 행위는 저작권법, 콘텐츠산업 진흥법 등 관련법령에 의하여 엄격히 금지됩니다.
                    <br /><br />
                    Copyright © 2025 kmong Inc. All rights reserved.
                </div>
            </div>
        </div>
    );
}
