import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/user";
import toast from "react-hot-toast";
import DeleteButton from "./DeleteButton";

const UserActionButton: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editHandler = () => {
    navigate(`/pannel/editUser/${id}`);
  };

  const { mutate: mutateDeleteUser } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      toast.success("کاربر با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("خطا در حذف کاربر");
    },
  });

  const deleteHandler = () => {
    mutateDeleteUser();
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
