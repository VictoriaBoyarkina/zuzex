import pako from "pako";

function isValidBase64(base64) {
  const regex = /^(?:[A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return regex.test(base64);
}

function padBase64(base64) {
  return base64 + '='.repeat((4 - (base64.length % 4)) % 4);
}

// Function to compress a base64 string
export function compressBase64(base64) {

  // Pad base64 string
  const binaryString = window.atob(base64);
  const binaryArray = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    binaryArray[i] = binaryString.charCodeAt(i);
  }

  // Compress the binary data using pako
  const compressedArray = pako.deflate(binaryArray);
  const compressedString = String.fromCharCode.apply(null, compressedArray);

  // Encode the compressed binary string to base64
  return window.btoa(compressedString);
}

// Function to decompress a base64 string
export function decompressBase64(compressedBase64) {
  const compressedString = atob(compressedBase64); // Decode base64 to binary string
  const compressedArray = new Uint8Array(compressedString.length);

  for (let i = 0; i < compressedString.length; i++) {
    compressedArray[i] = compressedString.charCodeAt(i);
  }

  const decompressedArray = pako.inflate(compressedArray);
  const decompressedString = String.fromCharCode.apply(null, decompressedArray);
  return btoa(decompressedString); // Encode binary string to base64
}
