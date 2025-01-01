import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / perPage);
  let startPage = pageNumber;
  let diff = totalPage - pageNumber;

  if (diff <= showItem) {
    startPage = totalPage - showItem;
  }

  let endPage = startPage < 0 ? showItem : showItem + startPage;

  if (startPage <= 0) {
    startPage = 1;
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          key={i}
          className={`${
            pageNumber === i
              ? "bg-blue-600 text-zinc-200"
              : "bg-zinc-200 text-zinc-800"
          } flex rounded-full justify-center w-[33px] h-[33px] items-center cursor-pointer`}
          onClick={() => setPageNumber(i)}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <>
      <ul className="flex gap-3">
        {pageNumber > 1 && (
          <li
            className="flex rounded-full bg-zinc-50 text-zinc-600 justify-center w-[33px] h-[33px] items-center cursor-pointer"
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            <FaArrowLeft />
          </li>
        )}
        {createBtn()}
        {pageNumber < totalPage && (
          <li
            onClick={() => setPageNumber(pageNumber + 1)}
            className="flex justify-center items-center cursor-pointer"
          >
            <FaArrowRight />
          </li>
        )}
      </ul>
    </>
  );
};

export default Pagination;
