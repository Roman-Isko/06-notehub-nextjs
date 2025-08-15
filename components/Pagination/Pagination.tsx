// import css from "./Pagination.module.css";

// export interface PaginationProps {
//   page: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// export default function Pagination({
//   page,
//   totalPages,
//   onPageChange,
// }: PaginationProps) {
//   return (
//     <div className={css.pagination}>
//       <button
//         onClick={() => onPageChange(Math.max(page - 1, 1))}
//         disabled={page === 1}
//       >
//         Prev
//       </button>
//       <span>{page}</span>
//       <button
//         onClick={() => onPageChange(Math.min(page + 1, totalPages))}
//         disabled={page === totalPages}
//       >
//         Next
//       </button>
//     </div>
//   );
// }

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 0) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1} // ReactPaginate починає з 0
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      previousLabel="←"
      nextLabel="→"
    />
  );
}

// import ReactPaginate from "react-paginate";
// import styles from "./Pagination.module.css";

// interface PaginationProps {
//   pageCount: number;
//   forcePage: number;
//   onPageChange: (selected: { selected: number }) => void;
// }

// const Pagination = ({
//   pageCount,
//   forcePage,
//   onPageChange,
// }: PaginationProps) => {
//   if (pageCount <= 0) return null;

//   return (
//     <ReactPaginate
//       pageCount={pageCount}
//       forcePage={forcePage}
//       onPageChange={onPageChange}
//       containerClassName={styles.pagination}
//       activeClassName={styles.active}
//       pageRangeDisplayed={3}
//       marginPagesDisplayed={1}
//       previousLabel="←"
//       nextLabel="→"
//     />
//   );
// };

// export default Pagination;
