function drawCanvasImg(imageProps, canvasProps) {
  const { src, positionDiff, rate } = imageProps;
  const { diffX, diffY, tDiffX, tDiffY } = positionDiff;
  const { cHeight, cWidth, ctx } = canvasProps;
  const image = new Image();

  image.src = src;
  image.onload = () => {
    const { width, height } = image;
    const imageToCanvasRate = Math.min(cHeight / width, cWidth / height);

    ctx.clearRect(0, 0, cHeight, cHeight);
    ctx.drawImage(image,
      rate * (0 + diffX + tDiffX),
      rate * (0 + diffY + tDiffY),
      imageToCanvasRate * width * rate,
      imageToCanvasRate * height * rate);
  };
}

export {
  drawCanvasImg,
};
