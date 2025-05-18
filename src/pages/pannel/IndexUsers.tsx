import { useEffect, useState } from "react";
import TableSection from "../../component/common/TableSection";
import useUsersQuery from "../../hooks/react-query/useUserQuery";
import { useSearchParams } from "react-router-dom";

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

const filter = [
  { label: "سامانه", key: "Application" },
  { label: "نوع کاربر", key: "type" },
  { label: "نقش", key: "Role" },
  { label: "گروه سامانه ", key: "ApplicationGroup" }, 
  { label: "زیر گروه سامانه ", key: "ApplicationSubGroup" }, 
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

  const [filters, setFilters] = useState({});

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

  const { data } = useUsersQuery(pageSize, pageIndex, debouncedSearch, filters);

  useEffect(() => {
    const params: any = {
      pageSize: pageSize.toString(),
      pageIndex: pageIndex.toString(),
      ...filters,
    };
    if (debouncedSearch.trim() !== "") {
      params.search = debouncedSearch;
    }
    setSearchParams(params);
  }, [debouncedSearch, pageSize, pageIndex, filters, setSearchParams]);

  useEffect(() => {
    const newPageSize = parseInt(searchParams.get("pageSize") || "10");
    const newPageIndex = parseInt(searchParams.get("pageIndex") || "1");
    const newSearch = searchParams.get("search") || "";

    const newFilters: any = {};
    filter.forEach((f) => {
      const val = searchParams.get(f.key);
      if (val) newFilters[f.key] = val;
    });

    if (newPageSize !== pageSize) setPageSize(newPageSize);
    if (newPageIndex !== pageIndex) setPageIndex(newPageIndex);
    if (newSearch !== search) setSearch(newSearch);
    setFilters(newFilters);
  }, [searchParams]);

  const pageSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setPageIndex(1);
  };

  const pageChangeHandler = (newPage: number) => {
    setPageIndex(newPage);
  };

  const actions = (row) => [
    <button
      key="edit"
      className="text-blue-600 text-xl px-2 py-1 rounded mx-1 cursor-pointer"
      onClick={() => alert(`Edit ${row.userName}`)}
    >
      <i className="fal fa-edit"></i>
    </button>,
    <button
      key="delete"
      className=" text-red-600 text-xl px-2 py-1 rounded mx-1 cursor-pointer"
      onClick={() => alert(`Delete ${row.userName}`)}
    >
      <i className="fal fa-trash-alt"></i>
    </button>,
  ];

  const onApplyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    setPageIndex(1);

  };

  return (
    <div>
      <TableSection
        tableHead={tableHead}
        tableRow={data?.data?.data?.items || []}
        totalCount={data?.data?.data?.totalCount}
        isPagination={{
          pageIndex,
          totalPages: data?.data?.data?.totalPages || 1,
          pageChangeHandler,
        }}
        isSearch={{ search, setSearch, searchHandler }}
        isSelect={{ pageSize, pageSizeHandler }}
        actions={actions}
        expandFields={expandFields}
        filter={filter}
        onApplyFilters={onApplyFilters} 
      />
    </div>
  );
};

export default IndexUsers;
