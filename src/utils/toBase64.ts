// const toBase64 = (file: File): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// export default toBase64;

export default async function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = function (event) {
      const blob = new Blob([event.target.result]); // create blob
      window.URL = window.URL || window.webkitURL;
      const blobURL = window.URL.createObjectURL(blob); // and get it's URL

      // helper Image object
      const image = new Image();
      image.src = blobURL;

      image.onload = function () {
        const canvas = document.createElement('canvas');

        const width = image.width;
        const height = image.height;

        // resize the canvas and draw the image data into it
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);

        const base64 = canvas.toDataURL('image/jpeg', 0.5);

        resolve(base64);
      };

      image.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
}
