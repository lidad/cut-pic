export default {
  state: {
    mouseDown: false,
  },

  pressMouseDown: state => ({
    ...state,
    mouseDown: true,
  }),

  pressMouseUp: state => ({
    ...state,
    mouseDown: false,
  }),
};
