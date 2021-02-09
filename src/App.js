import React, { useState } from "react";
import { range } from "lodash";

export default function App() {
  const numberOfPages = range(1, 101);
  const [currentPage, setCurrentPage] = useState(1);
  const visibleCount = 5;
  const getSliceStart = () => {
    if (range(0, Math.ceil(visibleCount / 2)).includes(currentPage)) {
      return numberOfPages[0] - 1;
    } else if (
      range(
        numberOfPages.length - Math.floor(visibleCount / 2),
        numberOfPages.length + 1
      ).includes(currentPage)
    ) {
      return numberOfPages[numberOfPages.length - 1 - visibleCount];
    } else {
      return currentPage - Math.ceil(visibleCount / 2);
    }
  };
  const getSliceEnd = () => {
    if (
      range(
        numberOfPages.length - Math.floor(visibleCount / 2),
        numberOfPages.length + 1
      ).includes(currentPage)
    ) {
      return numberOfPages[numberOfPages.length - 1];
    } else if (range(0, Math.ceil(visibleCount / 2)).includes(currentPage)) {
      return visibleCount;
    } else {
      return currentPage + Math.floor(visibleCount / 2);
    }
  };

  return (
    <>
      {/* previous button */}
      <button
        onClick={() =>
          setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        Prev
      </button>

      {/* previous dots button */}
      {currentPage - 1 > Math.ceil(visibleCount / 2) && (
        <button
          onClick={() =>
            setCurrentPage(
              currentPage - visibleCount > 0 ? currentPage - visibleCount : 1
            )
          }
        >
          ...
        </button>
      )}

      {/* mapping through a sliced array of page numbers */}
      {numberOfPages.slice(getSliceStart(), getSliceEnd()).map((number) => (
        <button
          onClick={() => setCurrentPage(number)}
          style={{ background: currentPage === number ? "coral" : "initial" }}
        >
          {number}
        </button>
      ))}

      {/* next dots button */}
      {currentPage <
        numberOfPages[numberOfPages.length - 1] -
          Math.floor(visibleCount / 2) && (
        <button
          onClick={() =>
            setCurrentPage(
              currentPage + visibleCount <= numberOfPages.length
                ? numberOfPages[currentPage + visibleCount - 1]
                : numberOfPages[numberOfPages.length - 1]
            )
          }
        >
          ...
        </button>
      )}

      {/* next button */}
      <button
        onClick={() =>
          setCurrentPage(
            currentPage < numberOfPages.length ? currentPage + 1 : currentPage
          )
        }
      >
        next
      </button>
    </>
  );
}