import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './DesignerSidebar.module.css';

export default function DesignerSidebar() {
  const location = useLocation();

  // 서브메뉴 열림 상태 관리 (기본값은 현재 경로가 제작관리 관련일 때 열림)
  const [isProductionOpen, setIsProductionOpen] = useState(false);

  // location 변경 시, 제작관리 관련 경로면 서브메뉴 자동 오픈
  useEffect(() => {
    if (location.pathname.startsWith("/designer/production")) {
      setIsProductionOpen(true);
    } else {
      setIsProductionOpen(false);
    }
  }, [location.pathname]);

  // 제작관리 메뉴 클릭 시 토글 함수
  const toggleProductionMenu = () => {
    setIsProductionOpen(prev => !prev);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>마이페이지</h2>
      <hr/>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link
            to="/designer/MyInfo"
            className={`${styles.link} ${location.pathname === "/designer/MyInfo" ? styles.active : ""}`}
          >
            내 정보
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            to="/designer/DMyPage"
            className={`${styles.link} ${location.pathname === "/designer/DMyPage" ? styles.active : ""}`}
          >
            포트폴리오 관리
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            to="/designer/ContractDelivery"
            className={`${styles.link} ${location.pathname === "/designer/ContractDelivery" ? styles.active : ""}`}
          >
            계약조회 & 배송내역
          </Link>
        </li>
        <li className={styles.menuItem}>
          {/* 제작관리 메뉴는 클릭 시 서브메뉴 토글 */}
          <div
            onClick={toggleProductionMenu}
            className={`${styles.link} ${location.pathname.startsWith("/designer/production") ? styles.active : ""}`}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            제작관리
          </div>
          {/* isProductionOpen이 true일 때만 서브메뉴 보여주기 */}
          {isProductionOpen && (
            <ul className={styles.subMenu}>
              <li>
                <Link
                  to="/designer/production/history"
                  className={`${styles.subLink} ${
                    location.pathname === "/designer/production/history" ? styles.subActive : ""
                  }`}
                >
                  제작내역
                </Link>
              </li>
              <li>
                <Link
                  to="/designer/OngoingRequests"
                  className={`${styles.subLink} ${
                    location.pathname === "/designer/OngoingRequests" ? styles.subActive : ""
                  }`}
                >
                  진행중인 의뢰내역
                </Link>
              </li>
              <li>
                <Link
                  to="/designer/CompletedRequest"
                  className={`${styles.subLink} ${
                    location.pathname === "/designer/CompletedRequest" ? styles.subActive : ""
                  }`}
                >
                  완료된 의뢰 관리
                </Link>
              </li>
              <li>
                <Link
                  to="/designer/EditRequests"
                  className={`${styles.subLink} ${
                    location.pathname === "/designer/EditRequests" ? styles.subActive : ""
                  }`}
                >
                  내가 보낸 수정요청사항
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
