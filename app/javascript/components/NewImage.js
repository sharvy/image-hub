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
        <div key={index} className="col text-center mb-2">
          <div className="card shadow-sm h-100">
            <img className="card-img-top img-responsive" src={src} />

            <div className="card-body">
              <div className="card-title">
                <div className="form-group">
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
        <div className="row mb-4 mt-4">
          <div className="col-sm"></div>
          <div className="col-sm">
            <div className="form-row align-items-center">
              <input
                className="form-control-file"
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={this.handleImageOnchange}
                multiple
              />
            </div>
          </div>
          <div className="col-sm text-left">
            <a
              className="btn btn-primary"
              disabled={disableUpload}
              onClick={this.uploadImage}
            >
              Submit
            </a>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          <this.ShowForms />
        </div>
      </main>
    );
  }
}

export default NewImage;
