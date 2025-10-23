import { TextField } from "@mui/material";
import React from "react";

export  interface SearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchComponent: React.FC<SearchProps> = ({ value, onChange, placeholder }) => {
  return (
    <TextField
      type="text"
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default SearchComponent;
