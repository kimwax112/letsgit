// FinalConfirmation.jsx
import React, { useState, useEffect, useRef } from "react";
import { Sidebar, BreadCrumb } from "../../../../components";
import "./FinalConfirmation.css";
import html2canvas from "html2canvas";

const getColorName = (hex) => {
  const colorMap = {
    "#ff0000": "빨강",
    "#00ff00": "초록",
    "#0000ff": "파랑",
    "#ff9900": "주황",
    "#0099ff": "하늘",
  };
  return colorMap[hex] || "알 수 없음";
};

const ColorCircle = ({ color }) => (
  <span
    className="color-circle"
    style={{ backgroundColor: color }}
    aria-label={getColorName(color)}
    title={getColorName(color)}
  />
);

const FinalConfirmation = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [designName, setDesignName] = useState("");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");  // 메모 상태 추가

  const id = sessionStorage.getItem("id") || localStorage.getItem("id");

  // 저장할 영역 ref
  const captureRef = useRef(null);

  useEffect(() => {
    //console.log("🔍 useEffect 실행됨, id:", id);
    //if (!id) {
    //  alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
    // window.location.href = "/login";
    //  return;
    //} 
    
    const storedClothing =
      sessionStorage.getItem("selectedClothing") ||
      localStorage.getItem("selectedClothing");

    if (storedClothing) {
      try {
        setSelectedItem(JSON.parse(storedClothing));
      } catch (e) {
        console.error("selectedClothing JSON parse error:", e);
        setSelectedItem(null);
      }
    }

    const storedFabric =
      sessionStorage.getItem("selectedFabric") || localStorage.getItem("selectedFabric");
    const storedColors =
      sessionStorage.getItem("selectedColors") || localStorage.getItem("selectedColors");
    const storedSize =
      sessionStorage.getItem("selectedSize") || localStorage.getItem("selectedSize");

    if (storedFabric) setSelectedFabric(JSON.parse(storedFabric) || []);
    if (storedColors) setSelectedColors(JSON.parse(storedColors) || {});
    if (storedSize) setSelectedSize(storedSize);
  }, [id]);

  const handleSubmit = async () => {
    if (!designName.trim()) {
      alert("디자인 이름을 입력해주세요.");
      return;
    }

    const formattedColors = Object.entries(selectedColors).map(([id, color]) => ({
      id: String(id),
      color: color,
    }));

    const finalColor = formattedColors.length > 0 ? formattedColors[0].color : "#ffffff";

    const finalData = {
      id,
      designName: designName.trim(),
      clothingType: selectedItem,
      fabricJson: JSON.stringify(selectedFabric.map(f => f.name)),
      colorsJson: JSON.stringify(
        formattedColors.length > 0 ? formattedColors : [{ color: finalColor }]
      ),
      size: selectedSize,
      category: "template",
      note,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8081/designs/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
        credentials: "include",
      });

      if (response.ok) {
        alert("디자인이 성공적으로 저장되었습니다.");
      } else {
        const errorResponse = await response.json();
        alert("저장 실패: " + (errorResponse.message || "알 수 없는 오류 발생"));
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 이미지 저장 함수
  const saveAsImage = () => {
    if (!captureRef.current) return;

    html2canvas(captureRef.current).then((canvas) => {
      // 캔버스를 이미지 데이터 URL로 변환
      const imgData = canvas.toDataURL("image/png");

      // 이미지 다운로드용 링크 생성
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${designName || "design"}_confirmation.png`;
      link.click();
    }).catch((error) => {
      alert("이미지 저장 중 오류가 발생했습니다.");
      console.error(error);
    });
  };

    return (
    <div className="final-container">
      <div className="layout1">
        <aside>
          <Sidebar activePage={4} />
        </aside>
        <main className="content1">
          <BreadCrumb activePage={4} />
          <h3>4. 최종 확인</h3>
          <hr />

          {/* 캡처할 영역 전체를 감싸는 ref */}
          <section className="summary-section" ref={captureRef}>
            
            {/* 디자인 이름 입력란 - 제일 위로 이동 */}
            <div className="summary-item design-name-input">
              <label htmlFor="designName" className="label">
                디자인 이름:
              </label>
              <input autoFocus
                placeholder="디자인 이름을 입력하세요"
                id="designName"
                type="text"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
              />
            </div>

            <div className="summary-item">
              <span className="label">선택한 의류 종류:</span>
              <span className="value">
                {selectedItem
                  ? `${selectedItem.category || ""} > ${selectedItem.item || ""}`
                  : "미선택"}
              </span>
            </div>

            <div className="summary-item fabric-list">
              <span className="label">선택한 원단 및 혼합율:</span>
              <div className="value">
                {selectedFabric.length > 0 ? (
                  selectedFabric.map((f) => (
                    <div key={f.id} className="fabric-item">
                      <img src={f.imageSrc} alt={f.name} className="fabric-img" />
                      <div className="fabric-info">
                        <div className="fabric-name">{f.name}</div>
                        <div>혼합율: {f.mixingRatio || 0}%</div>
                        <div>
                          색상:{" "}
                          <ColorCircle
                            color={selectedColors[f.id] || f.initialColor}
                          />{" "}
                          {getColorName(selectedColors[f.id] || f.initialColor)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  "미선택"
                )}
              </div>
            </div>

            <div className="summary-item">
              <span className="label">선택한 사이즈:</span>
              <span className="value">{selectedSize || "미선택"}</span>
            </div>

            {/* 메모 입력란 */}
            <div className="summary-item note-input">
              <label htmlFor="note" className="label">
                메모 또는 요청사항:
              </label>
              <textarea
                id="note"
                placeholder="제작자에게 남기고 싶은 내용을 입력하세요."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                style={{ width: "100%" }}
              />
            </div>
          </section>

          <footer className="footer">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="submit-btn"
            >
              {loading ? "저장 중..." : "저장하기"}
            </button>
            <button type="button" onClick={saveAsImage} className="pdf-btn">
              이미지로 저장하기
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default FinalConfirmation;