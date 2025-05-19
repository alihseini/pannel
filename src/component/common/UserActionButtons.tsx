import React from "react";

const UserActionButton: React.FC = ({ id }) => {
  const clickHandler = (event) => {
    if (event.target.tagName === "I") alert(id);
  };
  return (
    <div className="flex items-center gap-5 text-xl" onClick={clickHandler}>
      <button>
        <i className="fal fa-edit cursor-pointer"></i>
      </button>
      <button>
        <i className="fal fa-key cursor-pointer"> </i>
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
