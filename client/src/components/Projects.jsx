import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { updateProject, addProject, deleteProject } from "../redux/projectSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectDetails);
  const [showInputFields, setShowInputFields] = useState(false);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    dispatch(updateProject({ index, field: name, value }));
  };

  const handleAddProject = () => {
    dispatch(addProject());
    setShowInputFields(true);
  };

  const handleDeleteProject = (index) => {
    dispatch(deleteProject(index));
    setShowInputFields(false);
  };



  const containerStyle = {
    marginTop: "30",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Projects Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        {projects?.map((project, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5" sx={{ marginTop: "8px" }}>
                Project {index + 1}
              </Typography>
              <IconButton onClick={() => handleDeleteProject(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </div>
            <Grid container spacing={1} alignItems="center" lg={12}>
              <Grid item md={12} sm={12} xs={12} lg={12}>
                <Typography variant="h6" sx={{ marginTop: "8px" }}>
                  Project Title
                </Typography>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="title"
                  label={`Project Title`}
                  style={{ width: "100%" }}
                  value={project.title}
                  onChange={(event) => handleInputChange(index, event)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <TitleIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={12}>
                <Typography variant="h6" sx={{ marginTop: "8px" }}>
                  Project Description
                </Typography>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="description"
                  multiline
                  rows={4}
                  label={`Project Description`}
                  style={{ width: "100%" }}
                  value={project.description}
                  onChange={(event) => handleInputChange(index, event)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <DescriptionIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={12}>
                <Typography variant="h6" sx={{ marginTop: "8px" }}>
                  Project Link(Hosted)
                </Typography>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="link"
                  label={`Project Link`}
                  style={{ width: "100%" }}
                  value={project.link}
                  onChange={(event) => handleInputChange(index, event)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <LinkIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "8px" }}
          onClick={handleAddProject}
        >
          Add Project
        </Button>
      </CardContent>
    </div>
  );
};

export default Projects;
