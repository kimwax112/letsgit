import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RequestBar from "../../../components/RequestBar/RequestBar";
import ItemBox from "./ItemBox";
export function useChat(initialChats) {
  const [filteredChats, setFilteredChats] = useState(initialChats);
  const [recentSearches, setRecentSearches] = useState(["Ralph Edwards", "hello"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isComposing, setIsComposing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [currentView, setCurrentView] = useState("chatmain");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // URL 파라미터에서 신고 완료 여부 확인
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const reportedName = urlParams.get("reported");
    if (reportedName) {
      setFilteredChats((prevChats) => prevChats.filter((chat) => chat.name !== reportedName));
      setPopupMessage("신고가 완료되었습니다.");
      setIsSuccessPopupOpen(true);
      navigate("/client/ChatMain", { replace: true });
    }
  }, [location, navigate]);

  // 성공 팝업 자동 닫기
  useEffect(() => {
    if (isSuccessPopupOpen) {
      const timer = setTimeout(() => setIsSuccessPopupOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccessPopupOpen]);

  // 메시지 스크롤 처리
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSearch = (term) => {
    if (term) {
      const filtered = initialChats.filter((chat) =>
        chat.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(initialChats);
    }
  };

  const handleRecentSearchClick = (search) => {
    handleSearch(search);
    setRecentSearches((prev) => [search, ...prev.filter((item) => item !== search)].slice(0, 5));
  };

  const handleProfileClick = (name) => {
    setSelectedUser(name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsSideMenuOpen(false);
  };

  const handleMenuClick = () => {
    setIsSideMenuOpen(true);
  };

  const handleCloseSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing && e.target.value.trim()) {
      setMessages([
        ...messages,
        { text: e.target.value.trim(), time: new Date().toLocaleTimeString() },
      ]);
      e.target.value = "";
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleSidebarLinkClick = (path) => {
    setCurrentView(path);
  };

  const handleBlockClick = (name) => {
    setFilteredChats((prevChats) => prevChats.filter((chat) => chat.name !== name));
    setPopupMessage(`${name}님이 차단되었습니다.`);
    setIsSuccessPopupOpen(true);
  };

  const handleReportClick = (name) => {
    navigate(`/client/ReportPage?name=${encodeURIComponent(name)}`);
  };

  const handleSideMenuBlock = () => {
    if (selectedUser) {
      setConfirmMessage(`${selectedUser}님을 차단하시겠습니까?`);
      setConfirmAction(() => () => {
        setFilteredChats((prevChats) => prevChats.filter((chat) => chat.name !== selectedUser));
        setIsModalOpen(false);
        setPopupMessage(`${selectedUser}님이 차단되었습니다.`);
        setIsSuccessPopupOpen(true);
      });
      setIsConfirmOpen(true);
    }
  };

  const handleSideMenuReport = () => {
    if (selectedUser) {
      setConfirmMessage(`${selectedUser}님을 신고하시겠습니까?`);
      setConfirmAction(() => () => {
        setIsModalOpen(false);
        navigate(`/client/ReportPage?name=${encodeURIComponent(selectedUser)}`);
      });
      setIsConfirmOpen(true);
    }
  };

  const handleConfirmYes = () => {
    if (confirmAction) confirmAction();
    setIsConfirmOpen(false);
  };

  const handleConfirmNo = () => {
    setIsConfirmOpen(false);
  };
  const handleRequestSelect = (request) => {
    const requestComponent = (
      <div className="message sent">
        <RequestBar
          title={request.title}
          date={request.date}
          onClick={() => console.log("RequestBar clicked in chat")}
          showClose={false}
          className="chat-request-bar" // 채팅방에서만 적용될 클래스 추가
        />
        <span className="time">{new Date().toLocaleTimeString()}</span>
      </div>
    );
    setMessages([
      ...messages,
      { component: requestComponent, type: "request" },
    ]);
    setModalOpen2(false);
  };
  const handleItemSelect = (item) => {
    const itemComponent = (
      <div className="message sent">
        <ItemBox
          text1={item.text1}
          text2={item.text2}
          onClick={() => console.log("ItemBox clicked in chat")}
          className="chat-item-box" // 채팅방에서만 적용될 클래스 추가
        />
        <span className="time">{new Date().toLocaleTimeString()}</span>
      </div>
    );
    setMessages([
      ...messages,
      { component: itemComponent, type: "item" },
    ]);
    setModalOpen(false); // 디자인 불러오기 모달 닫기
  };
 

  return {
    filteredChats, // 현재 표시되는 채팅몰고, 검색 필터링 결과에 따라 변경됨 초기값: initialChats 관련함수 handleSerch, handleBlockClick, handleSideMenuBlock
    recentSearches,//최근 검색어 기록을 저장하는 배열 초기값 ["Ralph Edwards", "hello"] 관련함수 :handleRecentSearchClick
    isModalOpen, //채팅방 모달(Room)의 열림/닫힘 상태 초기값: false 관련함수 : handleProfileClick, handleCloseModal, handleSideMenuBlock, handleSideMenuReport
    selectedUser,// 현재 선택된 채팅 상대의 이름 초기값 : null 관련함수 :handleProfileClick, handleCloseModal
    isSideMenuOpen,// 사이드 메뉴의 열림/닫힘 상태 초기값 : false 관렴함수 : handleMenuClick, handleCloseSideMenu, handleCloseModal
    messages,// 채팅방 내 메시지 목록 초기값 : [] 관련함수 : handleKeyDown
    isComposing, //사용자가 입력중인지 여부 (IME입력처리용)용도 입력중 Enter키로 메시지가 중복 전송되지 않도록 방지  초기값 : false 관련함수 : handleCompositionStart, handleCompositionEnd, handleKeyDown
    modalOpen,//'디자인 불러오기' 모달ㅇ
    modalOpen2,
    currentView,
    isConfirmOpen,
    confirmMessage,
    isSuccessPopupOpen,
    popupMessage,
    bottomRef,
    handleSearch,
    handleRecentSearchClick,
    handleProfileClick,
    handleCloseModal,
    handleMenuClick,
    handleCloseSideMenu,
    handleKeyDown,
    handleCompositionStart,
    handleCompositionEnd,
    handleSidebarLinkClick,
    handleBlockClick,
    handleReportClick,
    handleSideMenuBlock,
    handleSideMenuReport,
    handleConfirmYes,
    handleConfirmNo,
    setModalOpen,
    setModalOpen2,
    handleRequestSelect, // 추가
    handleItemSelect, // 새로운 핸들러 추가
    
  };
}