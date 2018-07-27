import React, { Component } from 'react';
import style from './index.less';

const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 300;

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

    return (<canvas width="300" height="300" ref={c => this.canvas = c} className={style.imageCanvas} />);
  }
}
