import React, { Component } from 'react';
import { Button } from 'antd';
import { injectActions, connect } from 'mickey';
import Size from './Size';
import style from './index.less';

@injectActions
@connect(store => ({
  images: store.picture.images,
}))
export default class FileUpload extends Component {
  uploadFile = (e) => {
    const { files } = e.target;
    const { actions } = this.props;
    const { addFile } = actions.picture;
    const readerOnload = ({ name, size, type }) => ({ target }) => addFile({
      name,
      type,
      size,
      rate: 1,
      src: target.result,
      positionDiff: {
        diffX: 0,
        diffY: 0,
        tDiffX: 0,
        tDiffY: 0,
      },
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
    const { images, actions } = this.props;
    const { showOutput } = actions.output;

    return (<div className={style.size} >
      <div className={style.file}>
        <label className={style.upload}>
          <input className={style.uploadInput} type="file" multiple onChange={this.uploadFile} />
        选择文件
        </label>
        {!!images.length && <Button type="dashed" onClick={showOutput}>生成图片</Button>}
      </div>
      <Size />
    </div>);
  }
}
