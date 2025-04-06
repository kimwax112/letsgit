// db.js (OracleDB 연결 설정)
import oracledb from "oracledb";

const dbConfig = {
  user: "system",
  password: "tiger",
  connectString: "localhost/XE", // OracleDB 연결 정보
};

// ✅ 데이터베이스 초기화
async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log("✅ OracleDB 연결 성공");
  } catch (err) {
    console.error("❌ OracleDB 연결 실패:", err);
  }
}

// ✅ 쿼리 실행 함수
async function executeQuery(query, binds = {}, options = { autoCommit: true }) {
    let connection;
    try {
      connection = await oracledb.getPool().getConnection(); // ✅ 풀에서 연결 가져오기
      const result = await connection.execute(query, binds, options);
      return result;
    } catch (err) {
      console.error("쿼리 실행 오류:", err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("연결 닫기 실패:", err);
        }
      }
    }
  }

module.exports = { initialize, executeQuery };
