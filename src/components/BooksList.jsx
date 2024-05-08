import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";
function BooksList() {
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
      <ul className="flex flex-col items-center justify-center gap-3 my-3">
        {data &&
          data.map((book) => {
            return (
              <li className=" border p-5 rounded-xl lg:w-[40rem] flex gap-10 w-full ">
                <figure className=" place-content-center ">
                  <img
                    className="lg:size-40 size-30 lg:object-contain object-cover"
                    src={book.image}
                    alt="book"
                  />
                </figure>
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h1 className="text-xl font-bold ">{book.title}</h1>
                    <span className="text-xs text-teal-600">{book.author}</span>
                  </div>
                  <p className="line-clamp-3 lg:w-[30rem] mb-2 w-full ">
                    {book.description}
                  </p>
                  <div className="flex gap-10 items-baseline ">
                    <span className=" text-accent"> Pages: {book.pages}</span>
                    <button className=" ml-1 text-info">
                      {" "}
                      Cover: {book.cover}
                    </button>
                  </div>
                  <div className="card-actions justify-start line-clamp-4">
                    <h3 className="text-sm font-semibold ml-2 mb-1">Geners:</h3>
                    {book.geners &&
                      book.geners.map((gener, i) => {
                        return (
                          <button
                            key={i}
                            className="bg-transparent badge badge-outline ml-1"
                          >
                            {gener}
                          </button>
                        );
                      })}
                    <div className="flex justify-end items-end">
                      <button className="btn btn-info ">More</button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default BooksList;
