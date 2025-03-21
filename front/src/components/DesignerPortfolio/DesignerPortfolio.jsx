import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DesignerPortfolio.css";

const DesignerPortfolio = () => {

    return (
        <div className="DesignerPorfol">
            <div className="DesignerImg">
                <img src="" alt="임시 이미지" />
            </div>
            <h3 className="DesignerPorfol-title">누구누구 디자이너님</h3>
            <p className="DesignerPorfol-text">
                #상의 #하의 #자켓
            </p>
        </div>
    );
};

export default DesignerPortfolio;