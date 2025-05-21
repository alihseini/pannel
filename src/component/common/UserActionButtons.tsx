import React from "react";
import { useNavigate } from "react-router-dom";



const UserActionButton: React.FC = ({ id }) => {
  const navigate = useNavigate();

  const editHandler = () => {
    navigate(`/pannel/editUser/${id}`);
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
      <button>
        <i className="fal fa-trash cursor-pointer text-red-600"></i>
      </button>
    </div>
  );
};

export default UserActionButton;
