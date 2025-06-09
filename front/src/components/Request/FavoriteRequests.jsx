// FavoriteRequests.jsx (이전에 주신 코드 그대로 유지)

import axios from 'axios';
import { useEffect, useState } from 'react';

function FavoriteRequests() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // 이제 이곳에서 sessionStorage.getItem('designerId')가 null이 아닐 것입니다.
    const designerId = sessionStorage.getItem('designerId'); 
    console.log("디자이너 ID (FavoriteRequests):", designerId); 

    if (!designerId) { 
      console.error("디자이너 ID가 없습니다. (로그인 필요)");
      // 로그인 페이지로 리다이렉트하는 등의 추가 처리 필요
      return;
    }

    axios.get(`http://localhost:8081/designer/favorites/${designerId}`)
      .then(res => {
        setFavorites(res.data);
      })
      .catch(err => {
        console.error('찜한 의뢰 목록 불러오기 실패:', err);
        if (err.response && err.response.status === 401) {
            alert("찜 목록을 보려면 로그인이 필요합니다.");
            // 로그인 페이지로 리다이렉트
        } else {
            alert("찜 목록을 불러오는 데 실패했습니다.");
        }
      });
  }, []); // 의존성 배열을 비워두면 컴포넌트 마운트 시 한 번만 실행됩니다.

  return (
    <div>
      <h2>찜한 의뢰 목록</h2>
      <ul>
        {favorites.map(item => (
          // key prop은 각 아이템을 고유하게 식별해야 합니다.
          // 서버에서 받은 Request 객체에 id 필드가 있는지 확인하세요.
          // 만약 REQUEST_ID로 온다면 item.REQUEST_ID로 접근하거나 매핑 시 별칭을 지정해야 합니다.
          <li key={item.id}>{item.title || '제목 없음'}</li> 
        ))}
      </ul>
    </div>
  );
}

export default FavoriteRequests;