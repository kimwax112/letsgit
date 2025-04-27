dasf
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
