import React from "react";

const ProductLoadingList = ({ view }) => {
  if (view !== "list") return null;

  // tạo 10 skeleton items
  const skeletons = Array.from({ length: 4 });

  return (
    <div className="flex flex-col gap-4">
      {skeletons.map((_, i) => (
        <div
          key={i}
          className="flex items-start w-full p-4 border border-gray-200 rounded-lg animate-pulse"
        >
          {/* Ảnh bên trái */}
          <div className="flex items-center justify-center w-48 h-44 bg-gray-300 rounded dark:bg-gray-700 mr-4">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 0 1 1 0 3 1.5 1.5 0 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9512.775 4.757 1.546-1.887a1 1 0 0 1 1.618.112.541 4a1 1 0 0 1 .028 1.0112" />
            </svg>
          </div>

          {/* Nội dung bên phải */}
          <div className="flex-1 space-y-3">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-64"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductLoadingList;
