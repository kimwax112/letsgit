import express from "express";
import cors from "cors";
import { initialize, executeQuery } from "./db.js"; // .js 확장자 필요

const app = express();
app.use(cors());
app.use(express.json());

initialize();

// ✅ 사용자별 의류 선택 데이터 저장 API
app.post("/api/selected-clothing", async (req, res) => {
  const { userId, clothingType } = req.body;

  if (!userId || !clothingType) {
    return res.status(400).json({ message: "userId와 clothingType이 필요합니다." });
  }

  const query = `
    INSERT INTO selected_clothing (user_id, clothing_type, created_at)
    VALUES (:userId, :clothingType, SYSDATE)
  `;

  try {
    await executeQuery(query, { userId, clothingType });
    res.status(200).json({ message: "의류 저장 완료" });
  } catch (error) {
    res.status(500).json({ message: "저장 실패", error });
  }
});

// ✅ 사용자별 저장된 의류 조회 API
app.get("/api/selected-clothing/:userId", async (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT clothing_type, created_at
    FROM selected_clothing
    WHERE user_id = :userId
    ORDER BY created_at DESC
  `;

  try {
    const result = await executeQuery(query, { userId });
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "조회 실패", error });
  }
});

const PORT = 8081;
app.listen(PORT, () => console.log(`✅ 서버 실행 중: http://localhost:${PORT}`));
