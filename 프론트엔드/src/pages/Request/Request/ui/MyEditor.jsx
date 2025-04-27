// MyEditor.jsx 텍스트 편집기 
import React, {  useState } from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';

// 플러그인 관련
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';


import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
} from '@draft-js-plugins/buttons';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

const MyEditor = ({children}) => {
  // Draft.js 에디터 상태
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // 플러그인 배열
  const plugins = [toolbarPlugin];

  // 임의로 "모드 토글" 버튼 클릭 시 동작하는 예시 (편집/읽기 전환 등)
  const [editMode, setEditMode] = useState(true);

  const toggleMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: '60em' }}>
      {/* 상단 제목 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <h3>{children}</h3>
      </div>

      {/* Static Toolbar (플러그인) */}
      {editMode && (
        <Toolbar>
          {(externalProps) => (
            <>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              <Separator {...externalProps} />
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
            </>
          )}
        </Toolbar>
      )}

      {/* 에디터 영역 */}
      <div style={{backgroundColor:'#FFFFFF', minHeight: 200, border: '1px solid #eee', padding: '10px', marginTop: 10 }}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          readOnly={!editMode} // 편집 모드가 아닐 때 readOnly
          placeholder="내용을 입력하세요..."
        />
      </div>
    </div>
  );
};

export default MyEditor;
