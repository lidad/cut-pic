import React, { Component } from 'react';
import style from './index.less';

export default class ImageCanvas extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');

    this.drawImg(this.props.src);
  }

  componentWillReceiveProps({ src }) {
    if (src !== this.props.src) {
      this.drawImg(src);
    }
  }

  drawImg = (src) => {
    const image = new Image();
    image.src = src;
    this.ctx.drawImage(image, 0, 0);
  }

  render() {
    return (<canvas width="300" height="300" ref={c => this.canvas = c} className={style.imageCanvas} />);
  }
}
