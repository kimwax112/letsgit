import React, { useState, useEffect } from "react";
import { Sidebar, BreadCrumb } from "../../../../components";

const getColorName = (hex) => {
  const colorMap = {
    "#0099ff": "파랑",
    "#00ccff": "하늘색",
    "#663399": "보라",
    "#ff66cc": "분홍",
    "#ff0000": "빨강",
    "#00ff00": "초록",
    "#ffff00": "노랑",
    "#000000": "검정",
    "#ffffff": "흰색",
  };
  return colorMap[hex] || "알 수 없음";
};

const FinalConfirmation = () => {
  const [selectedClothing, setSelectedClothing] = useState("");
  const [selectedFabric, setSelectedFabric] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [designName, setDesignName] = useState("");

  const id = sessionStorage.getItem("id") || localStorage.getItem("id"); // ✅ userId → id로 변경
  console.log("🛠 가져온 id:", id);

  useEffect(() => {
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
  }, [id]);

  const handleSubmit = async () => {
    if (!designName.trim()) {
      alert("디자인 이름을 입력해주세요.");
      return;
    }
    if (!id) {
      alert("로그인이 필요합니다.");
      return;
    }
  
    const finalData = {
      id: id, // ✅ 백엔드에서 'id'로 저장하는지 확인
      designName: designName.trim(),
      clothingType: selectedClothing, // ✅ 백엔드에서 'clothingType'이면 변경
      fabric: selectedFabric.map(fabric => fabric.name),
      colors: Object.entries(selectedColors).map(([fabricId, color]) => ({
        [fabricId]: color
      })),
      size: selectedSize,
    };
  
    console.log("📤 전송할 데이터:", finalData);
  
    try {
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
              <input type="text" value={designName} onChange={(e) => setDesignName(e.target.value)}
                placeholder="디자인 이름을 입력하세요" />
            </div>
          </div>
          <div className="footer">
            <button onClick={handleSubmit}>저장하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalConfirmation;
