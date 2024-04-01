import domtoimage from "dom-to-image";

export const screenShotElement = (cssSelector: string, fileName?: string) => {
  const element = document.querySelector(cssSelector) as HTMLElement;

  if (!element) {
    throw new Error("Element not found");
  }

  domtoimage
    .toPng(element, {
      style: {
        "background-color": "black",
        "padding": "0rem 2rem",
      },
    })

    .then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = fileName || "screenshot.png";
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};
