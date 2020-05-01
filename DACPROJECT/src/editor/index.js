import React from "react";
import MultirootEditor from "./MultirootEditor";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
//import { List } from "@ckeditor/ckeditor5-list/src/list";
// import { Link } from " @ckeditor/ckeditor5-link";
MultirootEditor.create(
  {
    header: document.querySelector("#header"),
    content: document.querySelector("#content"),
    footerleft: document.querySelector("#footer-left"),
    footerright: document.querySelector("#footer-right"),
  },
  {
    plugins: [
      Essentials,
      Paragraph,
      Heading,
      Bold,
      Italic,
      SimpleUploadAdapter,
    ],
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "bulletedList",
      "numberedList",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
    ],
    image: {
      toolbar: [
        "imageTextAlternative",
        "|",
        "imageStyle:alignLeft",
        "imageStyle:full",
        "imageStyle:alignRight",
      ],
      styles: ["full", "alignLeft", "alignRight"],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    placeholder: {
      header: "Header text goes here",
      content: "Type content here",
      footerleft: "Left footer content",
      footerright: "Right footer content",
    },
  }
)
  .then((newEditor) => {
    document
      .querySelector("#toolbar")
      .appendChild(newEditor.ui.view.toolbar.element);

    window.editor = newEditor;
  })
  .catch((err) => {
    console.error(err.stack);
  });

const Editor = () => {
  return (
    <div>
      <div id="toolbar"></div>

      <header id="header">
        <h2>Gone traveling</h2>
        <h3>Monthly travel news and inspiration</h3>
      </header>

      <div id="content">
        <h3>Destination of the Month</h3>

        <h4>Valletta</h4>

        <figure class="image image-style-align-right">
          <figcaption>It's siesta time in Valletta.</figcaption>
        </figure>

        <p>
          The capital city of{" "}
          <a
            href="https://en.wikipedia.org/wiki/Malta"
            target="_blank"
            rel="external"
          >
            Malta
          </a>{" "}
          is the top destination this summer. It’s home to a cutting-edge
          contemporary architecture, baroque masterpieces, delicious local
          cuisine and at least 8 months of sun. It’s also a top destination for
          filmmakers, so you can take a tour through locations familiar to you
          from Game of Thrones, Gladiator, Troy and many more.
        </p>
      </div>

      <div class="demo-row">
        <div class="demo-row__half">
          <div id="footer-left">
            <h3>The three greatest things you learn from traveling</h3>
            <p>
              <a href="#">Find out more</a>
            </p>
          </div>
        </div>

        <div class="demo-row__half">
          <div id="footer-right">
            <h3>Walking the capitals of Europe: Warsaw</h3>
            <p>
              <a href="#">Find out more</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
