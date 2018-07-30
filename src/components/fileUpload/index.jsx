import React, { Component } from 'react';
import { injectActions } from 'mickey';
import Size from './Size';
import style from './index.less';

@injectActions
export default class FileUpload extends Component {
  uploadFile = (e) => {
    const { files } = e.target;
    const { actions } = this.props;
    const { addFile } = actions.picture;
    const readerOnload = ({ name, size, type }) => ({ target }) => addFile({
      name,
      size,
      type,
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
    return (<div className={style.size} >
      <label className={style.upload}>
        <input className={style.uploadInput} type="file" multiple onChange={this.uploadFile} />
        选择文件
      </label>
      <Size />
    </div>);
  }
}
