import React, { Component } from 'react';
import { injectActions, connect } from 'mickey';
import { saveAs } from 'file-saver/FileSaver';
import style from './index.less';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constant';
import { delayPromise } from '../common';

@injectActions
@connect(store => ({
  ...store.picture,
}))
export default class Images extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
  }

  async outputImg() {
    const { output, images } = this.props;

    if (output) {
      for (const image of images) {
        await this.drawImg(image);
      }
    }
  }

  async drawImg(imageProps) {
    const { size } = this.props;
    const { src, positionDiff, rate, name } = imageProps;
    const { diffX, diffY, tDiffX, tDiffY } = positionDiff;
    const image = new Image();

    image.src = src;
    image.onload = () => {
      const { width, height } = image;
      const imageToOriCanvasRate = Math.min(CANVAS_WIDTH / width, CANVAS_HEIGHT / height);
      const oriWidth = imageToOriCanvasRate * width;
      const oriHeight = imageToOriCanvasRate * height;

      this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
      this.ctx.drawImage(image,
        (rate * (diffX + tDiffX)) - ((CANVAS_WIDTH - size.width) / 2),
        (rate * (diffY + tDiffY)) - ((CANVAS_HEIGHT - size.height) / 2),
        rate * oriWidth,
        rate * oriHeight,
      );

      this.canvas.toBlob((blob) => {
        saveAs(blob, `${name}-${size.width}x${size.height}.png`);
      });
    };

    await delayPromise(2000);
  }

  render() {
    this.outputImg();

    const { size } = this.props;
    const { width, height } = size;

    return (<canvas
      width={width}
      height={height}
      className={style.canvas}
      ref={c => this.canvas = c}
    />);
  }
}
