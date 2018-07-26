import React, { Component } from 'react';
import style from './index.less';

export default class ImageCanvas extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');

    setTimeout(() => this.drawImg(), 0);
  }

  drawImg = () => {
    if (!this.ctx) {
      return;
    }

    const { src, rate } = this.props;
    this.imgSrc = src;
    const image = new Image();
    image.src = src;
    this.ctx.drawImage(image, 0, 0, 300, 300, 0, 0, 300 * rate, 300 * rate);
  }

  render() {
    this.drawImg();

    return (<canvas width="300" height="300" ref={c => this.canvas = c} className={style.imageCanvas} />);
  }
}
