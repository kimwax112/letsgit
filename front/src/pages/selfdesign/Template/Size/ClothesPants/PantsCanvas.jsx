import React, { useRef, useEffect, useState } from 'react';

const PantsOutlineCanvas = () => {
  const canvasRef = useRef(null);

  // 바지 조절 상태
  const [waistWidth, setWaistWidth] = useState(100); // 허리단면
  const [rise, setRise] = useState(30);              // 밑위
  const [length, setLength] = useState(210);         // 총장
  const [thighWidth, setThighWidth] = useState(50);  // 허벅지단면
  const [hemWidth, setHemWidth] = useState(30);      // 밑단단면

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    const centerX = 150;
    const waistLeft = centerX - waistWidth / 2;
    const waistRight = centerX + waistWidth / 2;

    const crotchY = 50 + rise;
    const crotchX = centerX;

    const totalLength = 50 + length;

    const thighLeftX = centerX - thighWidth / 2;
    const thighRightX = centerX + thighWidth / 2;

    const hemLeftX = thighLeftX - hemWidth / 2;
    const hemRightX = thighRightX + hemWidth / 2;

    ctx.beginPath();
    ctx.moveTo(waistLeft, 50);           // 허리 왼쪽
    ctx.lineTo(waistRight, 50);          // 허리 오른쪽
    ctx.lineTo(hemRightX, totalLength);  // 오른쪽 밑단
    ctx.lineTo(thighRightX, totalLength); // 오른쪽 허벅지
    ctx.lineTo(crotchX, crotchY);        // 가운데 위 (밑위)
    ctx.lineTo(thighLeftX, totalLength);  // 왼쪽 허벅지
    ctx.lineTo(hemLeftX, totalLength);    // 왼쪽 밑단
    ctx.closePath();
    ctx.stroke();
  }, [waistWidth, rise, length, thighWidth, hemWidth]);

  return (
    <div>
      <h3>바지 테두리 조절</h3>
      <canvas ref={canvasRef} width={300} height={400} style={{ border: '1px solid #ccc' }} />

      <div>
        <label>허리단면: {waistWidth}px</label>
        <input type="range" min="60" max="140" value={waistWidth} onChange={e => setWaistWidth(Number(e.target.value))} />
      </div>

      <div>
        <label>밑위: {rise}px</label>
        <input type="range" min="10" max="100" value={rise} onChange={e => setRise(Number(e.target.value))} />
      </div>

      <div>
        <label>총장: {length}px</label>
        <input type="range" min="150" max="280" value={length} onChange={e => setLength(Number(e.target.value))} />
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
  );
};

export default PantsOutlineCanvas;
