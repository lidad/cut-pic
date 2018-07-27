import React, { Component } from 'react';
import style from './index.less';
import { CANVAS_HEIGHT, CANVAS_WIDTH, CUT_IFRAME_WIDTH } from '../constant';

export default class ImageCanvas extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');

    this.drawImg();
  }

  drawImg = () => {
    if (!this.ctx) {
      return;
    }
    const { src, rate } = this.props;
    const image = new Image();

    image.src = src;
    image.onload = () => {
      const { width, height } = image;
      const imageToCanvasRate = Math.min(CANVAS_WIDTH / width, CANVAS_HEIGHT / height);

      this.ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
      this.ctx.drawImage(image, 0, 0, imageToCanvasRate * width * rate, imageToCanvasRate * height * rate);
    };
  }

  render() {
    this.drawImg();

    return (<canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={c => this.canvas = c} className={style.imageCanvas} />);
  }
}
