import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OngoingContract.css";

const OngoingContract = () => {

    return (
        <div className="GoingContent">
            <h3 className="GoingContent-title">계약 제목명</h3>
            <p className="GoingContent-text">
                계약 내용들이 써져있는 부분<br/>
                계약 내용들이 써져있는 부분<br/>
                계약 내용들이 써져있는 부분<br/>
                계약 내용들이 써져있는 부분
            </p>
            <button className="GoingContent-btn">자세히 보기</button>
        </div>
    );
};

export default OngoingContract;