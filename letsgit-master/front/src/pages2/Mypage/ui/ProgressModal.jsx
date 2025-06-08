import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 1.25rem;
  padding: 2rem;
  width: 40rem;
  height: 15rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(0,0,0,0.2);
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  border-bottom: 0.125rem solid #799fc4;
  padding-bottom: 0.3rem;
`;

const CloseButton = styled.button`
  all: unset;
  font-size: 1.8rem;
  cursor: pointer;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepImage = styled.img`
  width: 6.5rem;
  height: 6.5rem;
  filter: ${({ grayscale }) => (grayscale ? "grayscale(100%)" : "none")};
  transition: filter 0.3s;
`;

const StepButton = styled.button`
  margin-top: 0.55625rem;
  background: none;
  border: 0.0625rem solid #ddd;
  box-shadow: 0 0.0625rem 0.125rem rgba(0,0,0,0.05);
  color: ${({ active }) => (active ? "#000" : "#aaa")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: pointer;
  user-select: none;
  font-size: 1.25rem;
  border-radius: 0.3rem;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.1);
  }
`;

const Arrow = styled.span`
  font-size: 1.5rem;
  color: #799fc4;
  margin: 0 1rem;
`;

const ConfirmOverlay = styled(Overlay)`
  background: rgba(0, 0, 0, 0.4);
`;

const ConfirmBox = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 20rem;
  height: 10rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,0.3);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.12rem;
`;

const ConfirmButtons = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-around;
`;

const ConfirmButton = styled.button`
  padding: 0.65rem 3rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.1rem;
  background-color: ${({ $isConfirm }) => ($isConfirm ? "#799fc4" : "#ccc")};
  color: ${({ $isConfirm }) => ($isConfirm ? "white" : "black")};
`;

// 작업 단계 리스트
const steps = [
  { label: "디자인하기", value: 0, image: "/image/Progress/sketch.png" },
  { label: "뜨개질하기", value: 1, image: "/image/Progress/knitting.png" },
  { label: "마감하기", value: 2, image: "/image/Progress/successful.png" },
  { label: "포장하기", value: 3, image: "/image/Progress/package.png" },
];

export default function ProgressModal({ onClose, initialStep = 0, contract, onStepUpdated }) {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [confirmStep, setConfirmStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // initialStep 변경 시 activeStep 동기화
  useEffect(() => {
    setActiveStep(initialStep);
  }, [initialStep]);

  const handleStepButtonClick = (index) => {
    if (index !== activeStep) {
      setConfirmStep(index);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    console.log("실제로 전송될 contractId:", contract.contractId);

    if (!contract || contract.contractId === undefined || contract.contractId === null) {
      setError("계약 정보를 찾을 수 없습니다. (계약 ID 누락)");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:8081/api/progress", {
        contractId: contract.contractId,
        status: steps[confirmStep].label,
        step: steps[confirmStep].value,  // 서버에서 step도 받도록 하려면 같이 보냅니다
      });

      setActiveStep(confirmStep);
      setConfirmStep(null);
      if (onStepUpdated) {
        onStepUpdated(confirmStep);
      }
    } catch (err) {
      setError("진행 상황 업데이트에 실패했습니다. 관리자에게 문의하세요.");
      console.error("진행 상황 업데이트 오류:", err.response ? err.response.data : err.message, err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setConfirmStep(null);
    setError(null);
  };

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>작업 진행도 관리</Title>
          <CloseButton onClick={onClose} disabled={loading}>×</CloseButton>
        </Header>

        <StepContainer>
          {steps.map((step, index) => {
            const grayscale = index > activeStep;
            const active = index === activeStep;

            return (
              <React.Fragment key={index}>
                <StepItem>
                  <StepImage src={step.image} alt={step.label} grayscale={grayscale} />
                  <StepButton
                    active={active}
                    onClick={() => handleStepButtonClick(index)}
                    disabled={loading || index < activeStep}
                  >
                    {step.label}
                  </StepButton>
                </StepItem>
                {index < steps.length - 1 && <Arrow>→</Arrow>}
              </React.Fragment>
            );
          })}
        </StepContainer>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {confirmStep !== null && (
          <ConfirmOverlay>
            <ConfirmBox>
              <p>
                "{steps[activeStep].label}"에서 "{steps[confirmStep].label}"으로 <br />
                진행사항을 업데이트 하시겠습니까?
              </p>
              <ConfirmButtons>
                <ConfirmButton $isConfirm onClick={handleConfirm} disabled={loading}>
                  {loading ? "처리 중..." : "확인"}
                </ConfirmButton>
                <ConfirmButton onClick={handleCancel} disabled={loading}>취소</ConfirmButton>
              </ConfirmButtons>
            </ConfirmBox>
          </ConfirmOverlay>
        )}
      </ModalContainer>
    </Overlay>
  );
}
