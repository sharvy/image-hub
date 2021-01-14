import React, { Component } from "react";

class Images extends Component {
  ShowImages = () => {
    let { images } = this.props;

    return images.map((image) => {
      return (
        <div key={image.url} className="col">
          <div className="card shadow-sm">
            <img
              className="card-img-top"
              src={image.url}
              height="100%"
            />

            <div className="card-body">
              <p className="card-text text-dark">
                {image.title}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <main>
        <div className="album py-5">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
              <this.ShowImages />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Images;
