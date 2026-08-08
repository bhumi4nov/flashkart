import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const ProductPagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination
        page={page}
        count={totalPages}
        color="primary"
        onChange={(_, value) => onChange(value)}
      />
    </Box>
  );
};

export default ProductPagination;
