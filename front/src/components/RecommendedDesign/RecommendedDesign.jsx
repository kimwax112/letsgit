import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RecommendedDesign.css";

const RecommendedDesign = () => {

    return (
        <div className="RecommDes">
            <div className="RecommDesImg">
                <img src="" alt="" />
            </div>
            <div className="RecommDes2">
                <h3 className="RecommDes-title">상의 디자인</h3>
                <p className="RecommDes-text">
                    #상의 #자켓 #원단
                </p>
            </div>
        </div>
    );
};

export default RecommendedDesign;