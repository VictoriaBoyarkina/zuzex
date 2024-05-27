import Compressor from "compressorjs";

export default function compressAndConvertToBase64(file) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      maxWidth: 800,
      maxHeight: 800,
      success(result) {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          resolve([reader.result, base64String]);
        };
        reader.onerror = (error) => {
          console.log(error);
          // addToast('Не удалось загрузить фотографию', 'bg-danger text-white');
          // console.error("Error converting file to base64:", error);
          reject(error);
        };
      },
      error(err) {
        console.log(err);
        // addToast('Не удалось загрузить фотографию', 'bg-danger text-white');
        // console.error("Error compressing the image:", err);
        reject(err);
      },
    });
  });
};
