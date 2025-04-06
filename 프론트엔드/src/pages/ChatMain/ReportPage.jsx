import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const ReportContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 60vh;
  margin-top: 50px;
  gap: 20px;
`;

const Text = styled.div`
  width: 100%;
  color: #799fc4;
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
`;

const ReportContent1 = styled.input`
  width: 100%;
  height: 6vh;
  background-color: white;
  border: 0.5px solid;
  border-radius: 10px;
`;

const ReportContent2 = styled.textarea`
  width: 100%;
  height: 35vh;
  background-color: white;
  border: 0.5px solid;
  border-radius: 10px;
  resize: none;
`;

const ReportButton = styled.button`
  width: 50%;
  height: 6vh;
  border: 0.5px solid;
  border-radius: 10px;
  color: white;
  background-color: #799fc4;
  margin: 0 auto;
  cursor: pointer;
  &:hover {
    background-color: #cc0000;
  }
`;

const ConfirmModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ConfirmMessage = styled.p`
  font-size: 16px;
  text-align: center;
`;

const ConfirmButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

const YesButton = styled(ConfirmButton)`
  background-color: #799fc4;
  &:hover {
    background-color: #cc0000;
  }
`;

const NoButton = styled(ConfirmButton)`
  background-color: #9dbdd5;
  &:hover {
    background-color: #444;
  }
`;

export default function ReportPage() {
  const [reportReason, setReportReason] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // URL 파라미터에서 신고 대상 이름 가져오기
  const queryParams = new URLSearchParams(location.search);
  const reportedName = queryParams.get("name") || "";

  const handleSubmit = () => {
    if (reportReason.trim()) {
      // 확인 모달 열기
      setIsConfirmOpen(true);
    } else {
      alert("신고 사유를 입력해주세요.");
    }
  };

  const handleConfirmYes = () => {
    // "예" 선택 시 ChatMain으로 이동
    setIsConfirmOpen(false);
    navigate(`/client/ChatMain?reported=${encodeURIComponent(reportedName)}`);
  };

  const handleConfirmNo = () => {
    // "아니요" 선택 시 모달만 닫기
    setIsConfirmOpen(false);
  };

  return (
    <>
      <ReportContainer>
        <Text>사용자 신고</Text>
        <ReportContent1 type="text" value={reportedName} readOnly />
        <ReportContent2
          placeholder="신고 사유"
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
        />
        <ReportButton onClick={handleSubmit}>신고</ReportButton>
      </ReportContainer>

      {isConfirmOpen && (
        <ConfirmModal>
          <ConfirmMessage>해당 사용자를 신고하시겠습니까?</ConfirmMessage>
          <ConfirmButtonWrapper>
            <YesButton onClick={handleConfirmYes}>예</YesButton>
            <NoButton onClick={handleConfirmNo}>아니요</NoButton>
          </ConfirmButtonWrapper>
        </ConfirmModal>
      )}
    </>
  );
}