import './DetailList.css';
import MyEditor from '../../Request/Request/ui/MyEditor';
import jeans from '../../../assets/jeans.png';
import NextButtonUI from '../../../components/NextButton/NextButton';
import styled from 'styled-components';
import { FaStar, FaRegStar } from "react-icons/fa"; // 별 아이콘
import share from '../../../assets/share.png';  
import print from '../../../assets/print.png';

const Button = styled(NextButtonUI)`
  background-color: #d5d5d5;
  color: black;
`;

export default function DetailList({ contract, onToggleStar }) {
  // contract 데이터가 없을 경우 기본값 설정
  if (!contract) {
    return <div>계약서 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="Detailcontainer">
      <div className="Detailtitle">
        <span>전체 계약</span>
      </div>
      <div className="HeaderContainer">
        <div className="DetailHeaderContainer">
          <div className="DetailHeader">
            <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={onToggleStar}>
              {contract.isStarred ? <FaStar color="#FFD700" /> : <FaRegStar />}
            </span>
            <span>계약 이름: {contract.title}</span> {/* contract.title 사용 */}
            <div className="SharePrint">
              <button>공유</button>
              <img src={share} alt="공유 아이콘" />
              <button>인쇄</button>
              <img src={print} alt="인쇄 아이콘" />
            </div>
          </div>
        </div>

        <div className="TitleContent">
          <p>보낸사람: {contract.sender || "미지정"}</p> {/* contract.sender 추가 (데이터에 없으므로 기본값) */}
          <p>받는사람: {contract.recipient || "미지정"}</p> {/* contract.recipient 추가 (데이터에 없으므로 기본값) */}
          <p style={{ fontSize: '12px' }}>{contract.date}</p> {/* contract.date 사용 */}
        </div>
      </div>

      <div className="DetailContent">
        <div className="left">
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{contract.title}</p> {/* contract.title 사용 */}
          <p><img src={contract.image}  style={{width: '100%',height: '300px', objectFit: 'contain',backgroundColor: '#f0f0f0', }} alt="계약 이미지" /></p>
          <p>디자이너: {contract.designer || "미지정"}</p> {/* contract.designer 추가 (데이터에 없으므로 기본값) */}
          <p>의뢰인: {contract.client || "미지정"}</p> {/* contract.client 추가 (데이터에 없으므로 기본값) */}
          <p>원단: {contract.material || "미지정"}</p> {/* contract.material 추가 (데이터에 없으므로 기본값) */}
          <p>공장: {contract.factory || "미지정"}</p> {/* contract.factory 추가 (데이터에 없으므로 기본값) */}
          <p>기간: {contract.deadline || "2025.2.25까지"}</p> {/* contract.deadline 추가 (데이터에 없으므로 기본값) */}
        </div>
        <div className="right">
          <p>계약 작성 시간: {contract.createdAt || "2025.01.01"}</p> {/* contract.createdAt 추가 (데이터에 없으므로 기본값) */}
        </div>
      </div>

      <div className="Editor">
        <MyEditor>디자이너에게 요청보내기</MyEditor>
      </div>

      <div className="Detailfooter">
        <div className="DetailButton"><NextButtonUI>요청보내기</NextButtonUI></div>
        <Button>작성취소</Button>
        <Button>저장</Button>
      </div>
    </div>
  );
}