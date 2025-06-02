// Sizespec.jsx
import React, { useState, useEffect } from "react";
import { SizeController,SizeControllerRow } from "../../../../components"; // 기존 SizeController (전체 컨트롤러)
import "./SizeBottom.css"

function Sizespec({ selectedSize, setSelectedSize }) {
  // 상단 헤더에 표시할 사이즈 배열
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // 초기 행 데이터 배열
  const initialRows = [
    { category: "A", label: "총길이", values: [97, 98, 99, 100, 102, 104, 106], type: "highlight" },
    { category: "B", label: "허리둘레", values: [72, 76, 80, 84, 88, 92, 96], type: "highlight" },
    { category: "C", label: "엉덩이둘레", values: [88, 92, 96, 100, 104, 108, 112], type: "highlight" },
    { category: "D", label: "밑위길이", values: [26, 27, 28, 29, 30, 31, 32], type: "highlight" },
    { category: "E", label: "허벅지단면", values: [27, 28, 30, 31, 33, 34, 46], type: "normal" },
    { category: "F", label: "밑단둘레", values: [34, 35, 36, 37, 38, 39, 40], type: "normal" },
    
    
    { 
      category: "J", 
      label: "목 너비", 
      values: Array(7).fill("디자인 선택 후 산출"), 
      type: "disabled", 
      colpan: 7 
    },
    { 
      category: "K", 
      label: "목 파임", 
      values: Array(7).fill("디자인 선택 후 산출"), 
      type: "disabled", 
      colspan: 7 
    }
  ];

  // rows 상태: 입력값 변경 및 증감 기능을 위해 상태 관리
  const [rows, setRows] = useState(initialRows);
  const [editable, setEditable] = useState({
    xs: true,
    s: false,
    m: false,
    l: false,
    xl: false,
    "2xl": false,
    "3xl": false,
  });

  useEffect(() => {
    // selectedSize가 null일 경우 editable 상태와 테이블 값 초기화
    if (selectedSize === null) {
      setEditable({
        xs: true,
        s: false,
        m: false,
        l: false,
        xl: false,
        "2xl": false,
        "3xl": false,
      });
            // localStorage에서 rows 로드 또는 초기화
      const savedRows = localStorage.getItem("sizeSpecRows");
      if (savedRows) {
        try {
          setRows(JSON.parse(savedRows));
        } catch (e) {
          console.error("localStorage rows 파싱 오류:", e);
          setRows(initialRows);
        }
      } else {
        setRows(initialRows);
      }
    }
  }, [selectedSize]);

  // useEffect(() => {
  //   // selectedSize가 null일 경우 editable 상태와 테이블 값 초기화
  //   if (selectedSize === null) {
  //     setEditable({
  //       xs: true,
  //       s: false,
  //       m: false,
  //       l: false,
  //       xl: false,
  //       "2xl": false,
  //       "3xl": false,
  //     });
  //     // 테이블의 값도 초기화
  //     setRows(initialRows);
  //   }
  // }, [selectedSize]);

  const handleCellClick = (size) => {
    // 클릭한 사이즈를 활성화하고, 나머지 사이즈는 비활성화
    const newEditable = { ...editable };
    Object.keys(newEditable).forEach((key) => {
      newEditable[key] = key === size;
    });
    setEditable(newEditable);
    setSelectedSize(size);  // 선택된 사이즈 상태 업데이트
  };
  // 텍스트 입력 변경 처리 함수
  const handleInputChange = (rowIndex, event) => {
    const newRows = [...rows];
    const newValue = event.target.value;

    const valueToUse = newValue.trim() === '' ? '0' : newValue;

    // 값이 숫자일 경우만 처리
    if (!isNaN(valueToUse)) {
      const numericValue = parseFloat(valueToUse);
      const diff = numericValue - rows[rowIndex].values[0];
      newRows[rowIndex].values = rows[rowIndex].values.map((value, index) => value + diff * index);
      newRows[rowIndex].values[0] = numericValue; // 첫 번째 값만 변경
      setRows(newRows);
    } else {
      event.preventDefault();
    }
  };

  // 특정 행(rowIndex)의 첫번째 값을 증감하는 로직
  const applyDiffToRow = (rowIndex, diff) => {
    const newRows = [...rows];
    const currentValue = newRows[rowIndex].values[0];
    newRows[rowIndex].values = newRows[rowIndex].values.map((value, idx) =>
      typeof value === "number" ? value + diff * idx : value
    );
    newRows[rowIndex].values[0] = currentValue + diff;
    setRows(newRows);
  };

  const handleIncrementRow = (rowIndex) => {
    applyDiffToRow(rowIndex, 1);
  };

  const handleDecrementRow = (rowIndex) => {
    applyDiffToRow(rowIndex, -1);
  };

  // "총 기장" 행의 인덱스 찾기
  const totalLengthIndex = rows.findIndex((row) => row.category === "A");

    // rows가 변경될 때 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem("sizeSpecRowsBottom", JSON.stringify(rows));
    } catch (e) {
      console.error("localStorage 저장 오류:", e);
    }
  }, [rows]);

  return (
    <div className="table-container2">
      <div className="left-section">
      {/* 상단 이미지 */}
      <div class="controll-container">
      {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
      {rows.find((row) => row.category === "A") && (
        
          <SizeControllerRow
            row={rows.find((row) => row.category === "A")}
            rowIndex={rows.findIndex((row) => row.category === "A")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />        
      )}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "B") && (
       
          <SizeControllerRow
            row={rows.find((row) => row.category === "B")}
            rowIndex={rows.findIndex((row) => row.category === "B")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          /> 
      )}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "C") && (
       
          <SizeControllerRow
            row={rows.find((row) => row.category === "C")}
            rowIndex={rows.findIndex((row) => row.category === "C")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
      )}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "D") && (
      
          <SizeControllerRow
            row={rows.find((row) => row.category === "D")}
            rowIndex={rows.findIndex((row) => row.category === "D")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
      )}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "E") && (
          <SizeControllerRow
            row={rows.find((row) => row.category === "E")}
            rowIndex={rows.findIndex((row) => row.category === "E")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
      )}
      </div>
      <div className="imgContainer">
      <img style={{ width: "500px", }} src="/image/pants.png" alt="이미지가 없습니다" />
      
      </div>
</div>      
  


      

      {/* 사이즈 스펙 테이블 */}
      <div className="right-section">
      <table className="sizespec-table">
        <thead>
          <tr>
            <th style={{ width: "150px" }} colSpan={2}>(단위 : cm)</th>
            {sizes.map((size, index) => (
              <th
                key={index}
                onClick={() => setSelectedSize(size)}
                className={selectedSize === size ? "active" : ""}
                style={{ cursor: "pointer" }}
              >
                {size && size.toLowerCase ? size.toLowerCase() : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={row.type}>
              <td className="category">{row.category}</td>
              <td>{row.label}</td>
              {row.colspan ? (
                <td colSpan={row.colspan} className="merged-cell">
                  {row.values[0]}
                </td>
              ) : (
                row.values.map((value, colIndex) => (
                  <td key={colIndex}>
                    {colIndex === 0 ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(event) => handleInputChange(rowIndex, event)}
                        style={{ width: "30px" }}
                      />
                    ) : (
                      typeof value === "number" ? value.toFixed(1) : value
                    )}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* SizeController를 별도로 사용하지 않고, "총 기장" 컨트롤러는 위에서 따로 관리 */}
    </div>
  );
}

export default Sizespec;