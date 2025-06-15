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
  const [note, setNote] = useState("");

  const [username, setUsername] = useState(null);  // 상태로 username 관리

  // 저장할 영역 ref
  const captureRef = useRef(null);

  // 로그인 세션을 백엔드에서 받아와 sessionStorage에 저장 + 상태 세팅
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/checkSession", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          sessionStorage.setItem("username", data.username);
          setUsername(data.username);
        } else {
          alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("세션 확인 오류:", error);
        alert("로그인 세션 확인 중 오류가 발생했습니다.");
        window.location.href = "/login";
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    // username이 있을 때만 sessionStorage에서 데이터 불러오기
    if (!username) return;

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
  }, [username]);

  const handleSubmit = async () => {
  if (!designName.trim()) {
    alert("디자인 이름을 입력해주세요.");
    return;
  }

  if (!captureRef.current) {
    alert("디자인 영역을 찾을 수 없습니다.");
    return;
  }

  try {
    setLoading(true);

    // 1. 캔버스 이미지 생성 및 base64 획득
    const canvas = await html2canvas(captureRef.current);
    const imgData = canvas.toDataURL("image/png").replace(/\s/g, ""); // 🔧 이 부분

    // 2. 색상 데이터 포맷팅
    const formattedColors = Object.entries(selectedColors).map(([id, color]) => ({
      id: String(id),
      color: color,
    }));
    const finalColor = formattedColors.length > 0 ? formattedColors[0].color : "#ffffff";

    // 3. 서버에 보낼 최종 데이터 객체
    const finalData = {
      username,
      designName: designName.trim(),
      clothingType: selectedItem ? selectedItem.name : "",
      fabricJson: JSON.stringify(selectedFabric.map(f => f.name)),
      colorsJson: JSON.stringify(
        formattedColors.length > 0 ? formattedColors : [{ color: finalColor }]
      ),
      size: selectedSize,
      category: "template",
      note,
      designImageBase64: imgData, // 캡처한 이미지 base64 넣기
    };

    console.log("전송하는 finalData:", finalData);

    // 4. POST 요청
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
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  // 이미지 저장 함수
  const saveAsImage = () => {
    if (!captureRef.current) return;

    html2canvas(captureRef.current).then((canvas) => {
      //const canvas = await html2canvas(captureRef.current);
      const imgData = canvas.toDataURL("image/png").replace(/\s/g, ""); // 🔧 이 부분
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

          <section className="summary-section" ref={captureRef}>
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