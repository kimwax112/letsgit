import React from "react";
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";

import RouterComponent from "./RouterComponent"// 라우터 관리 파일 분리

function App() {
  return (
    <div className="App">
        <Router>
        <RouterComponent /> {/* 라우팅 담당 컴포넌트 */}
        </Router>
    </div>
  );
}

export default App;
