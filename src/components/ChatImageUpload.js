import React, { useState } from "react";
import Compressor from "compressorjs";
import { useToast } from "../hooks/index.js";

const ImageUpload = (props) => {
  const { children } = props;

  const { addToast } = useToast();

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      compressAndConvertToBase64(file);
    }
  };

  // Function to convert file to base64
  const compressAndConvertToBase64 = (file) => {
    props.onLoading(true);
    new Compressor(file, {
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
      success(result) {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          props.onImageLoad(reader.result, base64String);
          props.onLoading(false);
        };
        reader.onerror = (error) => {
          props.onLoading(false);
          addToast("Не удалось загрузить фотографию", "bg-danger text-white");
          console.error("Error converting file to base64:", error);
        };
      },
      error(err) {
        props.onLoading(false);
        addToast("Не удалось загрузить фотографию", "bg-danger text-white");
        console.error("Error compressing the image:", err);
      },
    });
  };

  return (
    <>
      <input
        className="d-none"
        type="file"
        onChange={handleFileChange}
        id="fileInput"
      />
      <label
        className="d-inline-block p-2"
        htmlFor="fileInput"
        style={{ cursor: "pointer" }}
      >
        {children}
      </label>
    </>
  );
};

export default ImageUpload;
