import React from 'react';
import "./CosMainCss.css";
import { MainBanner } from "../index"; // MainBanner 컴포넌트 임포트 (배너 랜덤 선택 처리)
import {Navbar,Footer, Header} from "../../components";
import OngoingContract from '../../components/OngoingContract/OngoingContract';
import DesignerPortfolio from '../../components/DesignerPortfolio/DesignerPortfolio';
import RecommendedDesign from '../../components/RecommendedDesign/RecommendedDesign'

export default function CosMain() {
  return (
    <div>
        <div className='WholeWrapper'>            
            <div className='ContentsWrapper'>
                <MainBanner />  {/* MainBanner로 랜덤 배너 처리 */}

                <div className='Content-Sell'>
                    <h2>진행중인 계약</h2>
                    <p>현재 진행중인 계약을 살펴보세요.</p>
                    <div className='Content-Sell2'>
                        <OngoingContract/>
                        <OngoingContract/>
                        <OngoingContract/>
                    </div>
                </div>
                <div className='DesignerPortfolio-Sell'>
                    <h2>추천 디자이너 포트폴리오</h2>
                    <p>현재 인기 많은 디자이너들의 포트폴리오를 감상하시고 새로운 디자인을 만들어 보세요!</p>
                    <div className='DesignerPortfolio-Sell2'>
                        <DesignerPortfolio/>
                        <DesignerPortfolio/>
                        <DesignerPortfolio/>
                        <DesignerPortfolio/>
                    </div>
                </div>
                <div className='RecommendedDesign-Sell'>
                    <div className='RecommendedDesign-Sell2'>
                        <h2 className='Recomm-title'>추천 디자인</h2>
                        <p Recomm-text>
                            디자인사이에서 추천하는<br/>
                            디자이너들을 확인하세요!<br/>
                            여러 디자인과 함께 멋진<br/>
                            결과물들을 만들어 행복한<br/>
                            추억을 얻으세요<br/>
                            디자인사이에서 추천하는<br/>
                            디자이너들을 확인하세요!<br/>
                            여러 디자인과 함께 멋진<br/>
                            결과물들을 만들어 행복한<br/>
                            추억을 얻으세요
                        </p>
                        <button>자세히 보기</button>
                    </div>
                    <div className='RecommendedDesign-Sell3'>
                        <RecommendedDesign/>
                    </div>
                </div>
            </div> 
        </div>
    </div>
  );
}
