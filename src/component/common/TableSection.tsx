import React from "react";
import MainTable from "./MainTable";
import SearchBox from "./SearchBox";
import Pagination from "../common/Pagination";

const TableSection: React.FC = ({
  tableHead,
  tableRow,
  totalCount,
  isPagination,
  isSearch,
  isSelect,
  expandFields,
  actions,
}) => {
  return (
    <>
      <div className="flex items-center mb-10 justify-between">
        {isSearch && (
          <SearchBox
            search={isSearch.search}
            setSearch={isSearch.setSearch}
            searchHandler={isSearch.searchHandler}
          />
        )}
        <div>تعداد کل: {totalCount || 0}</div>
      </div>

      <MainTable
        tableHead={tableHead}
        tableRow={tableRow || []}
        pageIndex={isPagination?.pageIndex || 1}
        pageSize={isSelect?.pageSize || 10}
        expandFields={expandFields}
        actions={actions}
      />

      <div className="flex items-center justify-center gap-4 mt-4">
        {isPagination && (
          <Pagination
            pageIndex={isPagination.pageIndex}
            totalPages={isPagination.totalPages}
            pageChangeHandler={isPagination.pageChangeHandler}
          />
        )}
        {isSelect && (
          <select
            value={isSelect.pageSize}
            onChange={isSelect.pageSizeHandler}
            className="h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
          </select>
        )}
      </div>
    </>
  );
};

export default TableSection;
