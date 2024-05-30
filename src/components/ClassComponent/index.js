import * as React from "react";
import ReactToPrint from "react-to-print";

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
        this.setState(
          { isLoading: false },
          resolve
        );
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
    return <button>Print Stickers</button>;
  };

  render() {
    console.log("This is the files 1: " + this.props.files)
    console.log(this.props.files)
    return (
      <div>
        <ReactToPrint
          content={this.reactToPrintContent}
          documentTitle="AwesomeFileName"
          onAfterPrint={this.handleAfterPrint}
          onBeforeGetContent={this.handleOnBeforeGetContent}
          onBeforePrint={this.handleBeforePrint}
          removeAfterPrint
          trigger={this.reactToPrintTrigger}
        />
        {this.state.isLoading && (
          <p className="indicator">Loading Print Screen...</p>
        )}
        <ComponentToPrint files={this.props.files} ref={this.setComponentRef} text={this.state.text} />
      </div>
    );
  }
}
