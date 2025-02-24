export const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (err) {
      console.error('Caught error in ctrlWrapper:', err);
      next(err);
    }
  };
};
