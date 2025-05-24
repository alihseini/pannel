import React from "react";
import { useNavigate } from "react-router-dom";
import deleteUser from "../../services/deleteUser";

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
      await onRefetch();
    } catch (error) {
      console.error("خطا در حذف:", error);
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
      <button onClick={deleteHandler}>
        <i className="fal fa-trash cursor-pointer text-red-600"></i>
      </button>
    </div>
  );
};

export default UserActionButton;
