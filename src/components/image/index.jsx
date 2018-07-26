import React, { Component } from 'react';
import { injectActions, connect } from 'mickey';
import ImageBlock from './ImageBlock';
import style from './index.less';

@injectActions
@connect(store => ({
  images: store.picture.images,
}))
export default class Image extends Component {
  render() {
    const { images } = this.props;

    return (<div className={style.images}>
      {images.map((image => <ImageBlock key={image.src} imageProps={image} />))}
    </div>);
  }
}
