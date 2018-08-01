import React, { Component } from 'react';
import { Card, Slider, Icon, Button } from 'antd';
import { injectActions } from 'mickey';
import ImageCanvas from './ImageCanvas';
import style from './index.less';
import { MAX_IMAGE_SIZE, MIN_IMAGE_SIZE } from '../constant';
import CutIframe from './CutFrame';

const { Meta } = Card;

@injectActions
export default class ImageBlock extends Component {
  changeSize = (size) => {
    const { actions, imageProps } = this.props;
    const { src } = imageProps;

    actions.picture.modifyFileRate({ src, rate: size / MAX_IMAGE_SIZE });
  }

  reset = () => {
    const { actions, imageProps } = this.props;
    const { src } = imageProps;
    const { modifyFilePosition, modifyFileRate } = actions.picture;
    const positionDiff = {
      diffX: 0,
      diffY: 0,
      tDiffX: 0,
      tDiffY: 0,
    };

    modifyFilePosition({ positionDiff, src });
    modifyFileRate({ src, rate: 1 });
  }

  removeImage = () => {
    const { imageProps, actions } = this.props;
    const { src } = imageProps;

    actions.picture.removeFile({ src });
  }

  renderCanvas = () => {
    const { imageProps } = this.props;
    const { rate } = imageProps;

    return (<div className={style.cardCover}>
      <ImageCanvas imageProps={imageProps} rate={rate} />
      <CutIframe className={style.cutIframe} imageProps={imageProps} />
    </div>);
  }

  render() {
    const { imageProps } = this.props;
    const { name, rate } = imageProps;

    return (<Card
      hoverable
      className={style.image}
      bodyStyle={{ borderTop: '1px solid #e8e8e8' }}
      cover={this.renderCanvas()}
    >
      <Meta
        title={<p className={style.name}>{name}
          <a className={style.remove} onClick={this.removeImage}>移除</a>
        </p>}
      />
      <div className={style.operate}>
        <Slider
          max={MAX_IMAGE_SIZE * 2}
          min={MIN_IMAGE_SIZE}
          onChange={this.changeSize}
          value={MAX_IMAGE_SIZE * rate}
        />
        <Button onClick={this.reset} className={style.btn}>
          <Icon type="reload" />
        </Button>
      </div>
    </Card>);
  }
}
