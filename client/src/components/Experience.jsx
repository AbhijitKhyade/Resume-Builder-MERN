import React, { useRef, useState } from "react";
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
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";
import { addExperience, updateExperience, deleteExperience } from "../redux/experienceSlice";
import DeleteIcon from '@mui/icons-material/Delete';


const Experience = () => {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.experienceDetails);
  const [showInputFields, setShowInputFields] = useState(false);
  const quillRef = useRef([]);

  const handleInputChange = (index, event, content) => {
    if (event) {
      const { name, value } = event.target;
      // For regular text input
      dispatch(updateExperience({ index, field: name, value }));
    } else {
      // console.log("Index:", index);
      // console.log("Content:", content);
      dispatch(updateExperience({ index, field: "desc", value: content }));
    }
  };



  const handleAddExperience = () => {
    dispatch(addExperience());
    setShowInputFields(true);
  };

  const handleDeleteExperience = (index) => {
    dispatch(deleteExperience((index)));
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
              Experience Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        {
          experiences?.map((experience, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ marginTop: "8px" }}>
                  Experience {index + 1}
                </Typography>
                <IconButton onClick={() => handleDeleteExperience(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
              <Grid container spacing={1} alignItems="center" lg={12}>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <Typography variant="h6" sx={{ marginTop: "8px" }}>
                    Institute/Organisation
                  </Typography>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name="institute"
                    label="Institute/Organisation"
                    style={{ width: "100%" }}
                    value={experience.institute}
                    onChange={(event) => handleInputChange(index, event)}

                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" lg={12}>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <Typography variant="h6" sx={{ marginTop: "8px" }}>
                    Description
                  </Typography>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    multiline
                    rows={4}
                    name="desc"
                    label="Description"
                    style={{ width: "100%" }}
                    value={experience.desc}
                    onChange={(event) => handleInputChange(index, event)}
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
              </Grid>
            </div>
          ))}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "8px" }}
          onClick={handleAddExperience}
        >
          Add Experience
        </Button>
      </CardContent>
    </div>
  );
};

export default Experience;
