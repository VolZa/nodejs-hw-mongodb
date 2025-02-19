import createHttpError from "http-errors";


export const validateBody = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, {abortEarly: false});
        next();
    } catch (err) {
        const error = createHttpError(400, 'Bad request', {data: err.details});
        next(error); 
    }
};

// export const validateBody = (schema) => (req, res, next) => {
//     const {error} = schema.validate(req.body, {abortEarly: false});
//     if (error) {
//         return res.status(400).json({message: error.details.map(err => err.message)});
//     }
//     next();
// };