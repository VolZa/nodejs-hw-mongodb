import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    // 🔧 Ручна конвертація isFavourite
    if ('isFavourite' in req.body) {
      const val = req.body.isFavourite;
      if (val === 'true') req.body.isFavourite = true;
      else if (val === 'false') req.body.isFavourite = false;
    }
    await schema.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: false,
      convert: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
