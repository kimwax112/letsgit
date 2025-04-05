// src/pages/MyPage/FavoriteDesignersPage.jsx
import React from "react";
import ClientMypageLayout from "../../../layouts/ClientMypageLayout";
import FavoriteDesigners from "../../../components/Mypage/FavoriteDesigners/FavoriteDesigners";

const FavoriteDesignersPage = () => {
    return (
        <ClientMypageLayout>
            <FavoriteDesigners />
        </ClientMypageLayout>
    );
  };
  
  export default FavoriteDesignersPage;