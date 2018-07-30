import React, { Component } from 'react';
import { connect } from 'mickey';
import style from './index.less';
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from '../constant';

@connect(store => ({
  size: store.picture.size,
}))
export default class CutImg extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');

    this.drawImg();
  }


  drawImg = () => {
    const { imageProps } = this.props;
    const { src, positionDiff, rate } = imageProps;
    const { diffX, diffY, tDiffX, tDiffY } = positionDiff;

    const image = new Image();

    image.src = src;
    image.onload = () => {
      const { width, height } = image;
      const imageToCanvasRate = Math.min(this.canvas.height / width, this.canvas.width / height);

      this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
      this.ctx.drawImage(image,
        rate * (0 + diffX + tDiffX),
        rate * (0 + diffY + tDiffY),
        (imageToCanvasRate * width * rate),
        (imageToCanvasRate * height * rate));
    };
  }

  render() {
    this.drawImg();
    const { size } = this.props;
    const { width, height } = size;
    const imageToCanvasRate = Math.min(PREVIEW_WIDTH / width, PREVIEW_HEIGHT / height);

    return (<div className={style.imgBlock}>
      <canvas
        width={width * imageToCanvasRate}
        height={height * imageToCanvasRate}
        className={style.imageCanvas}
        ref={c => this.canvas = c}
      />
    </div>);
  }
}
