import crossIcon from "../assets/img/cross-icon.svg";

const ImagePreview = (props) => {
  return (
    <div className="pb-2 ps-5 ms-2">
      <div className="position-relative d-inline-block">
        <button
          type="button"
          onClick={props.closeImage}
          className="border-0 p-0"
        >
          <img
            src={crossIcon}
            alt="Delete"
            style={{ width: "20px", opacity: "0.8" }}
            className="position-absolute top-0 end-0"
          />
        </button>
        <img
          className="rounded-3"
          src={props.base64String}
          style={{ maxHeight: "100px", maxWidth: "200px" }}
          alt="Preview"
        />
      </div>
    </div>
  );
};

export default ImagePreview ;
