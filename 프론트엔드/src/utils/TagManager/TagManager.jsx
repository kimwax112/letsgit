// TagManager.jsx
import React, { useReducer, useState } from "react";
import { TextInputUI, Tag } from "../../components";
import styled from "styled-components";

// 태그 추가/삭제를 위한 Reducer 함수
const tagReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TAG":
      return [...state, action.payload];
    case "REMOVE_TAG":
      return state.filter((tag) => tag !== action.payload);
    default:
      return state;
  }
};

const TagListContainer = styled.div`
  width: 100%;
  max-width: 412px;
  min-width: 412px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const TagManager = ({ placeholder = "태그 입력", onTagsUpdate }) => {
  // 태그 목록 관리 (내부 state)
  const [tags, dispatch] = useReducer(tagReducer, []);
  // 입력 필드 상태
  const [tagInput, setTagInput] = useState("");
  // 한글 입력 상태 (IME)
  const [isComposing, setIsComposing] = useState(false);

  // 태그 추가 시 부모에 업데이트된 태그 배열 전달
  const handleAddTag = (trimmed) => {
    const updatedTags = [...tags, trimmed];
    dispatch({ type: "ADD_TAG", payload: trimmed });
    if (onTagsUpdate) onTagsUpdate(updatedTags);
  };

  const handleTagChange = (e) => {
    let newValue = e.target.value;
    if (!isComposing && newValue.length > 20) {
      newValue = newValue.substring(0, 20);
    }
    setTagInput(newValue);
  };

  const handleTagEnter = (text) => {
    const trimmed = text.trim();
    if (trimmed !== "") {
      handleAddTag(trimmed);
      setTagInput("");
    }
  };

  const handleTagCompositionStart = () => setIsComposing(true);

  const handleTagCompositionEnd = (e) => {
    setIsComposing(false);
    let newValue = e.target.value;
    if (newValue.length > 20) {
      newValue = newValue.substring(0, 20);
    }
    setTagInput(newValue);
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    dispatch({ type: "REMOVE_TAG", payload: tagToRemove });
    if (onTagsUpdate) onTagsUpdate(updatedTags);
  };

  return (
    <div>
      <TextInputUI
        value={tagInput}
        maxLength={20}
        onChange={handleTagChange}
        onEnter={handleTagEnter}
        onCompositionStart={handleTagCompositionStart}
        onCompositionEnd={handleTagCompositionEnd}
        placeholder={placeholder}
      />
      <TagListContainer>
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} onRemove={() => handleRemoveTag(tag)} />
        ))}
      </TagListContainer>
    </div>
  );
};

export default TagManager;
