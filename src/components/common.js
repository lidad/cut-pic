function drawCanvasImg(imageProps, canvasProps) {
  const { src, positionDiff, rate } = imageProps;
  const { diffX, diffY, tDiffX, tDiffY } = positionDiff;
  const { cHeight, cWidth, ctx } = canvasProps;
  const image = new Image();

  image.src = src;
  image.onload = () => {
    const { width, height } = image;
    const imageToCanvasRate = Math.min(this.canvas.height / width, this.canvas.width / height);
    const imageToOriCanvasRate = Math.min(CANVAS_WIDTH / width, CANVAS_HEIGHT / height);
    const oriWidth = imageToOriCanvasRate * width;
    const oriHeight = imageToOriCanvasRate * height;

    this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
    this.ctx.drawImage(image,
      rate * (diffX + tDiffX) - (CANVAS_WIDTH - size.width) / 2,
      rate * (diffY + tDiffY) - (CANVAS_HEIGHT - size.height) / 2,
      rate * oriWidth,
      rate * oriHeight,
    );
  };
}

export {
  drawCanvasImg,
};
