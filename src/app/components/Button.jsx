import React from "react";

export default function Button({
  label = "Clique Aqui",
  onClick,
  type = "button",
  className = "",
  color = "bg-blue-500",
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 text-fontProjectBlack font-bold rounded-[10px] ${color} ${className} hover:opacity-80`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
