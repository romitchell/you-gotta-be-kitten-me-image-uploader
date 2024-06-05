import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }
  // testing
  render() {
    const widthSize = 300;
    const heightSize = 200;
    const topMargin = 0.7*12;
    const leftMargin = 0.5*12;
    const bottomMargin = 0.25*12;
    const rightMargin = 0.1*12;
    const spacing = 8;
    console.log("Component to print: ")
    console.log(this.props.files)
    return (
      <div className="relativeCSS">
        <style type="text/css" media="print">
          {
            "\
   @page { size: portrait; }\
"
          }
        </style>
        <ImageList
          sx={{ 
            width: (widthSize+(leftMargin*spacing+rightMargin*spacing))*2, 
            height: ((heightSize+(bottomMargin*spacing)) * Math.round(this.props.files.length/2)),
            mt: topMargin,
          }}
          cols={2}
          gap={0}
        >
          {this.props.files.map(
            (file) =>
              file.getMetadata() && (
                <ImageListItem
                  key={file.id}
                  sx={{
                    width: widthSize,
                    height: heightSize,
                    mb: bottomMargin,
                    ml: leftMargin,
                    mr: rightMargin,
                  }}
                >
                  <img
                    srcSet={`${file.getMetadata().poster}`}
                    src={`${file.getMetadata().poster}`}
                    alt={file.name}
                    loading="lazy"
                    width={96*3}
                    height={96*2}
                    style={{ borderRadius: "5%"}}
                  />
                </ImageListItem>
              )
          )}
        </ImageList>
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len
  return <ComponentToPrint files={props.files} ref={ref} text={props.text} />;
});
