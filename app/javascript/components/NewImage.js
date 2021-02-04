import React, { useState } from "react";
import InputForm from "./InputForm";
import axios from "axios";

const NewImage = () => {
  const [files, setFiles] = useState([]);
  let disableUpload = files.length > 0 ? false : true;

  const csrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]').content;
  };

  const handleImageOnchange = (e) => {
    let files = Array.from(e.target.files);

    files = files.map((file) => {
      return { file: file, title: file.name };
    });

    setFiles(files);
  };

  const onSubmit = () => {
    let formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`images[${index}][title]`, file.title);
      formData.append(`images[${index}][file]`, file.file);
    });

    axios
      .post("/images", formData, {
        headers: {
          "X-CSRF-Token": csrfToken(),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => (window.location = "/"));
  };

  const updateTitle = (index, title) => {
    files[index].title = title;
    console.log(index, title);
    console.log(files);
    setFiles(files);
  };

  const ShowForms = () => {
    const content = files.map((file, index) => {
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
                    onChange={(e) => updateTitle(index, e.target.value)}
                    defaultValue={file.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {content}
      </div>
    );
  };

  return (
    <main className="container">
      <InputForm
        onChange={handleImageOnchange}
        onSubmit={onSubmit}
        disableUpload={disableUpload}
      />
      <ShowForms />
    </main>
  );
};

export default NewImage;
