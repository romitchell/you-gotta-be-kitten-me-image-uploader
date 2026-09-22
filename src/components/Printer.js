import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import { ClassComponent } from "./ClassComponent";

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



export default function Printer() {
  const [files, setFiles] = useState([]);
  const [isLoadingFile, setIsLoadingFile] = useState(false)

  function updateEditedFile(file, output)  {
    setFiles([...files])
    console.log(isLoadingFile)
  }

  function isLoaded() {
    setIsLoadingFile(false)
    console.log(isLoadingFile)
  }

  function isLoading() {
    setIsLoadingFile(true)
    console.log(isLoadingFile)
  }

  return (
    <Container
      id="printer"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        Upload Images to Edit and Print
      </Typography>
      <Box sx={{ width: "100%" }}>
        <ClassComponent files={files} isLoadingFile={isLoadingFile}/>
        {/* <button >Refresh Images</button> */}
        <Divider />
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          onpreparefile={updateEditedFile}
          onaddfilestart={isLoading}
          onaddfile={isLoaded}
          allowMultiple={true}
          allowImagePreview={true}
          filePosterMaxHeight={200}
          maxFiles={8}
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
                targetSize: {
                    width: 300,
                    height: 200,
                },
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
              imageCropAspectRatio: 3/2,
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
      </Box>
    </Container>
  );
}
