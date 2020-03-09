import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import animationData from "../animations/16869-bagel-boy.json";
import Lottie from "react-lottie";
import { Typography, Container } from "@material-ui/core";
import animationData2 from "../animations/28-loading.json";
import animationData3 from "../animations/528-spinner-loading.json";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData3,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        style={{ outline: "none" }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Container align="center">
          <Lottie options={defaultOptions} height={400} width={400} />
          <Typography variant="h5">Loading ...</Typography>
        </Container>
      </Modal>
    </div>
  );
}
