import produce from 'immer';

export default {
  state: {
    size: {},
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
};
