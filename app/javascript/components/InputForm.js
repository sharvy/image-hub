import React from "react";
import PropTypes from "prop-types";

const InputForm = ({ onChange, onSubmit, disableUpload }) => {
  return (
    <div className="row mb-4 mt-4">
      <div className="col-sm"></div>
      <div className="col-sm">
        <div className="form-row align-items-center">
          <input
            className="form-control-file"
            type="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={onChange}
            multiple
          />
        </div>
      </div>
      <div className="col-sm text-left">
        <a
          className="btn btn-primary"
          disabled={disableUpload}
          onClick={onSubmit}
        >
          Submit
        </a>
      </div>
    </div>
  );
};

InputForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default InputForm;
