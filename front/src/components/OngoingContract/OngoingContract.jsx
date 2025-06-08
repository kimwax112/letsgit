import React from "react";
import { Link } from "react-router-dom";
import "./OngoingContract.css";

const OngoingContract = () => {
    const contracts = [
        {
            id: 1,
            title: "봄 셔츠 제작 계약",
            content: "셔츠 디자인 최종본 확정\n납기일: 5월 30일\n계약금 지급 완료",
            link: "/contract/1",
        },
        {
            id: 2,
            title: "여름 원피스 샘플 계약",
            content: "샘플 원단 확정\n1차 샘플 제작 중\n피드백 대기 중",
            link: "/contract/2",
        },
        {
            id: 3,
            title: "겨울 코트 협업 계약",
            content: "디자인 초안 3종 논의 예정\n회의 일정: 5월 15일\n계약금 미지급",
            link: "/contract/3",
        },
    ];

    return (
        <>
            {contracts.map(contract => (
                <div key={contract.id} className="GoingContent">
                    <h3 className="GoingContent-title">{contract.title}</h3>
                    <p className="GoingContent-text">
                        {contract.content.split("\n").map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </p>
                    <Link to={contract.link}>
                        <button className="GoingContent-btn">자세히 보기</button>
                    </Link>
                </div>
            ))}
        </>
    );
};

export default OngoingContract;
