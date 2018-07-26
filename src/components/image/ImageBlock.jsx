import React, { Component } from 'react';
import { Card, Slider } from 'antd';
import ImageCanvas from './ImageCanvas';
import style from './index.less';

const { Meta } = Card;
const MAX_SIZE = 100;
const MIN_SIZE = 1;

export default class ImageBlock extends Component {
  changeSize = (size) => {

  }

  render() {
    const { imageProps } = this.props;
    const { src, name } = imageProps;

    return (<Card
      hoverable
      className={style.image}
      cover={<ImageCanvas src={src} />}
    >
      <Meta
        title={name}
      />
      <Slider max={MAX_SIZE} min={MIN_SIZE} onChange={this.changeSize} />
    </Card>);
  }
}
