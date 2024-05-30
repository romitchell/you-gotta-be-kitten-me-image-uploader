import React, { useState } from "react";
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from './components/AppAppBar';
import FAQ from './components/FAQ'
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';
import { ClassComponent } from "./components/ClassComponent";

// pintura
import "@pqina/pintura/pintura.css";
import {
  // editor
  openEditor,
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultImageOrienter,
  createDefaultShapePreprocessor,
  legacyDataToImageState,
  processImage,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_finetune,
  plugin_finetune_locale_en_gb,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_locale_en_gb,
  plugin_filter_defaults,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
} from "@pqina/pintura";

// filepond
import "filepond/dist/filepond.min.css";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginImageEditor from "@pqina/filepond-plugin-image-editor";
registerPlugin(FilePondPluginImageEditor, FilePondPluginFilePoster);

// pintura
setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function PrintStickersLandingPage() {
  const [files, setFiles] = useState([]);
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };


  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default', paddingTop:"5em" }}>
        <Divider />
        <ClassComponent files={files}/>
        {/* <button >Refresh Images</button> */}
        <h2>Upload Images to Edit and Print</h2>
        <Divider />
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={true}
          allowImagePreview={true}
          filePosterMaxHeight={200}
          maxFiles={8}
          // server="/api"
          name="files"
          imageEditor={{
            // map legacy data objects to new imageState objects
            legacyDataToImageState: legacyDataToImageState,

            // used to create the editor, receives editor configuration, should return an editor instance
            createEditor: openEditor,

            // Required, used for reading the image data
            imageReader: [
              createDefaultImageReader,
              {
                /* optional image reader options here */
              },
            ],

            // optionally. can leave out when not generating a preview thumbnail and/or output image
            imageWriter: [
              createDefaultImageWriter,
              {
                /* optional image writer options here */

              },
            ],

            // used to generate poster images, runs an editor in the background
            imageProcessor: processImage,

            // editor options
            editorOptions: {
              utils: ["crop", "finetune", "filter", "annotate"],
              imageOrienter: createDefaultImageOrienter(),
              shapePreprocessor: createDefaultShapePreprocessor(),
              ...plugin_finetune_defaults,
              ...plugin_filter_defaults,
              ...markup_editor_defaults,
              locale: {
                ...locale_en_gb,
                ...plugin_crop_locale_en_gb,
                ...plugin_finetune_locale_en_gb,
                ...plugin_filter_locale_en_gb,
                ...plugin_annotate_locale_en_gb,
                ...markup_editor_locale_en_gb,
              },
            },
          }}
        />
        <Divider />
        <FAQ/>
        <Divider />
        <Footer />
      </Box>

    </ThemeProvider>
      
  );
}
