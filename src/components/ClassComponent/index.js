import * as React from "react";
import ReactToPrint from "react-to-print";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

import { ComponentToPrint } from "../ComponentToPrint";

export class ClassComponent extends React.PureComponent {
  componentRef = null;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  handleAfterPrint = () => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  };

  handleBeforePrint = () => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  };

  handleOnBeforeGetContent = () => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    this.setState({ isLoading: true });

    return new Promise((resolve) => {
      setTimeout(() => {
        this.setState({ isLoading: false }, resolve);
      }, 2000);
    });
  };

  setComponentRef = (ref) => {
    this.componentRef = ref;
  };

  reactToPrintContent = () => {
    return this.componentRef;
  };

  reactToPrintTrigger = () => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return (
      <Button variant="contained" startIcon={<LocalPrintshopIcon />}>
        Print Stickers
      </Button>
    );
  };

  render() {
    console.log("Class component: ")
    console.log(this.props.files);
    return (
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box id="print-button">
          <ReactToPrint
            content={this.reactToPrintContent}
            documentTitle="AwesomeFileName"
            onAfterPrint={this.handleAfterPrint}
            onBeforeGetContent={this.handleOnBeforeGetContent}
            onBeforePrint={this.handleBeforePrint}
            removeAfterPrint
            trigger={this.reactToPrintTrigger}
          />
        </Box>
        <Box
          id="print-screen-loading"
          sx={{
            pt: { xs: 4, sm: 6 },
            gap: { xs: 3, sm: 6 },
          }}
        >
          {this.state.isLoading && (
            <Typography variant="body2" fontWeight={600} className="indicator">
              Loading Print Screen...
            </Typography>
          )}
        </Box>
        <ComponentToPrint
          files={this.props.files}
          ref={this.setComponentRef}
          text={this.state.text}
        />
      </Container>
    );
  }
}
