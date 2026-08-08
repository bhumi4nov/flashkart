import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Container } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
