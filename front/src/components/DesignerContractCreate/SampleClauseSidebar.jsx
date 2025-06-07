import React from "react";

export const sampleTemplates = {
  basic: [
    "의뢰인은 계약된 일정에 따라 제작 결과물을 전달받을 수 있습니다.",
    "디자이너는 의뢰인의 요구사항을 성실히 반영하며 작업을 진행합니다.",
    "최종 제품은 의뢰인의 확인 후 승인 절차를 거칩니다.",
    "작업 완료 후 의뢰인은 7일 이내에 피드백을 제공해야 합니다.",
  ],
  rights: [
    "디자인 저작권은 디자이너에게 귀속됩니다.",
    "의뢰인은 디자인의 2차 가공 시 디자이너의 동의를 받아야 합니다.",
    "제작된 의류 샘플은 디자이너의 포트폴리오 용도로 사용될 수 있습니다.",
  ],
  cancel: [
    "계약 변경 시 최소 7일 전에 서면으로 통보해야 합니다.",
    "계약 해지 시 위약금 20%를 지불해야 합니다.",
    "작업 진행 중 의뢰인의 일방적 계약 해지 시, 진행된 작업비용은 환불되지 않습니다.",
  ],
  security: [
    "양측은 계약 관련 정보를 외부에 공개하지 않으며 비밀을 유지합니다.",
    "보안 위반 시 법적 책임을 질 수 있습니다.",
    "디자인 및 샘플 관련 자료는 계약 종료 후 3개월 내에 파기합니다.",
  ],
  dispute: [
    "분쟁 발생 시 상호 협의를 우선으로 하며, 해결되지 않으면 중재 기관에 의뢰합니다.",
    "본 계약과 관련된 모든 분쟁은 서울중앙지방법원을 1심 관할 법원으로 합니다.",
  ],
};

const categoryNames = {
  basic: "기본",
  rights: "저작권",
  cancel: "취소",
  security: "보안",
  dispute: "분쟁",
};

const SampleClauseSidebar = ({ onInsert, onClose, selectedCategory }) => {
  //const [category, setCategory] = React.useState(selectedCategory || "basic");

   const [category, setCategory] = React.useState(selectedCategory || "basic");

    React.useEffect(() => {
    if (selectedCategory && selectedCategory !== category) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
        padding: "1rem",
        zIndex: 1000,
      }}
    >
      <button onClick={onClose} style={{ float: "right" }}>
        닫기
      </button>
      <h3>샘플 문구</h3>
      <div style={{ marginBottom: "1rem" }}>
        {Object.keys(sampleTemplates).map((key) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            style={{
              marginRight: "0.5rem",
              marginBottom: "0.5rem",
              backgroundColor: category === key ? "#799FC4" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "0.3rem 0.7rem",
            }}
          >
            {categoryNames[key]}
          </button>
        ))}
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {(sampleTemplates[category] || []).map((text, idx) => (
          <li key={idx} style={{ marginBottom: "0.75rem" }}>
            <button
              draggable={true}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", text);
              }}
              onClick={() => onInsert(selectedCategory, text)}
              style={{
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "0.5rem",
                width: "100%",
                textAlign: "left",
                color: "#444",
              }}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleClauseSidebar;
