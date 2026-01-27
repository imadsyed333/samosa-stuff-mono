import { Box, Tab, Tabs } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { AdminOrderView } from "../components/admin/AdminOrderView";
import { AdminProductView } from "../components/admin/AdminProductView";

export const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        minHeight: 0,
        justifyContent: "center",
        alignItems: "center",
        mt: 1,
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tabs value={tabValue} onChange={handleChange} textColor="primary">
            <Tab label="Orders" />
            <Tab label="Products" />
          </Tabs>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            minHeight: 0,
            width: "100%",
          }}
        >
          {tabValue === 0 && <AdminOrderView />}
          {tabValue === 1 && <AdminProductView />}
        </Box>
      </Box>
    </Box>
  );
};
