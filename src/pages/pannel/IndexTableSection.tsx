import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainTable from "../../component/common/MainTable";
import SearchBox from "../../component/common/SearchBox";
import FilterModal from "../../component/common/FilterModal";
import useUsersQuery from "../../hooks/react-query/useUserQuery";

const tableHead = [
  { label: "ردیف", key: "index" },
  { label: "نام", key: "firstName" },
  { label: "نام خانوادگی", key: "lastName" },
  { label: "کد ملی", key: "nationalCode" },
  { label: "نام کاربری", key: "userName" },
  { label: "وضعیت کاربر", key: "status" },
  { label: "تایید دو مرحله ای", key: "twoFactorEnabled" },
  { label: "نوع کاربر", key: "type" },
  { label: "عملیات", key: "actions" },
];

const filter = [{ label: "نوع کاربر", key: "type" }];

const TableSection: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<string>(
    () => searchParams.get("search") || ""
  );
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [pageSize, setPageSize] = useState<number>(() =>
    parseInt(searchParams.get("pageSize") || "10")
  );
  const [pageIndex, setPageIndex] = useState<number>(() =>
    parseInt(searchParams.get("pageIndex") || "1")
  );

  const handleSearch = () => {
    setDebouncedSearch(search);
    setPageIndex(1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPageIndex(1);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  const { data } = useUsersQuery(pageSize, pageIndex, debouncedSearch);

  useEffect(() => {
    const params: any = {
      pageSize: pageSize.toString(),
      pageIndex: pageIndex.toString(),
    };
    if (debouncedSearch.trim() !== "") {
      params.search = debouncedSearch;
    }
    setSearchParams(params);
  }, [debouncedSearch, pageSize, pageIndex, setSearchParams]);

  useEffect(() => {
    const newPageSize = parseInt(searchParams.get("pageSize") || "10");
    const newPageIndex = parseInt(searchParams.get("pageIndex") || "1");
    const newSearch = searchParams.get("search") || "";

    if (newPageSize !== pageSize) setPageSize(newPageSize);
    if (newPageIndex !== pageIndex) setPageIndex(newPageIndex);
    if (newSearch !== search) setSearch(newSearch);
  }, [searchParams]);

  const pageSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setPageIndex(1);
  };

  const pageChangeHandler = (newPage: number) => {
    setPageIndex(newPage);
  };

  const actions = (row: any) => [
    <button
      key="edit"
      className="text-blue-600 text-xl px-2 py-1 rounded mx-1 cursor-pointer"
      onClick={() => alert(`Edit ${row.userName}`)}
    >
      <i class="fal fa-edit"></i>
    </button>,
    <button
      key="delete"
      className=" text-red-600 text-xl px-2 py-1 rounded mx-1 curp"
      onClick={() => alert(`Delete ${row.userName}`)}
    >
      <i class="fal fa-trash-alt"></i>
    </button>,
  ];

  return (
    <>
      <div className="flex items-center mb-10 gap-5">
        <SearchBox
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />
        <FilterModal filter={filter} />
      </div>
      <MainTable
        tableHead={tableHead}
        tableRow={data?.data?.data?.items || []}
        pageSize={pageSize}
        pageSizeHandler={pageSizeHandler}
        pageIndex={pageIndex}
        totalPages={data?.data?.data?.totalPages || 1}
        pageChangeHandler={pageChangeHandler}
        actions={actions}
      />
    </>
  );
};

export default TableSection;
