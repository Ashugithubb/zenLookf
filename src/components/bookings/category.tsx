import React from "react";

interface GenderSelectProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const GenderSelectComponent: React.FC<GenderSelectProps> = ({ value, onChange, placeholder }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
    >
      <option value="">{placeholder || "Select Gender"}</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  );
};

export default GenderSelectComponent;
