import React, { useState, useEffect } from "react";
import { Sidebar, BreadCrumb } from "../../../../components";

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

const FinalConfirmation = () => {
  const [selectedClothing, setSelectedClothing] = useState("");
  const [selectedFabric, setSelectedFabric] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [designName, setDesignName] = useState("");
  const [loading, setLoading] = useState(false); // 중복 방지

  const id = sessionStorage.getItem("id") || localStorage.getItem("id");
  console.log("🛠 가져온 id:", id);

  useEffect(() => {
    console.log("🔍 useEffect 실행됨, id:", id);
    if (!id) {
      alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
      window.location.href = "/login";
      return;
    }

    const storedClothing = sessionStorage.getItem("selectedClothing") || localStorage.getItem("selectedClothing");
    const storedFabric = sessionStorage.getItem("selectedFabric") || localStorage.getItem("selectedFabric");
    const storedColors = sessionStorage.getItem("selectedColors") || localStorage.getItem("selectedColors");
    const storedSize = sessionStorage.getItem("selectedSize") || localStorage.getItem("selectedSize");

    if (storedClothing) setSelectedClothing(storedClothing);
    if (storedFabric) setSelectedFabric(JSON.parse(storedFabric) || []);
    if (storedColors) setSelectedColors(JSON.parse(storedColors) || {});
    if (storedSize) setSelectedSize(storedSize);



    if (storedClothing) setSelectedClothing(storedClothing);
    if (storedFabric) {
      const parsed = JSON.parse(storedFabric);
      console.log("🧵 저장된 원단:", parsed);
      setSelectedFabric(parsed);
    }
    if (storedColors) {
      const parsedColors = JSON.parse(storedColors);
      console.log("🎨 저장된 색상:", parsedColors); // ✅ 여기!
      setSelectedColors(parsedColors);
    }
  }, [id]);


  // 색상 데이터가 배열로 저장되었다면
const handleSubmit = async () => {
  if (!designName.trim()) {
    alert("디자인 이름을 입력해주세요.");
    return;
  }

  const formattedColors = Object.entries(selectedColors).map(([id, color]) => ({
    id: String(id),
    color: color,
  }));

  // 선택된 색상이 없다면 기본값 할당
  const finalColor = formattedColors.length > 0 ? formattedColors[0].color : "#ffffff"; // 기본값: #ffffff (하얀색)

  const finalData = {
    id,
    designName: designName.trim(),
    clothingType: selectedClothing,
    fabricJson: JSON.stringify(selectedFabric.map(f => f.name)),  // ✅ 문자열로 보냄
    colorsJson: JSON.stringify(formattedColors.length > 0 ? formattedColors : [{ color: finalColor }]),  // 색상 배열로 감싸서 보내기
    size: selectedSize,
    category: "template", // ✅ 기본적으로 템플릿으로 저장
  };

  console.log("📦 최종 데이터 (변환 후):", finalData);

  try {
    setLoading(true);
    const response = await fetch("http://localhost:8081/designs/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    if (response.ok) {
      alert("디자인이 성공적으로 저장되었습니다.");
    } else {
      const errorResponse = await response.json();
      alert("저장 실패: " + (errorResponse.message || "알 수 없는 오류 발생"));
      console.error("❌ 저장 실패 응답:", errorResponse);
    }
  } catch (error) {
    console.error("저장 오류:", error);
    alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="final-container">
      <div className="layout1">
        <aside>
          <Sidebar activePage={4} />
        </aside>
        <div className="content1">
          <BreadCrumb activePage={4} />
          <h3>4. 최종 확인</h3>
          <hr />
          <div>
            <h4>선택한 의류 종류: {selectedClothing || "미선택"}</h4>
            <h4>선택한 원단: {selectedFabric.length > 0 ? selectedFabric.map(f => f.name).join(", ") : "미선택"}</h4>
            <h4>
              선택한 색상: {selectedFabric.length > 0
                ? selectedFabric.map(f => getColorName(selectedColors[f.id] || f.initialColor)).join(", ")
                : "미선택"}
            </h4>
            <h4>선택한 사이즈: {selectedSize || "미선택"}</h4>
            <div>
              <label>디자인 이름: </label>
              <input
                type="text"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder="디자인 이름을 입력하세요"
              />
            </div>
          </div>
          <div className="footer">
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "저장 중..." : "저장하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalConfirmation;
