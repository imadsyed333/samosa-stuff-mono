import React from "react";
import "./App.css";
import { NavBar } from "./ui/components/nav/NavBar";
import { AuthProvider } from "./context/AuthContext";
import { Box, ThemeProvider, Toolbar, useMediaQuery } from "@mui/material";
import { theme } from "./lib/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageContent } from "./ui/components/PageContent";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AuthProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Toolbar>
                <NavBar />
              </Toolbar>
              <Box
                component={"main"}
                sx={{
                  display: "flex",
                  height: "100%",
                  width: isMobile ? "100%" : "70%",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                <PageContent />
              </Box>
            </Box>
          </AuthProvider>
        </div>
      </ThemeProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default App;
