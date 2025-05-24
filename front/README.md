contract 폴더
  - 의뢰인 계약관리 폴더
  - 주소: http://localhost:3000/client/contract
  - src\components\contract
      -ContractItem 폴더: 단일 계약항목 관련
      -ContractList 폴더: 계약서들 리스트
      -ContractSearchAndFilter 폴더: 검색과 필터 관련
      -ContractSidebar 폴더: 사이드바 컴포넌트
  - src\pages\contract
      -전체계약, 중요, 계약서 상세 관련 
  - src\layouts\ContractLayout.jsx => 계약관리 레이아웃
DesignerContract
  - 디자이너 계약서 관리 관련 폴더
  - 주소: http://localhost:3000/designer/DesignerContractManage
  - src\components\DesignerContract
      -DesignerContractList 폴더: 디자이너 계약서들의 리스트
      -DesignerContractSearchAndFilter 폴더: 검색과 필터 관련
      -DesignerContractSidebar 폴더: 사이드바
      -DesignerContractSortAndCreate 폴더: 정렬과 상태에 해당하는 컴포넌트
  - src\pages\DesignerContract
     -디자이너쪽 계약서 관리의 해당하는 컴포넌트를 아우르는 파일
DesignerContractCreate
  - 디자이너 계약서 작성 관련 폴더
  - 주소: http://localhost:3000/designer/DesignerContractCreate
  - src\components\DesignerContractCreate
      -  DesignerContractInputSection.jsx => 계약서에서 입력 관련 컴포넌트
      -  DesignerContractFileUpload.jsx => 파일업로드 관련 컴포넌트
      -  DesignerContractEditor.jsx => 텍스트편집기 관련 컴포넌트
      -  DesignerContractCreate.module.css => 디자이너-계약관리-계약서 작성에서만 사용하는 css파일
  - src\pages\DesignerContractCreate
      -DesignerContractCreatePage.jsx => 계약서 작성 관련 컴포넌트를 아우르는 페이지 파일 


src/pages/contract
1.ContractDetailPage.jsx => 계약관리 누르면 보이는 상세 페이지
2.ContractSendMessagePage.jsx => 보낸 메시지 목록 보는 페이지 
3,MessageDetailPage.jsx => 메시지 누르면 보이는 상세페이지

src/pages/contract/Message
1.Message.jsx => 계약 메시지 컴포넌트
1.Message.css
2.MessageHeader.jsx => 메세지 헤더 컴포넌트
2.MessageHeader.css
3.MessageList.jsx => 메세지 보이는 리스트 컴포넌트
3.MessageList.css

src/pages/contract/DetailUI
1.DetailList.jsx => 계약관리 상세 리스트 컴포넌트
1.DetailList.css


*05.13.화요일*
1. 의뢰인, 디자이너 메인페이지 ui 수정(이미지나 글귀들 추가)
2. 메뉴바 폰트크기 조절
3. 직접의류디자인(템플릿, 파일업로드, 브랜드) 이미지 필요한 부분의 이미지 집어넣음
  -원단선택: 원단선택하고 넘어갈때 팝업에 선택한 원단이 뜨지 않음(수정필요)
  -최종확인: 교수님이 말씀하신 이미지나 내용 채워야하는거는 추가 진행 필요
  -파일업로드: 이미지 크기가 크면 비율 그대로 작아지게 만들어야함(수정필요)
4. 단위 고정단위인 px에서 rem으로 단위 바꾸는 중

*05.19.월요일*
1. pages\selfdesign\Template\Fabric\Fabric.jsx 
   -Fabric.jsx 파일에 원단 색상 선택할 수 있는 부분 옆에다가 혼합률 선택 가능한 기능 추가함.
2. pages\selfdesign\Template\FinalConfirmation\FinalConfirmation.jsx
   -FinalConfirmation.jsx 파일에 앞서서 선택한 옷 카테고리, 원단(이미지/이름/혼합률/색상), 사이즈, 메모란 추가하며 ui 수정함.
  -selectedFabric: 선택한 원단 목록
  -selectedColors: 각 원단의 색상 값 (Hex 코드)
  -selectedRatios: 각 원단의 혼합률 (숫자값)
3. pages\DesignerContractCreatePage\\DesignerContractCreatePage.jsx
   계약서작성페이지 더 세세하게 세부사항 내용들 추가 (계약 내용 샘플, 작업 범위 체크란, 개인 정보 동의 체크란, 서명)
	-개인정보 동의에 체크해야지, 작성저장버튼이 활성화 됨
  -추가로 수정한 관련 페이지: DesignerContractEditor.jsx
