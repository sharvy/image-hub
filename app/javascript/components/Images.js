import React from "react";
import NewImage from "./NewImage";

const ImagesList = ({ images }) => {
  return Array.from(images).map((image) => {
    return (
      <div key={image.url} className="col">
        <div className="card shadow-sm">
          <img className="card-img-top" src={image.url} height="100%" />
          <div className="card-body">
            <p className="card-text text-dark">{image.title}</p>
          </div>
        </div>
      </div>
    );
  });
};

const Images = ({ images }) => {
  return (
    <main>
      <section>
        <NewImage />
      </section>
      <section>
        <div className="album py-5">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
              <ImagesList images={images} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Images;
