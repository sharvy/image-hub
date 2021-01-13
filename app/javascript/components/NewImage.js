import React, { Component } from "react";
import axios from "axios";

class NewImage extends Component {
  state = {
    files: [],
  };

  csrfToken() {
    return document.querySelector('meta[name="csrf-token"]').content;
  }

  handleImageOnchange = (e) => {
    let files = Array.from(e.target.files);

    files = files.map((file) => {
      return { file: file, title: file.name };
    });

    this.setState({ files });
    console.log(files);
  };

  uploadImage = () => {
    let formData = new FormData();
    let { files } = this.state;

    files.forEach((file, index) => {
      formData.append(`images[${index}][title]`, file.title);
      formData.append(`images[${index}][file]`, file.file);
    });

    axios
      .post("/images", formData, {
        headers: {
          "X-CSRF-Token": this.csrfToken(),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response));
  };

  ShowForms = () => {
    let { files } = this.state;
    return files.map((file) => {
      return (
        <div key={file.title}>
          Image: {file.name}
          Title: <input type="text" defaultValue={file.title} />
        </div>
      );
    });
  };

  render() {
    let { files } = this.state;
    let disableUpload = files.length > 0 ? false : true;

    return (
      <div>
        <input
          type="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={this.handleImageOnchange}
          multiple
        />
        <this.ShowForms />
        <button disabled={disableUpload} onClick={this.uploadImage}>
          Upload
        </button>
      </div>
    );
  }
}

export default NewImage;
