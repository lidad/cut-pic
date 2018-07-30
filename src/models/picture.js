import produce from 'immer';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../src/components/constant';

export default {
  state: {
    size: {
      height: CANVAS_WIDTH,
      width: CANVAS_HEIGHT,
    },
    images: [],
  },

  changeSize: (state, size) => produce(state, (draft) => {
    draft.size = {
      ...state.size,
      ...size,
    };
  }),

  uploadFile: (state, { images }) => produce(state, (draft) => {
    draft.images = images;
  }),

  addFile: (state, image) => produce(state, (draft) => {
    draft.images.push(image);
  }),

  removeFile: (state, { src }) => produce(state, (draft) => {
    draft.images = state.images.filter(image => image.src !== src);
  }),

  modifyFilePosition: (state, { positionDiff, src }) => produce(state, (draft) => {
    const selectedImg = draft.images.find(image => image.src === src);

    selectedImg.positionDiff = positionDiff;
  }),

  modifyFileRate: (state, { rate, src }) => produce(state, (draft) => {
    const selectedImg = draft.images.find(image => image.src === src);

    selectedImg.rate = rate;
  }),
};
