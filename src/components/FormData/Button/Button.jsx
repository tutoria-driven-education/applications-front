import { Button } from "@mui/material";

const CustomButton = ({ children, disable }) => {
  return (
    <Button type="submit" disabled={disable} variant="contained">
      {children}
    </Button>
  );
};

export default CustomButton;
