import { TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ProductSearch = ({ value, onChange }: Props) => {
  return (
    <TextField
      fullWidth
      label="Search Products"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 3 }}
    />
  );
};

export default ProductSearch;
