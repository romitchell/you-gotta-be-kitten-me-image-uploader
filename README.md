# You Gotta Be Kitten Me — Sticker Printer

A React web app built for the physical card game *You Gotta Be Kitten Me* that lets players upload a photo, edit and crop it in-browser, and print it directly onto sticker sheets for use as custom cards.

**Live demo:** https://you-gotta-be-kittne-me-image-uploader.vercel.app/

## What it does

- Upload one or more images (drag-and-drop, via [FilePond](https://pqina.nl/filepond/))
- Crop, rotate, and adjust each image in an embedded editor ([Pintura](https://pqina.nl/pintura/))
- Lay out the edited images onto a print-ready sticker sheet
- Send the sheet straight to the browser's print dialog

## Tech stack

- **React** (Create React App) + **MUI** for the UI
- **FilePond** / **Pintura** for image upload and in-browser editing
- **react-to-print** / **print-js** for print output
- Deployed on **Vercel**
- An **AWS CloudFormation** template (`ygbkm-cloud-formation-deploy.yaml`) is also included, provisioning an S3 + CloudFront + API Gateway stack as an alternative deployment target to Vercel

## Running locally

```bash
npm install
npm start
```

Then open http://localhost:3000.

> **Note:** Pintura's image-editor packages (`@pqina/pintura`, `@pqina/react-pintura`, `@pqina/filepond-plugin-image-editor`) are served from a private, licensed npm registry. You'll need your own Pintura license and a `.npmrc` pointing at `npm.pqina.nl` with a valid auth token to install dependencies — that file is intentionally not committed here.

## Building for production

```bash
npm run build
```

Outputs a static build to `build/`, deployable to Vercel, the included CloudFormation stack, or any static host.
