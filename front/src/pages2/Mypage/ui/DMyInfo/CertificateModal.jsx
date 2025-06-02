import React from 'react';

const CertificateModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-xl shadow-lg p-6 relative">
        {/* 닫기 버튼 */}
        <button 
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ❌
        </button>

        {/* 제목 */}
        <h2 className="text-xl font-bold mb-4">자격증</h2>

        {/* 입력 필드들 */}
        <div className="flex flex-col gap-3">
          {/* 자격증명 */}
          <label className="flex flex-col text-sm">
            자격증명
            <input 
              type="text" 
              className="border border-gray-300 rounded-md p-2 mt-1"
              placeholder="예: 컴퓨터활용능력 1급"
            />
          </label>

          {/* 발급일 */}
          <label className="flex flex-col text-sm">
            발급일
            <input 
              type="date" 
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
          </label>

          {/* 발급기관 */}
          <label className="flex flex-col text-sm">
            발급기관
            <input 
              type="text" 
              className="border border-gray-300 rounded-md p-2 mt-1"
              placeholder="예: 대한상공회의소"
            />
          </label>

          {/* 증빙 파일 */}
          <label className="flex flex-col text-sm">
            증빙 자료 첨부
            <input 
              type="file" 
              className="mt-1"
            />
          </label>
        </div>

        {/* 저장 버튼 */}
        <div className="mt-5 text-right">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
