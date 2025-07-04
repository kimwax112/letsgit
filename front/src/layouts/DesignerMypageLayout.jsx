import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../pages2/Mypage/ui/Sidebar"; // 디자이너용 사이드바
import "./ClientMypageLayout.css"; // 스타일 재사용 (공통된 부분이라면)

const slideVariants = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { x: -50, opacity: 0, transition: { duration: 0.2 } },
};

const DesignerMypageLayout = ({ children, title, breadcrumb, description, icon: Icon }) => {
  const location = useLocation();

  return (
    <div className="flex">
      <Sidebar />
      <motion.div
        className="flex-1 p-6"
        key={location.pathname}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* 공통 헤더 */}
        <div className="mypage-section-header mb-6">
          {breadcrumb && (
            <div className="breadcrumb-text text-sm mb-1">{breadcrumb}</div>
          )}
          {title && (
            <>
              <h2 className="text-4xl font-bold flex items-center gap-4 text-gray-800 relative section-title">
                {Icon && <Icon className="w-7 h-7 text-[#799FC4] fill-[#799FC4]" />}
                {title}
              </h2>
              <hr className="mt-3 mb-4 border-t-2 border-[#799FC4]" />
            </>
          )}
        </div>

        {/* 본문 콘텐츠 */}
        {children}
      </motion.div>
    </div>
  );
};

export default DesignerMypageLayout;
