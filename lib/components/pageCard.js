import { Box, Button, Card, Container, Typography } from "@mui/material";
import React from "react";
import Loader from "./Loader";

export default function PageCard({
  title,
  rightButtonText,
  rightButtonOnClick,
  children,
  loading,
}) {
  return (
    <Card
      sx={{
        marginTop: "16px",
        marginLeft: "16px",
        marginRight: "16px",
        padding: "8px",
      }}
    >
      <Box display="flex" flexDirection={"column"}>
        <Box
          display={"flex"}
          flexDirection="row"
          justifyContent={"space-between"}
          className="card-header"
        >
          <Box>
            <Typography variant={"h4"}>{title}</Typography>
          </Box>
          {rightButtonText ? (
            <Box>
              <Button variant="contained" onClick={rightButtonOnClick}>
                {rightButtonText}
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </Box>

        {loading ? <Loader /> : <Box style={{ marginTop: 15 }}>{children}</Box>}
      </Box>
    </Card>
  );
}
