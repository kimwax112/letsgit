import React, { useRef, useEffect, useState } from 'react';
import './PantsCanvas.css'; // 스타일 파일을 추가하세요
// const PantsOutlineCanvas = () => {
  
//   waistWidth, rise, length, thighWidth, hemWidth
  // // 바지 조절 상태
  // const [waistWidth, setWaistWidth] = useState(100); // 허리단면
  // const [rise, setRise] = useState(30);              // 밑위
  // const [length, setLength] = useState(210);         // 총장
  // const [thighWidth, setThighWidth] = useState(50);  // 허벅지단면
  // const [hemWidth, setHemWidth] = useState(30);      // 밑단단면

export default function PantsOutlineCanvas({
  waistWidth,    setWaistWidth, //허리단면
  rise,          setRise, // 밑외
  length,        setLength, // 총장
  thighWidth,    setThighWidth, // 허벅지단면
  hemWidth,      setHemWidth, // 밑단단면
  resetValues,
  isPreview = false, // FinalConfirmation에서 호출될 때 입력 컨트롤 숨기기

}) {
const canvasRef = useRef(null);

 useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth   = 2;

    // 1) 팬츠 윤곽 계산
    const centerX = 150;
    const waistLeft  = centerX - waistWidth / 2 - 10;
    const waistRight = centerX + waistWidth / 2 + 10;
    const crotchY    = 70 + rise;
    const totalLength = 100 + length;
    const thighLeftX  = centerX - thighWidth / 2 - 20;
    const thighRightX = centerX + thighWidth / 2 + 20;
    const hemLeftX    = thighLeftX - hemWidth / 2 - 20;
    const hemRightX   = thighRightX + hemWidth / 2 + 20;

    ctx.beginPath();
    ctx.moveTo(waistLeft, 50);
    ctx.lineTo(waistRight, 50);
    ctx.lineTo(hemRightX, totalLength);
    ctx.lineTo(thighRightX, totalLength);
    ctx.lineTo(centerX, crotchY);
    ctx.lineTo(thighLeftX, totalLength);
    ctx.lineTo(hemLeftX, totalLength);
    ctx.closePath();
    ctx.stroke();

    // 2) 벨트 그리기
    const beltHeight = 8;
    const beltY      = 50 - beltHeight + 5;
    ctx.fillStyle = '#555';
    ctx.fillRect(waistLeft - 5, beltY, (waistRight + 5) - (waistLeft - 5), beltHeight);

    // 벨트 고리
    ctx.fillStyle = '#333';
    const loopWidth  = 6;
    const loopHeight = beltHeight + 2;
    const loopY      = beltY - 1;
    const numLoops   = 3;
    for (let i = 0; i < numLoops; i++) {
      const x = waistLeft + (i + 1) * ((waistRight - waistLeft) / (numLoops + 1)) - loopWidth / 2;
      ctx.fillRect(x, loopY, loopWidth, loopHeight);
    }

    // // 3) 포켓 위치 계산 (허리 너비 기준)
    // const leftPocketX  = waistLeft + (waistRight - waistLeft) * 0.10;
    // const rightPocketX = waistLeft + (waistRight - waistLeft) * 0.90;
    // // 각 포켓의 세로 오프셋 (음수 → 위, 양수 → 아래)
    // const leftPocketYpos  = crotchY - 20;
    // const rightPocketYpos = crotchY - 20;

    // // 4) 사이드 포켓 (반원) 그리기
    // ctx.strokeStyle = '#333';
    // ctx.lineWidth   = 1.5;
    // const pocketR   = 17;
    // const tiltAngle = Math.PI / 6;

    // // 왼쪽 반원
    // ctx.beginPath();
    // ctx.arc(
    //   leftPocketX,
    //   leftPocketYpos,
    //   pocketR,
    //   Math.PI/2  + tiltAngle,
    //   Math.PI*3/2 + tiltAngle,
    //   true
    // );
    // ctx.stroke();

    // // 오른쪽 반원
    // ctx.beginPath();
    // ctx.arc(
    //   rightPocketX,
    //   rightPocketYpos,
    //   pocketR,
    //   Math.PI*3/2 - tiltAngle,
    //   Math.PI/2  - tiltAngle,
    //   true
    // );
    // ctx.stroke();

  if (!isPreview) {
      try {
        const imageData = canvas.toDataURL('image2/png');
        localStorage.setItem('pantsCanvasImage', imageData);
      } catch (e) {
        console.error('localStorage 저장 오류:', e);
      }
    }
  }, [waistWidth, rise, length, thighWidth, hemWidth, isPreview]);
  

  const handleInputChange = (setter, min, max) => (e) => {
    let val = e.target.value;
    if (val === '') {
      setter(val);
      return;
    }
    val = Number(val);
    if (isNaN(val)) return;
    if (val < min) val = min;
    if (val > max) val = max;
    setter(val);
  };


  

  return (
    <div className="canvas-adjust" style={{ textAlign: 'center' }}>
      <div className="size-spec-layout">
        <div className="size-spec-container">
      
      <canvas ref={canvasRef} 
      width={300} 
      height={300} 
      style={{ margin :"3px", border: '2px solid #ccc' , borderRadius: '10px', backgroundColor: '#f9f9f9' }}
      >

      </canvas>

     <div className="cliders-grid">
        <div style={{ marginTop: '1rem' }}>
        <h4>총장: {length}px</h4>
        <input 
          type="range"
          min={97}
          max={106}
          step={0.25}
          value={length}
          onChange={e => setLength(Number(e.target.value))}
          
           />
           <input
                type="number"
                min={97}
                max={106}
                step={0.25}
                value={length}
                onChange={handleInputChange(setLength, 97, 106)}
                style={{ width: 70, marginLeft: 10 }}
              />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>허리단면: {waistWidth}px</h4>
          <input type="range"
          min={72} 
          max={96}
          value={waistWidth} 
          onChange={e => setWaistWidth(Number(e.target.value))}
          style={{ width: '80%' }}
          />
          <input
              type="number"
              min={72} 
              max={96}
              value={waistWidth} 
              onChange={handleInputChange(setWaistWidth, 72, 96)}
              style={{ width: 70, marginLeft: 10 }}
              />
        </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>밑위: {rise}px</h4>
        <input
          type="range"
          min="10" 
          max="100" 
          value={rise} 
          onChange={e => setRise(Number(e.target.value))}
          style={{ width: '80%' }}
           />
           <input
              type="number"
              min={26} 
              max={32}
              value={rise} 
              onChange={handleInputChange(setRise, 26, 32)}
              style={{ width: 70, marginLeft: 10 }}
              />
      </div>

     

          <div style={{ marginTop: '1rem' }}>
        <h4>허벅지단면: {thighWidth}px</h4>
        <input
          type="range"
          min={27}
          max={46}
          value={thighWidth} 
          onChange={e => 
          setThighWidth(Number(e.target.value))}
          style={{ width: '80%' }}

           />
            <input
              type="number"
              min={27} 
              max={46}
              value={thighWidth} 
              onChange={handleInputChange(setThighWidth, 26, 32)}
              style={{ width: 70, marginLeft: 10 }}
              />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4>밑단단면: {hemWidth}px</h4>
        <input 
        type="range" 
        min={34}
        max={40}
        value={hemWidth} 
        onChange={e => setHemWidth(Number(e.target.value))}
        style={{ width: '80%' }}
         />
         <input
              type="number"
              min={27} 
              max={46}
              value={hemWidth} 
              onChange={handleInputChange(setHemWidth, 26, 32)}
              style={{ width: 70, marginLeft: 10 }}
              />
        <button
                onClick={resetValues}
                style={{
                  marginTop: '2rem',
                  backgroundColor: 'rgb(157, 187, 213)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  width: "100%",
                }}
              >
                초기화
              </button>
      </div>
    </div>
    </div>
    </div>
    </div>
  
    
  );
};


