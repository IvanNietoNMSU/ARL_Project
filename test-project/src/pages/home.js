import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Lottie from "react-lottie";
import animationData from "../animations/15224-cute-doggie.json";
import axios from "axios";

function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  axios.get("http://localhost:3001?do=initialize").then(response => {
    console.log(response);
  });

  return (
    <Grid container align="center">
      <Grid item xs={12}>
        <Typography variant="h5">Welcome Home!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Lottie options={defaultOptions} height={400} width={400} />
      </Grid>
    </Grid>
  );
} //end Home

export default Home;
