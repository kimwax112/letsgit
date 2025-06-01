import React, { useState, useCallback } from 'react';
import './Dropdown.css';
import useChatSocketMultiRoom from './useChatSocketMultiRoom';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [proceedList, setProceedList] = useState([]);
  const notificationCount = messageList.length + proceedList.length;

  const handleMessageReceived = useCallback((msg) => {
    console.log("받은메세지는이것", msg);
    if (msg.type === 'proceed') {
      setProceedList((prev) => [...prev, msg.content]);
    } else {
      setMessageList((prev) => [...prev, msg.content]);
    }
  }, []);

  const roomIds = [17, 18, 19, 4, 6, 22, 24, 20];
  useChatSocketMultiRoom(roomIds, handleMessageReceived);

  const handleRemove = (index, type) => {
    if (type === 'message') {
      setMessageList((prev) => prev.filter((_, i) => i !== index));
    } else {
      setProceedList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const hasNotification = messageList.length > 0 || proceedList.length > 0;

  return (
    <div className="dropdown-layout">
      {/*  드롭다운 버튼 */}
      <div
        className="dropdown"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/*<div className={`dropdown-button ${hasNotification ? 'alert-active' : ''}`}>
          알림
        </div>*/}
        <div className={`dropdown-button ${hasNotification ? 'alert-active' : ''}`}>
          알림 {notificationCount > 0 ? `(${notificationCount})` : ''}
        </div>

        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
          {messageList.map((msg, idx) => (
            <div
              key={`msg-${idx}`}
              className="dropdown-item"
              onClick={() => handleRemove(idx, 'message')}
            >
               신규 메세지 알림: {msg}
            </div>
          ))}
          {proceedList.map((msg, idx) => (
            <div
              key={`proceed-${idx}`}
              className="dropdown-item"
              onClick={() => handleRemove(idx, 'proceed')}
            >
               계약 진행도 변경: {msg}
            </div>
          ))}
          {messageList.length === 0 && proceedList.length === 0 && (
            <div className="dropdown-item">새로운 알림이 없습니다!</div>
          )}
        </div>
      </div>

      {/*  오른쪽 고정 알림 패널 */}
      <div className="notification-panel">
        {messageList.map((msg, idx) => (
          <div
            key={`msg-p-${idx}`}
            className="dropdown-item"
            onClick={() => handleRemove(idx, 'message')}
          >
            {msg}
          </div>
        ))}
        {proceedList.map((msg, idx) => (
          <div
            key={`proceed-p-${idx}`}
            className="dropdown-item"
            onClick={() => handleRemove(idx, 'proceed')}
          >
            {msg}
          </div>
        ))}
        {messageList.length === 0 && proceedList.length === 0 && (
          <div className="dropdown-item">새로운 알림이 없습니다!</div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
