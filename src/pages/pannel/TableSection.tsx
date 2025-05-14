import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import getAllUsers from "../../services/getAllUsers";
import MainTable from "../../component/common/MainTable";

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

const TableSection: React.FC = () => {
  const [usersData, setUsersData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentPageSize = parseInt(searchParams.get("pageSize") || "10");
    const currentPage = parseInt(searchParams.get("pageIndex") || "1");

    setPageSize(currentPageSize);
    setPageIndex(currentPage);

    getAllUsers(currentPageSize, currentPage)
      .then((response) => {
        setUsersData(response?.data?.items);
        setTotalPages(response?.data?.totalPages);
      })
      .catch((err) => console.error(err));
  }, [searchParams]);

  const pageSizeHandler = (e) => {
    setPageSize(e.target.value);
    setSearchParams({
      pageSize: e.target.value.toString(),
    });
  };

  const pageChangeHandler = (newPage) => {
    setSearchParams({
      pageSize: pageSize.toString(),
      pageIndex: newPage.toString(),
    });
  };

  const actions = (row) => [
    <button
      key="edit"
      className="bg-blue-500 text-white px-2 py-1 rounded mx-1"
      onClick={() => alert(`Edit ${row.userName}`)}
    >
      ویرایش
    </button>,
    <button
      key="delete"
      className="bg-red-500 text-white px-2 py-1 rounded mx-1"
      onClick={() => alert(`Delete ${row.userName}`)}
    >
      حذف
    </button>,
  ];

  return (
    <>
      <MainTable
        tableHead={tableHead}
        tableRow={usersData}
        pageSize={pageSize}
        pageSizeHandler={pageSizeHandler}
        pageIndex={pageIndex}
        totalPages={totalPages}
        pageChangeHandler={pageChangeHandler}
        actions={actions}
      />
    </>
  );
};

export default TableSection;
