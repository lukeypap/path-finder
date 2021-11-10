import { Delete } from "@mui/icons-material";
import { Grid, Slider, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
// import { Button } from "react-bootstrap";
import DropDown from "./DropDown";

const StyledButton = styled(Button)`
  && {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

const InfoPanel = ({
  startAlgorithm,
  startDijkstra,
  startRecurseWalls,
  resetBoard,
  handleSliderChangeCol,
  handleSliderChangeRow,
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState();
  const options = [
    {
      id: 0,
      title: "None",
    },
    {
      id: 1,
      title: "Dijkstra",
    },
  ];
  const handleInput = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  const handleVisualizeOptions = () => {
    if (selectedAlgorithm === 1) {
      startDijkstra();
    } else {
      console.log("stop");
    }
  };

  return (
    <div style={{ backgroundColor: "#3a3a3a", marginTop: "0px", borderRadius: "0px" }}>
      <Container>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={4}>
            <div style={{ display: "flex" }}>
              <Typography gutterBottom color="white">
                Row
              </Typography>
              <Slider
                defaultValue={20}
                aria-label="default"
                valueLabelDisplay="auto"
                color="secondary"
                min={5}
                max={50}
                onChange={handleSliderChangeRow}
                style={{ marginLeft: "20px" }}
              />
            </div>
            <div style={{ display: "flex" }}>
              <Typography gutterBottom color="white">
                Col
              </Typography>
              <Slider
                defaultValue={20}
                aria-label="Default"
                valueLabelDisplay="auto"
                min={5}
                max={50}
                onChange={handleSliderChangeCol}
                style={{ marginLeft: "20px" }}
              />
            </div>
          </Grid>
          <Grid item xs={8}>
            <StyledButton onClick={handleVisualizeOptions} size="large" variant="contained">
              Visualize
            </StyledButton>
          </Grid>
          <Grid item xs={2}>
            <DropDown
              name="Algorithm"
              label="Algorithm"
              onChange={handleInput}
              options={options}
              value={options.id}
              color="white"
            />
          </Grid>
          <Grid item xs={2}>
            <StyledButton
              size="small"
              onClick={() => resetBoard()}
              variant="contained"
              startIcon={<Delete />}
              color="secondary"
              style={{ marginTop: "15px" }}
            >
              Reset
            </StyledButton>
            <StyledButton
              size="small"
              onClick={startRecurseWalls}
              variant="contained"
              startIcon={<Delete />}
              color="secondary"
              style={{ marginTop: "15px" }}
            >
              Generate Walls
            </StyledButton>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default InfoPanel;
