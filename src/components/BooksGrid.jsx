import React from "react";

import useGlobalContext from "../hooks/useGlobalContext";

function BooksGrid() {
  let { cretae } = useGlobalContext();
  let { data } = cretae;

  return (
    <>
      {!data && (
        <h3 className="text-center mb-10 mt-5 font-bold">
          Loading ...{" "}
          <span className="loading loading-spinner loading-md "></span>
        </h3>
      )}
      <ul className="lg:grid-cols-3 grid grid-cols-1  md:grid-cols-2">
        {data &&
          data.map((book) => {
            return (
              <li
                key={book.id}
                className="card w-96 grow bg-base-100 shadow-xl m-10 md:w-96  "
              >
                <figure>
                  <img
                    className=" h-72 object-contain"
                    src={book.image}
                    alt="book"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title flex justify-between items-baseline ">
                    {book.title}
                    <span className="text-xs text-teal-600">{book.author}</span>
                  </h2>
                  <p className="line-clamp-2 mb-2">{book.description}</p>
                  <div className="flex gap-10 items-baseline ">
                    <span className=" text-accent"> Pages: {book.pages}</span>
                    <button className=" ml-1 text-info">
                      {" "}
                      Cover: {book.cover}
                    </button>
                  </div>
                  <div className="card-actions justify-start line-clamp-3">
                    <h3 className="text-sm font-semibold mb-1">Geners:</h3>
                    {book.geners &&
                      book.geners.map((gener, i) => {
                        return (
                          <button
                            key={i}
                            className="bg-transparent badge badge-outline mr-1 "
                          >
                            {gener}
                          </button>
                        );
                      })}
                  </div>

                  <button className="btn btn-info mt-2">More</button>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default BooksGrid;
