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
        <div key={index} className="col">
          <div className="card shadow-sm">
            <img className="card-img-top" src={src} height="100%" />

            <div className="card-body">
              <p className="card-text">
                <input
                  type="text"
                  onChange={(e) => this.updateTitle(index, e.target.value)}
                  defaultValue={file.title}
                />
              </p>
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
      <div className="cover-container d-flex p-3 mx-auto flex-column">
        <main className="px-3">
          <div>
            <input
              class="form-control form-control-lg"
              type="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={this.handleImageOnchange}
              multiple
            />
          </div>

          <button
            className="btn btn-primary"
            disabled={disableUpload}
            onClick={this.uploadImage}
          >
            Submit
          </button>
        </main>

        <main>
          <div className="album py-5">
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-6">
                <this.ShowForms />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default NewImage;
