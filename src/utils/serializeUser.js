export const serializeUser = (user) => {
    name: user.name,
    email: user.email,
    craetedAt: user.craetedAt,
    updatedAt: user.updatedAt,
    _id: user._id,
};