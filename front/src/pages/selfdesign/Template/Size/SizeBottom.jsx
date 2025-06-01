// Sizespec.jsx
import React, { useState, useEffect } from "react";
import "./Sizespeccss.css";
import { SizeController,SizeControllerRow } from "../../../../components"; // 기존 SizeController (전체 컨트롤러)


function Sizespec({ selectedSize, setSelectedSize }) {
  // 상단 헤더에 표시할 사이즈 배열
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // 초기 행 데이터 배열
  const initialRows = [
    { category: "A", label: "총 기장", values: [65, 67, 69, 71, 73, 75, 77], type: "highlight" },
    { category: "B", label: "가슴 단면", values: [82, 86, 90, 94, 98, 102, 106], type: "highlight" },
    { category: "C", label: "밑단 단면", values: [90, 94, 98, 102, 106, 110, 114], type: "highlight" },
    { category: "D", label: "소매 기장", values: [20, 21, 22, 23, 24, 25, 26], type: "highlight" },
    { category: "E", label: "어깨 단면", values: [38, 40, 42, 44, 46, 48, 50], type: "normal" },
    { category: "F", label: "허리 단면", values: [70, 72, 74, 76, 78, 80, 82], type: "normal" },
    { category: "G", label: "암홀 (직선)", values: [18, 18.5, 19, 19.5, 20, 20.5, 21], type: "normal" },
    { category: "H", label: "소매단 단면", values: [12, 12.5, 13, 13.5, 14, 14.5, 15], type: "normal" },
    { category: "I", label: "소매통 단면", values: [14, 14.5, 15, 15.5, 16, 16.5, 17], type: "normal" },
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

      // 테이블의 값도 초기화
      setRows(initialRows);
    }
  }, [selectedSize]);

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

  return (
    <div className="table-container">
      <div className="imgContainer">
      {/* 상단 이미지 */}
      <img style={{ width: "600px" }} src="/image/pants.png" alt="이미지가 없습니다" />
      
      {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
      {rows.find((row) => row.category === "A") && (
        <div className="controller-rowA">
          <SizeControllerRow
            row={rows.find((row) => row.category === "A")}
            rowIndex={rows.findIndex((row) => row.category === "A")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
        </div>
        
      )}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "B") && (
        <div className="controller-rowB">
          <SizeControllerRow
            row={rows.find((row) => row.category === "B")}
            rowIndex={rows.findIndex((row) => row.category === "B")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
        </div>
        
      )}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "C") && (
        <div className="controller-rowC">
          <SizeControllerRow
            row={rows.find((row) => row.category === "C")}
            rowIndex={rows.findIndex((row) => row.category === "C")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
        </div>
        
      )}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "D") && (
        <div className="controller-rowD">
          <SizeControllerRow
            row={rows.find((row) => row.category === "D")}
            rowIndex={rows.findIndex((row) => row.category === "D")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
        </div>
        
      )}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "E") && (
        <div className="controller-rowE">
          <SizeControllerRow
            row={rows.find((row) => row.category === "E")}
            rowIndex={rows.findIndex((row) => row.category === "E")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
        </div>
        
      )}
       
       {/* {rows.find((row) => row.category === "F") && ( 허리단면 부분
        <div className="controller-rowF">
          <SizeControllerRow
            row={rows.find((row) => row.category === "F")}
            rowIndex={rows.findIndex((row) => row.category === "F")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
        </div>
        
      )} */}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "G") && (
        <div className="controller-rowG">
          <SizeControllerRow
            row={rows.find((row) => row.category === "G")}
            rowIndex={rows.findIndex((row) => row.category === "G")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
        </div>
        
      )}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "H") && (
        <div className="controller-rowH">
          <SizeControllerRow
            row={rows.find((row) => row.category === "H")}
            rowIndex={rows.findIndex((row) => row.category === "H")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
        </div>
        
      )}
       {/* "총 기장"에 대한 별도의 증감 컨트롤러 (이미지 바로 아래에 위치) */}
       {rows.find((row) => row.category === "I") && (
        <div className="controller-rowI">
          <SizeControllerRow
            row={rows.find((row) => row.category === "I")}
            rowIndex={rows.findIndex((row) => row.category === "I")}
            onIncrement={handleIncrementRow}
            onDecrement={handleDecrementRow}
          />
        </div>
        
        
      )}
      
      </div>
      
  


      

      {/* 사이즈 스펙 테이블 */}
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

      {/* SizeController를 별도로 사용하지 않고, "총 기장" 컨트롤러는 위에서 따로 관리 */}
    </div>
  );
}

export default Sizespec;