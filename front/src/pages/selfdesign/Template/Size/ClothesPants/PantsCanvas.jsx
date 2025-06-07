import React, { useRef, useEffect, useState } from 'react';

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

    // 3) 포켓 위치 계산 (허리 너비 기준)
    const leftPocketX  = waistLeft + (waistRight - waistLeft) * 0.10;
    const rightPocketX = waistLeft + (waistRight - waistLeft) * 0.90;
    // 각 포켓의 세로 오프셋 (음수 → 위, 양수 → 아래)
    const leftPocketYpos  = crotchY - 20;
    const rightPocketYpos = crotchY - 20;

    // 4) 사이드 포켓 (반원) 그리기
    ctx.strokeStyle = '#333';
    ctx.lineWidth   = 1.5;
    const pocketR   = 17;
    const tiltAngle = Math.PI / 6;

    // 왼쪽 반원
    ctx.beginPath();
    ctx.arc(
      leftPocketX,
      leftPocketYpos,
      pocketR,
      Math.PI/2  + tiltAngle,
      Math.PI*3/2 + tiltAngle,
      true
    );
    ctx.stroke();

    // 오른쪽 반원
    ctx.beginPath();
    ctx.arc(
      rightPocketX,
      rightPocketYpos,
      pocketR,
      Math.PI*3/2 - tiltAngle,
      Math.PI/2  - tiltAngle,
      true
    );
    ctx.stroke();

  if (!isPreview) {
      try {
        const imageData = canvas.toDataURL('image2/png');
        localStorage.setItem('pantsCanvasImage', imageData);
      } catch (e) {
        console.error('localStorage 저장 오류:', e);
      }
    }
  }, [waistWidth, rise, length, thighWidth, hemWidth, isPreview]);
  




  

  return (
    <div className="canvas-adjust" style={{ textAlign: 'center', marginTop: '2rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
      <div className="size-spec-layout">
        <div className="size-spec-container">
      
      <h3>바지 테두리 조절</h3>
      <canvas ref={canvasRef} width={300} height={400} style={{ border: '1px solid #ccc' }} />

     <div className="cliders-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '1.5rem',
              marginTop: '2rem',
              justifyItems: 'center',
            }}
          >
        <label>총장: {length}px</label>
        <input type="range" min="150" max="280" value={length} onChange={e => setLength(Number(e.target.value))} />
      </div>

      <div>
        <label>허리단면: {waistWidth}px</label>
        <input type="range" min="60" max="140" value={waistWidth} onChange={e => setWaistWidth(Number(e.target.value))} />
      </div>

      <div>
        <label>밑위: {rise}px</label>
        <input type="range" min="10" max="100" value={rise} onChange={e => setRise(Number(e.target.value))} />
      </div>

     

      <div>
        <label>허벅지단면: {thighWidth}px</label>
        <input type="range" min="30" max="100" value={thighWidth} onChange={e => setThighWidth(Number(e.target.value))} />
      </div>

      <div>
        <label>밑단단면: {hemWidth}px</label>
        <input type="range" min="10" max="80" value={hemWidth} onChange={e => setHemWidth(Number(e.target.value))} />
      </div>
    </div>
    </div>
  </div>
    
  );
};


