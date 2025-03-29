import { useState, useEffect, navigate} from "react";
import axios from "axios";

export default function PostPrac() {
  const [username, setUsername] = useState("");
  const [contents, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const handleLogout = async () => {
    try {
        const response = await fetch("http://localhost:8081/api/logout", {
            method: "POST",
            credentials: "include", // ✅ 세션 유지
        });

        if (response.ok) {
            navigate("/"); // ✅ 로그인 페이지로 이동
        } else {
            console.error("로그아웃 실패:", await response.text());
        }
    } catch (error) {
        console.error("로그아웃 요청 오류:", error);
    }
};
  // 현재 로그인한 사용자 정보 가져오기
  useEffect(() => {
    axios.get("http://localhost:8081/api/user", { withCredentials: true })
      .then(response => {
        if (response.data.username) {
          setUsername(response.data.username);
        }
      })
      .catch(error => console.error("로그인 상태 확인 실패", error));
  }, []);

  // 글 작성 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contents.trim()) return;

    try {
      await axios.post("http://localhost:8081/api/posts", { contents }, { withCredentials: true });
      setContent("");
      fetchPosts();
    } catch (error) {
      console.error("글 작성 실패", error);
    }
  };

  // 글 목록 불러오기
  const fetchPosts = () => {
    axios.get("http://localhost:8081/api/posts", { withCredentials: true })
      .then(response => setPosts(response.data))
      .catch(error => console.error("글 목록 불러오기 실패", error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">

      {username ? (
        <>
          <p className="text-sm text-gray-500">작성자: {username}</p>
          <form onSubmit={handleSubmit} className="mt-2">
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="내용을 입력하세요"
              value={contents}
              onChange={(e) => setContent(e.target.value)}
              style={{width: 500, height: 300}}
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" type="submit">
              저장
            </button>
          </form>
        </>
      ) : (
        <p className="text-red-500">로그인 후 글을 작성할 수 있습니다.</p>
      )}
      <div className="mt-4">
        {/*<h3 className="text-lg font-bold">글 목록</h3>
        {posts.map((post, index) => (
          <div key={index} className="border-b py-2">
            <p className="text-sm text-gray-500">{post.author}</p>
            <p>{post.contents}</p>
          </div>
        ))}*/}
      </div>
    </div>
  );
}
