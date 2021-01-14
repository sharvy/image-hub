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

  updateTitle = (index, title) => {
    let { files } = this.state;
    files[index].title = title;

    this.setState({ files });
  };

  ShowForms = () => {
    let { files } = this.state;

    return files.map((file, index) => {
      let src = URL.createObjectURL(file.file);

      return (
        <div key={index} className="col text-center">
          <div className="card shadow-sm">
            <img className="card-img-top img-responsive" src={src} />

            <div className="card-body">
              <div className="card-title">
                <div class="form-group">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => this.updateTitle(index, e.target.value)}
                    defaultValue={file.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    let { files } = this.state;
    let disableUpload = files.length > 0 ? false : true;

    return (
      <main className="container">
        <input
          className="form-control col-3"
          type="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={this.handleImageOnchange}
          multiple
        />
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          <this.ShowForms />
        </div>
        <a
          className="btn btn-primary"
          disabled={disableUpload}
          onClick={this.uploadImage}
        >
          Submit
        </a>
      </main>
    );
  }
}

export default NewImage;
