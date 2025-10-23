"use client";
import { Box, Pagination } from "@mui/material";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationComponentProps) {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
      />
    </Box>
  );
}
