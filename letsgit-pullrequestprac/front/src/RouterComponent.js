import React from "react";
import { Routes, Route } from "react-router-dom";
import { Mainp, CosMain, BrandDP, Clothes, Fabric, Size, Upload, FinalConfimation,Request,RequestWriting,RequestPost,Designer} from "./pages";
import Home from "./pages/Home";
import Welcome from "./pages/Login/Welcome"
import SignIn2 from "./pages/Login/SignIn2"
import Canvas from "./components/Canvas/Canvas";
import MyPage from "./pages/MyPage/MyPage";
const RouterComponent = () => {
  return (
    <Routes>
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
      <Route path="/Designer" element={<Designer/>} />
      <Route path="/Home" element={<Home />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/Sign" element={<SignIn2 />} />
      <Route path="/Canvas" element={<Canvas />} />
      <Route path="/MyPage" element={<MyPage />} />


    </Routes>
  );
};

export default RouterComponent;
