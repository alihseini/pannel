import { Button, Modal, Select } from "antd";
import { useState } from "react";
import api from "../../utils/api"; // مسیر api را تنظیم کن

const FilterModal = ({ filter, onApplyFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({}); // گزینه‌های فیلترها
  const [selectedFilters, setSelectedFilters] = useState({}); // فیلترهای انتخاب‌شده

  // باز کردن مودال
  const showModal = () => setIsModalOpen(true);

  // اعمال فیلترها
  const handleOk = () => {
    onApplyFilters?.(selectedFilters);
    setIsModalOpen(false);
  };

  // بستن مودال بدون اعمال
  const handleCancel = () => setIsModalOpen(false);

  // گرفتن داده‌های هر فیلتر از سرور یا دستی
  const fetchOptions = async (key) => {
    if (filterOptions[key]) return;

    if (key === "type") {
      setFilterOptions((prev) => ({
        ...prev,
        type: [
          { id: "شهروند", title: "شهروند" },
          { id: "سازمانی", title: "سازمانی" },
        ],
      }));
      return;
    }

    let url = "";
    switch (key) {
      case "Application":
        url = "/v1/Application";
        break;
      case "Role":
        url = "/v1/Role";
        break;
      case "ApplicationGroup":
        url = "/v1/ApplicationGroup";
        break;
      case "ApplicationSubGroup":
        url = "/v1/ApplicationSubGroup";
        break;
      default:
        return;
    }

    try {
      const response = await api.get(url);
      const items =
        response.data?.data?.items ||
        response.data?.data ||
        response.data ||
        [];
      setFilterOptions((prev) => ({ ...prev, [key]: items }));
    } catch (err) {
      console.error("Error fetching options:", err);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <i className="fal fa-filter"></i>
      </Button>

      <Modal
        title="فیلتر کاربران"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {filter.map((item) => (
          <div key={item.key} className="mb-4">
            <label className="block mb-1 font-medium">{item.label}:</label>
            <Select
              showSearch
              allowClear
              placeholder={`انتخاب ${item.label}`}
              className="w-full"
              onFocus={() => fetchOptions(item.key)}
              value={selectedFilters[item.key]}
              onChange={(value) => {
                setSelectedFilters((prev) => {
                  const updated = { ...prev, [item.key]: value };

                  // اگر ApplicationGroup عوض شد، ApplicationSubGroup ریست شود
                  if (item.key === "ApplicationGroup") {
                    updated.ApplicationSubGroup = undefined;
                  }

                  return updated;
                });
              }}
              disabled={
                item.key === "ApplicationSubGroup" &&
                !selectedFilters.ApplicationGroup
              }
            >
              {(filterOptions[item.key] || []).map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.name || option.title || option.label || option.id}
                </Select.Option>
              ))}
            </Select>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default FilterModal;
