import * as React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }
// testing
  render() {
    console.log("This is the files 2: " + this.props.files)
    return (
      <div className="relativeCSS">
        <style type="text/css" media="print">
          {
            "\
   @page { size: landscape; }\
"
          }
        </style>
        <div className="flash"/>
        <ImageList sx={{ width: 1120, height: 365*Math.round(this.props.files.length/2), marginTop: "100px" }} cols={2}>
            {this.props.files.map((file) => (            
              file.getMetadata() && (<ImageListItem key={file.id} sx={{ width: 450, height: 300, marginLeft: "40px", marginBottom: "20px" }}>
                <img
                  srcSet={`${file.getMetadata().poster}`}
                  src={`${file.getMetadata().poster}`}
                  alt={file.name}
                  loading="lazy"
                  width={450}
                  height={100}
                  style={{borderRadius: '10%', maxWidth: "450" }}
                />
              </ImageListItem>)
            ))}
          </ImageList>
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len
  return <ComponentToPrint files={props.files} ref={ref} text={props.text} />;
});
