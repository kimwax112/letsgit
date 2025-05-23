import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import './Mainpcss.css';

export default function Mainp() {
  const navigate = useNavigate();
  return (
    <div>
      
      <div className='divmcover'>
        <div className='MainLogo'>
          <img style={{margin:'60px'}}src="image/image.png" alt="디자인사이로고"></img>
        </div>
        <div className='divm-wrapper'>
          <div className='divm'>
            <img src="image/image51.png" alt="이미지가 없습니다"></img>
            <p style={{top: '20px', position:'relative', fontWeight:"bold", color:"#fff", fontSize:'25px'}}>
              의뢰인으로 시작하기
            </p>
            <button className='mainbaro' onClick={() => navigate('/client/Cosmain')}>바로가기</button>
          </div>
          <div className='divm'>
            <img src="image/Group 30.png" alt="이미지가 없습니다"></img>
            <p style={{top: '40px', position:'relative', fontWeight:"bold", color:"#fff", fontSize:'25px'}}> 
              디자이너로 시작하기
            </p>
            <button onClick={() => navigate('/designer/DesignerCosMain')} style = {{marginTop:'60px'}}className='mainbaro'>바로가기</button>
          </div>
        </div>

        {/* "여기도 영역임"을 divmcover 내부에서 divm-wrapper 아래로 배치 */}
        <div className='extra-section'>
          <button className='mainbaro2' 
            style={{backgroundColor:'#9DBBD5'}}
            onClick={() => navigate('/Welcome')}>
            로그인 바로가기
          </button>      
          <button className='mainbaro2' style={{backgroundColor:'#E6E6E6'}}  
            onClick={() => navigate('/SignIn')}>
            회원가입
          </button>
          <button className='mainbaro2' style={{backgroundColor:'#D4DAE6'}}>
            고객센터
          </button>
        </div>
      </div>
</div>

  )
}
