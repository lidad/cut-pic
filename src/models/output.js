export default {
  state: {
    visible: false,
  },

  showOutput: state => ({
    ...state,
    visible: true,
  }),

  hideOutput: state => ({
    ...state,
    visible: false,
  }),
};

