import React from "react";
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
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import InterestsIcon from "@mui/icons-material/Interests";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
// import { DeleteIcon } from '@mui';
import {
  addSkills,
  addAchievements,
  addHobbies,
  updateSkills,
  updateAchievements,
  updateHobbies,
  updateExtraCoCurricular,
  addExtraCoCurricular,
  deleteSkill,
  deleteHobbies,
  deleteAchievements,
  deleteExtraCoCurricular
} from "../redux/extraDetailsSlice";

const ExtraDetails = () => {
  const dispatch = useDispatch();
  const extraDetails = useSelector((state) => state.extraDetails);

  const handleAddItem = (type) => {
    if (type === "skills") {
      dispatch(addSkills());
    } else if (type === "achievements") {
      dispatch(addAchievements());
    } else if (type === "hobbies") {
      dispatch(addHobbies());
    } else if (type === "extraCoCurricular") {
      dispatch(addExtraCoCurricular());
    }
  };

  const handleInputChange = (index, type, value) => {
    if (type === "skills") {
      dispatch(updateSkills({ index, value }));
    } else if (type === "achievements") {
      dispatch(updateAchievements({ index, value }));
    } else if (type === "hobbies") {
      dispatch(updateHobbies({ index, value }));
    } else if (type === "extraCoCurricular") {
      dispatch(updateExtraCoCurricular({ index, value }));
    }
  };

  const handleDeleteItem = (index, type) => {
    if (type === "skills") {
      dispatch(deleteSkill(index));
    } else if (type === "achievements") {
      dispatch(deleteAchievements(index));
    } else if (type === "hobbies") {
      dispatch(deleteHobbies(index));
    } else if (type === "extraCoCurricular") {
      dispatch(deleteExtraCoCurricular(index));
    }
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
              Extra Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        {/* Skills */}
        <div>
          <Typography variant="h5" sx={{ marginTop: "8px" }}>
            Skills
          </Typography>
          <Grid container spacing={2} alignItems="center" lg={12}>
            {extraDetails.skills.map((skill, index) => (
              <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }} >
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name={`skill${index + 1}`}
                  label={`Skill ${index + 1}`}
                  style={{ width: "100%" }}
                  value={skill}
                  onChange={(e) =>
                    handleInputChange(index, "skills", e.target.value)
                  }
                />
                <IconButton onClick={() => handleDeleteItem(index, "skills")}>
                  <DeleteIcon  color="error" />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "15px" }}
            onClick={() => handleAddItem("skills")}
          >
            Add Skill
          </Button>
        </div>

        {/* Achievements */}
        <div>
          <Typography variant="h5" sx={{ marginTop: "8px" }}>
            Achievements
          </Typography>
          <Grid container spacing={2} alignItems="center" lg={12} >
            {extraDetails.achievements.map((achievement, index) => (
              <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name={`achievement${index + 1}`}
                  label={`Achievement ${index + 1}`}
                  style={{ width: "100%" }}
                  value={achievement}
                  onChange={(e) =>
                    handleInputChange(index, "achievements", e.target.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EmojiEventsIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                 <IconButton onClick={() => handleDeleteItem(index, "achievements")}>
                  <DeleteIcon  color="error" />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "15px" }}
            onClick={() => handleAddItem("achievements")}
          >
            Add Achievement
          </Button>
        </div>

        {/* Hobbies/Interests */}
        <div>
          <Typography variant="h5" sx={{ marginTop: "8px" }}>
            Hobbies/Interests
          </Typography>
          <Grid container spacing={2} alignItems="center" lg={12}>
            {extraDetails.hobbies.map((hobby, index) => (
              <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name={`hobby${index + 1}`}
                  label={`Hobby ${index + 1}`}
                  style={{ width: "100%" }}
                  value={hobby}
                  onChange={(e) =>
                    handleInputChange(index, "hobbies", e.target.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <InterestsIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                 <IconButton onClick={() => handleDeleteItem(index, "hobbies")}>
                  <DeleteIcon  color="error" />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "15px" }}
            onClick={() => handleAddItem("hobbies")}
          >
            Add Hobby
          </Button>
        </div>

        {/* Extra Curricular Activities */}
        <div>
          <Typography variant="h5" sx={{ marginTop: "8px" }}>
            Extra Curricular Activities
          </Typography>
          <Grid container spacing={2} alignItems="center" lg={12}>
            {extraDetails.extraCoCurricular.map((extraCurricular, index) => (
              <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name={`extraCurricular${index + 1}`}
                  label={`Extra-Curricular ${index + 1}`}
                  style={{ width: "100%" }}
                  value={extraCurricular}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "extraCoCurricular",
                      e.target.value
                    )
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <AutoAwesomeIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton onClick={() => handleDeleteItem(index, "extraCoCurricular")}>
                  <DeleteIcon  color="error"/>
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "15px" }}
            onClick={() => handleAddItem("extraCoCurricular")}
          >
            Add Activities
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default ExtraDetails;
