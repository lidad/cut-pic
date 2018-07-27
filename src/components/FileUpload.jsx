import React, { Component } from 'react';
import { injectActions, connect } from 'mickey';
import { InputNumber } from 'antd';
import style from './index.less';

@injectActions
@connect(store => ({
  size: store.picture.size,
}))
export default class Size extends Component {
  uploadFile = (e) => {
    const { files } = e.target;
    const { actions } = this.props;
    const { addFile } = actions.picture;
    const readerOnload = ({ name, size, type }) => ({ target }) => addFile({
      name,
      size,
      type,
      src: target.result,
    });

    Array.prototype.forEach.apply(files, [(file) => {
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = readerOnload(file);
      }
    }]);
  }

  render() {
    const { size, actions } = this.props;
    const { width, height } = size;
    const { changeSize } = actions.picture;

    return (<div className={style.size} >
      <label className={style.upload}>
        <input className={style.uploadInput} type="file" multiple onChange={this.uploadFile} />
        选择文件
      </label>
      <span>高（单位：px）</span>
      <InputNumber className={style.input} value={height} onChange={h => changeSize({ height: h })} />
      <span>宽（单位：px）</span>
      <InputNumber className={style.input} value={width} onChange={w => changeSize({ width: w })} />
    </div>);
  }
}
