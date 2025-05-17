import { Button, Modal } from "antd";
import { useState } from "react";

const FilterModal = ({ filter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        <i class="fal fa-filter"></i>
      </Button>
      <Modal
        title="فیلتر کاربران"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {filter.map((item) => {
          switch (item.key) {
            case "type":
              return (
                <select>
                  <option>شهروندی</option>
                  <option>سازمانی</option>
                </select>
              );
            default:
              return null;
          }
        })}
      </Modal>
    </>
  );
};

export default FilterModal;
