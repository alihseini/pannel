import React from "react";
import { useNavigate } from "react-router-dom";
import deleteUser from "../../services/deleteUser";
import toast from "react-hot-toast";
import DeleteButton from "./DeleteButton";

const UserActionButton: React.FC<{ id: string; onRefetch: () => void }> = ({
  id,
  onRefetch,
}) => {
  const navigate = useNavigate();

  const editHandler = () => {
    navigate(`/pannel/editUser/${id}`);
  };

  const deleteHandler = async () => {
    try {
      await deleteUser(id);
      onRefetch();
      toast.success("کاربر با موفقیت حذف شد");
    } catch (error) {
      toast.error("خطا در حذف");
      throw error;
    }
  };

  return (
    <div className="flex items-center gap-5 text-xl">
      <button onClick={editHandler}>
        <i className="fal fa-edit cursor-pointer"></i>
      </button>
      <button>
        <i className="fal fa-key cursor-pointer"></i>
      </button>
      <button>
        <i className="fal fa-shield-alt cursor-pointer"></i>
      </button>
      <DeleteButton onConfirm={deleteHandler} />
    </div>
  );
};

export default UserActionButton;
