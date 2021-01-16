import React from "react";
import { Page } from "react-pdf";
import { Document } from "react-pdf/dist/esm/entry.webpack";

export default function PreviewPDF(props) {

  return (
      <Document file={props.pdf}>
        <Page pageNumber={1} width={310}/>
      </Document>
  );
}
