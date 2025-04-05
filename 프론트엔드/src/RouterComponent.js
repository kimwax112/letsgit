import React from "react";
import { Routes, Route } from "react-router-dom";
import ClientLayout from "./ClientLayout";
import { Mainp, CosMain, BrandDP, Clothes, Fabric, Size, Upload, FinalConfimation, Request, RequestWriting, RequestPost, Designer, ChatMain, ChoseDesigner } from "./pages";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage/MyPage";
import Welcome from './pages/Login/Welcome';
import Back from './Back';
import DesignerCosMain from './pages/DesignerCosMain/DesignerCosMain';
import Dmypage from "./pages2/Mypage/Dmypage";
import Portfolio from './pages2/Mypage/Portfolio';
import ReportPage from './pages/ChatRoom/ChatMain/ReportPage';

const RouterComponent = () => {
  return (
    <Routes>
      {/* 루트 경로 */}
      <Route path="/" element={<Mainp />} />

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
              <Route path="Welcome" element={<Welcome />} />
              <Route path="ChoseDesigner" element={<ChoseDesigner />} />
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