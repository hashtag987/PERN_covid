import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { styles } from "./admin.css";
import AllBookings from "./AllBookings";
const Admin = () => {
  return (
    <Container component="main" width="xl">
        <AllBookings/>
    </Container>
  )
}

export default Admin;