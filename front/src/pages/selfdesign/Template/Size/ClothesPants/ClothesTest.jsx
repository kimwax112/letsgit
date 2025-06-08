import React, { useEffect, useRef } from 'react';
import "./ClothesTest.css";

export default function ClothesTest({
  neckY, setNeckY,
  neckXOffset, setNeckXOffset,
  shoulderOffset, setShoulderOffset,
  chestOffset, setChestOffset,
  bodyLength, setBodyLength,
  armLengthFactor,setArmLengthFactor,
  upperWidthOffset, setUpperWidthOffset,
  lowerWidthOffset, setLowerWidthOffset,
  topBodyHeight, setTopBodyHeight,
  resetValues,
  isPreview = false, // FinalConfirmation에서 호출될 때 입력 컨트롤 숨기기
}) {
  const canvasRef = useRef(null);
  



  const drawShirt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const currentCenterX = (100 + 200) / 2;
    const offsetX = centerX - currentCenterX;

    const neckLeftX = 100 - shoulderOffset+ 38 - upperWidthOffset + offsetX;

    const shoulderLeftBase = { x: 40 + offsetX, y: 120 }; //

    const sleeveLeftBase = { x: 60 + offsetX, y: 10 };
    const sleeveRightBase = { x: 240 + offsetX, y: 10 };

    const midLeftShoulder = {
      x: (neckLeftX + shoulderLeftBase.x) / 2,
      y: (50 + shoulderLeftBase.y) / 2,
    };

    
    const leftShoulder = {
      x: shoulderLeftBase.x * armLengthFactor + midLeftShoulder.x * (1 - armLengthFactor ),
      y: shoulderLeftBase.y * armLengthFactor + midLeftShoulder.y * (1 - armLengthFactor ),
    };

    const leftSleeve = {
      x: sleeveLeftBase.x * armLengthFactor + midLeftShoulder.x * (1 - armLengthFactor),
      y: sleeveLeftBase.y * armLengthFactor + midLeftShoulder.y * (1 - armLengthFactor),
    };

    const neckRightX = 200 + shoulderOffset-38 + upperWidthOffset + offsetX;
    
    const shoulderRightBase = { x: 260 + offsetX, y: 120 };
    

    const midRightShoulder = {
      x: (neckRightX + shoulderRightBase.x) / 2,
      y: (50 + shoulderRightBase.y) / 2,
    };

    const rightShoulder = {
      x: shoulderRightBase.x * armLengthFactor + midRightShoulder.x * (1 - armLengthFactor ),
      y: shoulderRightBase.y * armLengthFactor + midRightShoulder.y * (1 - armLengthFactor ),
    };

    const rightSleeve = {
      x: sleeveRightBase.x * armLengthFactor+ midRightShoulder.x * (1 - armLengthFactor),
      y: sleeveRightBase.y * armLengthFactor+ midRightShoulder.y * (1 - armLengthFactor),
    };

    ctx.beginPath();
    ctx.moveTo(neckLeftX, 50);
    ctx.lineTo(leftShoulder.x  , leftShoulder.y);
    ctx.lineTo(leftShoulder.x + 20, leftShoulder.y + 15);

    
    ctx.lineTo(100 - chestOffset+82 + offsetX, 50 + topBodyHeight);
    ctx.lineTo(100 - lowerWidthOffset +90 + offsetX, bodyLength + 130);
    ctx.lineTo(200 + lowerWidthOffset -90 + offsetX, bodyLength + 130);
    ctx.lineTo(200 + chestOffset-82 + offsetX, 50 + topBodyHeight);

    ctx.lineTo(rightShoulder.x - 20, rightShoulder.y + 15);
    ctx.lineTo(rightShoulder.x, rightShoulder.y);
    ctx.lineTo(neckRightX, 50);
    ctx.lineTo(170 + neckXOffset-20 + offsetX+20, 40);
    ctx.quadraticCurveTo(150 + offsetX, neckY+82, 130 - neckXOffset + offsetX, 40);
    ctx.lineTo(neckLeftX, 50);
    
    
    
    
    

    ctx.closePath();
    ctx.stroke();
    // 캔버스를 이미지로 변환하여 localStorage에 저장
    if (!isPreview) {
      const imageData = canvas.toDataURL('image/png');
      try {
        localStorage.setItem('shirtCanvasImage', imageData);
      } catch (e) {
        console.error('localStorage 저장 오류:', e);
      }
    }
  };
    
  

  

  useEffect(() => {
    drawShirt();
  }, [neckY, neckXOffset, shoulderOffset, chestOffset, bodyLength, armLengthFactor, topBodyHeight, lowerWidthOffset]);

  
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
    <div className="canvas-adjust" style={{ textAlign: 'center', marginTop: '2rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
      <div className="size-spec-layout">
        <div className="size-spec-container">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            style={{ margin :"3px", border: '2px solid #ccc' , borderRadius: '10px', backgroundColor: '#f9f9f9' }}
          ></canvas>
          <div
            className="cliders-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '1.5rem',
              marginTop: '2rem',
              justifyItems: 'center',
            }}
          >
            <div style={{ marginTop: '1rem' }}>
              <h4>목 파임 </h4>
              <input
                type="range"
                min={18}
                max={21}
                step={0.25}
                value={neckY}
                onChange={(e) => setNeckY(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={18}
                max={21}
                step={0.25}
                value={neckY}
                onChange={handleInputChange(setNeckY, 50, 150)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>목 너비</h4>
              <input
                type="range"
                min={18}
                max={24}
                step={0.25}
                value={neckXOffset}
                onChange={(e) => setNeckXOffset(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={18}
                max={24}
                step={0.25}
                value={neckXOffset}
                onChange={handleInputChange(setNeckXOffset, -20, 15)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>어깨 단면</h4>
              <input
                type="range"
                min={38}
                max={50}
                step={0.25}
                value={shoulderOffset}
                onChange={(e) => setShoulderOffset(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={38}
                max={50}
                step={0.25}
                value={shoulderOffset}
                onChange={handleInputChange(setShoulderOffset, 0, 30)}
                style={{ width: 70, marginLeft: 10 }}
                
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>가슴 단면</h4>
              <input
                type="range"
                min={82}
                max={106}
                step={0.25}
                value={chestOffset}
                onChange={(e) => setChestOffset(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={82}
                max={105}
                step={0.25}
                value={chestOffset}
                onChange={handleInputChange(setChestOffset, 0, 30)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>총 기장</h4>
              <input
                type="range"
                min={67}
                max={77}
                step={0.25}
                value={bodyLength}
                onChange={(e) => setBodyLength(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={67}
                max={77}
                step={0.25}
                value={bodyLength}
                onChange={handleInputChange(setBodyLength, 150, 400)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>소매 기장</h4>
              <input
                type="range"
                min={1}
                max={5}
                step={0.01}
                value={armLengthFactor}
                onChange={(e) => setArmLengthFactor(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={1}
                max={5}
                step={0.25}
                value={armLengthFactor}
                onChange={handleInputChange(setArmLengthFactor, 0, 5)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>암홀(직선)</h4>
              <input
                type="range"
                min={40}
                max={52}
                step={0.25}
                value={topBodyHeight}
                onChange={(e) => setTopBodyHeight(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={40}
                max={52}
                step={0.25}
                value={topBodyHeight}
                onChange={handleInputChange(setTopBodyHeight, 10, 100)}
                style={{ width: 70, marginLeft: 10 }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4>밑단 단면</h4>
              <input
                type="range"
                min={90}
                max={114}
                step={0.25}
                value={lowerWidthOffset}
                onChange={(e) => setLowerWidthOffset(Number(e.target.value))}
                style={{ width: '80%' }}
              />
              <input
                type="number"
                min={90}
                max={114}
                step={0.25}
                value={lowerWidthOffset}
                onChange={handleInputChange(setLowerWidthOffset, 0, 50)}
                style={{ width: 70, marginLeft: 10 }}
              />
              <button
                onClick={resetValues}
                style={{
                  marginTop: '2rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
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
}