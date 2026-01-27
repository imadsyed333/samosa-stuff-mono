import { Fade } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";

export const FadeWrapper = ({ children }: { children: ReactElement }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Fade in={loaded} timeout={200}>
      {children}
    </Fade>
  );
};
