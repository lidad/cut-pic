import React, { Component } from 'react';
import { connect } from 'mickey';
import style from './index.less';
import { PREVIEW_HEIGHT, PREVIEW_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH } from '../constant';

@connect(store => ({
  size: store.picture.size,
}))
export default class CutImg extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');

    this.drawImg();
  }


  drawImg = () => {
    const { imageProps, size } = this.props;
    const { src, positionDiff, rate } = imageProps;
    const { diffX, diffY, tDiffX, tDiffY } = positionDiff;

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

  render() {
    this.drawImg();
    const { size } = this.props;
    const { width, height } = size;
    const imageToCanvasRate = Math.min(PREVIEW_WIDTH / width, PREVIEW_HEIGHT / height);

    return (<div className={style.imgBlock}>
      <canvas
        width={width}
        height={height}
        className={style.imageCanvas}
        ref={c => this.canvas = c}
      />
    </div>);
  }
}
