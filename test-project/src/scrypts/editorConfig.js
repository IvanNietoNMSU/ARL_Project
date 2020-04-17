import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";

const config = ClassicEditor; //.create(document.querySelector("#editor"), {
//   plugins: [SimpleUploadAdapter],
//   simpleUpload: {
//     // The URL that the images are uploaded to.
//     uploadUrl: "http://localhost:3001/uploadimage",

//     // Headers sent along with the XMLHttpRequest to the upload server.
//     headers: {
//       "X-CSRF-TOKEN": "CSFR-Token",
//       Authorization: "Bearer <JSON Web Token>",
//     },
//   },
// })
//   .then(console.log("Yay!"))
//   .catch(console.log("Yay!"));

export default config;
