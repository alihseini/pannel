import React, { useEffect, useState } from "react";
import getAllUsers from "../../services/getAllUsers";
import MainTable from "../../component/Table/MainTable";

const tableHead = [
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
  useEffect(() => {
    getAllUsers()
      .then((response) => setUsersData(response?.data?.items))
      .then((error) => console.log(error));
  }, []);
  return <MainTable tableHead={tableHead} tableRow={usersData} />;
};

export default TableSection;
