import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientLayout from "./ClientLayout";
import { Mainp, CosMain, BrandDP, Clothes, Fabric, Size, Upload, FinalConfimation, Request, RequestWriting, RequestPost, ChatMain, ChoseDesigner } from "./pages";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage/MyPage";
import Welcome from './pages/Login/Welcome';
import SignIn2 from "./pages/Login/SignIn2";
import DesignRequest from "./pages/MyPage/DesignRequest";
import Canvas from "./components/Canvas/Canvas";
// import CosMain from "./pages/CosMain/CosMain";
import Back from './Back';
import DesignerCosMain from './pages/DesignerCosMain/DesignerCosMain';
import Dmypage from "./pages2/Mypage/Dmypage";
import Portfolio from './pages2/Mypage/Portfolio';
import ReportPage from './pages/ChatMain/ReportPage';
import FavoriteDesigners from "./components/Mypage/FavoriteDesigners/FavoriteDesigners";
import FavoriteDesignersPage from "./pages/MyPage/FavoriteDesigners/FavoriteDesignersPage";


const RouterComponent = () => {
  return (
    <Routes>
      {/* 루트 경로 */}
      <Route path="/" element={<Mainp />} />
      <Route path="/CosMain" element={<CosMain />} />
      <Route path="/BrandDP" element={<BrandDP />} />
      <Route path="/Clothes" element={<Clothes />} />
      <Route path="/Fabric" element={<Fabric />} />
      <Route path="/Size" element={<Size />} />
      <Route path="/Upload" element={<Upload />} />
      <Route path="/FinalConfirmation" element={<FinalConfimation />} />
      <Route path="/Request" element={<Request />} />
      <Route path="/RequestWriting" element={<RequestWriting />} /> 
      <Route path="/RequestPost" element={<RequestPost/>} />
      {/* <Route path="/Designer" element={<Designer/>} /> */}
      <Route path="/Home" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/Sign" element={<SignIn2 />} />
      <Route path="/Canvas" element={<Canvas />} />
      <Route path="/MyPage" element={<MyPage />} />

      {/* 의뢰인 페이지 경로 */}
      <Route
        path="/client/*"
        element={
          <ClientLayout>
            <Routes>
              <Route path="/" element={<Mainp />} />
              <Route path="CosMain" element={<CosMain />} />
              <Route path="BrandDP" element={<BrandDP />} />
              <Route path="Clothes" element={<Clothes />} />
              <Route path="Fabric" element={<Fabric />} />
              <Route path="Size" element={<Size />} />
              <Route path="Upload" element={<Upload />} />
              <Route path="FinalConfirmation" element={<FinalConfimation />} />
              <Route path="Request" element={<Request />} />
              <Route path="RequestWriting" element={<RequestWriting />} />
              <Route path="RequestPost" element={<RequestPost />} />
              <Route path="Home" element={<Home />} />
              <Route path="MyPage" element={<MyPage />} />
              <Route path="ChatMain" element={<ChatMain />} />
              <Route path="ReportPage" element={<ReportPage />} /> {/* ReportPage 추가 */}
              {/* <Route path="/welcome" element={<Welcome />} /> */}
              <Route path="ChoseDesigner" element={<ChoseDesigner />} />
              <Route path="FavoriteDesigners" element={<FavoriteDesignersPage />} />
              {/* <Route path="Sign" element={<SignIn2 />} /> */}
              <Route path="FavoriteDesignersPage" element={<FavoriteDesignersPage />} />
              <Route path="design-request" element={<DesignRequest />} />
            </Routes>
          </ClientLayout>
        }
      />

      {/* 디자이너 페이지 경로 */}
      <Route path="/designer/*" element={
        <Routes>
          <Route path="DesignerCosMain" element={<DesignerCosMain />} />
          <Route path="Back" element={<Back />} />
          <Route path="Dmypage" element={<Dmypage />} />
          <Route path="Portfolio" element={<Portfolio />} />
        </Routes>
      } />
    </Routes>
  );
};

export default RouterComponent;