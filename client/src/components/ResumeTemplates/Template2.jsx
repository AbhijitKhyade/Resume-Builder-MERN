import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export default function Template2({ handleDownload }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "2vw",
        flexGrow: 1,
      }}
    >
      <Paper elevation={2} style={{ padding: "30px" }}>
        <Typography variant="h4" gutterBottom>
          Second Resume Template
        </Typography>
        {/* Add your template content here */}
      </Paper>
      <Button
        variant="contained"
        sx={{ margin: "20px" }}
        onClick={handleDownload}
        endIcon={<DownloadIcon />}
      >
        Download
      </Button>
    </Box>
  );
}
