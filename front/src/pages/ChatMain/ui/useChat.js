import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function useChat(initialChats) {
  const [filteredChats, setFilteredChats] = useState(initialChats);
  const [recentSearches, setRecentSearches] = useState(["Ralph Edwards", "hello"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoomId, setselectedRoomId] = useState('');

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
   const [username, setUsername] = useState("");
    const [room, setRoom] = useState(null); // ✅ 방 정보 상태 추가
      const [client, setClient] = useState(null);
      const [connected, setConnected] = useState(false);
  const [roomCreator, setselectedRoomCreator] = useState('');
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
//////////////////////////////////


  
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

  useEffect(() => {
    setFilteredChats(initialChats);
  }, [initialChats]);
  // 메시지 스크롤 처리
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  /*const checkSessionAndLoadMessages = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/checkSession", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.username) {
        setUsername(data.username);

        // ✅ 메시지 불러오기
        const msgRes = await fetch(`http://localhost:8081/api/messages/${selectedRoomId}`);
        const msgs = await msgRes.json();
        setMessages(msgs); // 이전 메시지 저장
        // ✅ 방 정보 불러오기
    const roomRes = await fetch(`http://localhost:8081/api/rooms/${selectedRoomId}`);
    const roomData = await roomRes.json();
    setRoom(roomData);
    console.log("룸데이터터:", roomData);

      } else {
        alert("로그인이 필요합니다.");
        navigate("/");
      }
    } catch (err) {
      console.error("세션 확인 실패:", err);
      alert("세션 확인 중 오류 발생");
      navigate("/");
    }
  };*/
  const connectWebSocket = (roomId, username) => {
    const socket = new SockJS("http://localhost:8081/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("WebSocket 연결 성공");
  
        // ✅ 채팅방 구독
        stompClient.subscribe(`/topic/chat/${roomId}`, (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          setMessages((prev) => [...prev, receivedMessage]);
        });
  
        // ✅ 입장 메시지 전송
        stompClient.publish({
          destination: `/app/chat.addUser/${roomId}`,
          body: JSON.stringify({
            sender: username,
            content: `${username} 님이 입장하셨습니다.`,
            type: "JOIN",
          }),
        });
  
        setConnected(true);
      },
      onDisconnect: () => {
        console.log("WebSocket 연결 종료");
        setConnected(false);
      },
    });
  
    stompClient.activate();
    setClient(stompClient);
  
    // 나중에 컴포넌트 언마운트 시 연결 해제하도록 리턴
    return stompClient;
  };
  
  const checkSessionAndLoadMessages = async (roomId) => {
    try {
      console.log("매개변수룸아이디", roomId);
      const res = await fetch("http://localhost:8081/api/checkSession", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.username) {
        setUsername(data.username);
        setselectedRoomId(roomId);
        console.log("셀렉티드의 값은?", roomId);
  
        const msgRes = await fetch(`http://localhost:8081/api/messages/${roomId}`);
        const msgs = await msgRes.json();
        setMessages(msgs);
  
        const roomRes = await fetch(`http://localhost:8081/api/rooms/${roomId}`);
        const roomData = await roomRes.json();
        setRoom(roomData);
  
        console.log("룸데이터터:", roomData);
  
        // ✅ WebSocket 연결
        const stomp = connectWebSocket(roomId, data.username);
        if (client) {
          client.deactivate();
        }
        setClient(stomp);
  
      } else {
        alert("로그인이 필요합니다.");
        navigate("/");
      }
    } catch (err) {
      console.error("세션 확인 실패:", err);
      alert("세션 확인 중 오류 발생");
      navigate("/");
    }
  };
  
  
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

  /*const handleProfileClick = (chat) => {
    setSelectedUser(chat.name); // 기존 코드
    console.log("챗아이디디 : ", chat.id);

    setselectedRoomId(chat.id); // 추가: roomID 설정
    setselectedRoomCreator(chat.creator);
    setIsModalOpen(true);
    console.log("셀렉티드룸 : ", selectedRoomId);
    checkSessionAndLoadMessages();
  };*/
  const handleProfileClick = (chat) => {
    setSelectedUser(chat.name);
    setselectedRoomId(chat.id);
    setselectedRoomCreator(chat.creator);
    setIsModalOpen(true);
    
    console.log("챗아이디디 : ", chat.id);
  
    checkSessionAndLoadMessages(chat.id); // 여기서 chat.id를 직접 넘겨줌
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

  /*const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing && e.target.value.trim()) {
      setMessages([
        ...messages,
        { text: e.target.value.trim(), time: new Date().toLocaleTimeString() },
      ]);
      
      e.target.value = "";
    }
  };*/
  /*const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing && e.target.value.trim()) {
      const newMessage = e.target.value.trim();
  
      if (client && connected) {
        client.publish({
          destination: `/app/chat.sendMessage/${roomId}`,
          body: JSON.stringify({
            sender: username,
            content: newMessage,
            type: "CHAT",
          }),
        });
      }
  
      setMessage(""); // 상태 초기화
      e.target.value = ""; // input 초기화
    }
  };*/

 

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

  return {
    filteredChats,
    selectedRoomId, 
    // 현재 표시되는 채팅몰고, 검색 필터링 결과에 따라 변경됨 초기값: initialChats 관련함수 handleSerch, handleBlockClick, handleSideMenuBlock
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
    //handleKeyDown,
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
  };
}