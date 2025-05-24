import { useEffect, useState } from "react";
import TableSection from "../../component/common/TableSection";
import useUsersQuery from "../../hooks/react-query/useUserQuery";
import { useSearchParams } from "react-router-dom";
import UserActionButton from "../../component/common/UserActionButtons";
import Header from "../../component/common/Header";

const tableHead = [
  { key: "index", label: "ردیف" },
  { key: "fullName", label: "نام نام خانوادگی" },
  { key: "nationalCode", label: "کد ملی" },
  { key: "userName", label: "نام کاربری" },
  { key: "status", label: "وضعیت" },
  { key: "twoFactorEnabled", label: "تأیید دو مرحله‌ای" },
  { key: "type", label: "نوع کاربر" },
  { key: "actions", label: "عملیات" },
];

const expandFields = [
  { label: "جنسیت", key: "gender" },
  { label: "نام پدر", key: "fatherName" },
  { label: "تاریخ تولد", key: "birthDate" },
  { label: "کد ملی", key: "nationalCode" },
  { label: "کد پرسنلی", key: "personelCode" },
  { label: "ایمیل", key: "email" },
  { label: "تعداد دسترسی ها", key: "permissionCount" },
  { label: "سمت ها", key: "organizationPosts" },
];

const IndexUsers: React.FC = () => {
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
  const { data, refetch } = useUsersQuery(pageSize, pageIndex, debouncedSearch);

  const searchHandler = () => {
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

  return (
    <>
      <Header
        button={{
          buttonName: "ثبت کاربر جدید",
          buttonPath: "/pannel/newUser",
        }}
        title={"کاربران"}
      />
      <div className="mt-5">
        <TableSection
          tableHead={tableHead}
          tableRow={data?.data?.items || []}
          totalCount={data?.data?.totalCount}
          isPagination={{
            pageIndex,
            totalPages: data?.data?.data?.totalPages || 1,
            pageChangeHandler,
          }}
          isSearch={{ search, setSearch, searchHandler }}
          isSelect={{ pageSize, pageSizeHandler }}
          actions={(row) => (
            <UserActionButton id={row.id} onRefetch={refetch} />
          )}
          expandFields={expandFields}
        />
      </div>
    </>
  );
};

export default IndexUsers;
