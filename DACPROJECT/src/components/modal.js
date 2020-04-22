import React from "react";
import Modal from "@material-ui/core/Modal";
import Lottie from "react-lottie";
import { Typography, Container } from "@material-ui/core";
import animationData3 from "../animations/528-spinner-loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData3,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default function SimpleModal() {
  // getModalStyle is not a pure function, we roll the style only on the first render
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
