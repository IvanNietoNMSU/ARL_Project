import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class TextEdit extends React.Component {
  handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };
  render() {
    return (
      <div className="testedit">
        <CKEditor
          editor={ClassicEditor}
          data="<p></p>"
          onInit={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur");
          }}
          onFocus={(event, editor) => {
            console.log("Focus");
          }}
        />
      </div>
    );
  }
}

export default TextEdit;
