import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = async (ctx, next) => {
  const authorization = ctx.request.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        ctx.status = 401
        ctx.body = { status: 'Invalid Token' };
      } else {
        ctx.body = { ...ctx.body, user: decode }
        await next();
      }
    });
  } else {
    ctx.status = 401
  }
};

export const isAdmin = async (ctx, next) => {
  if (ctx.body.user && ctx.body.user.isAdmin) {
    await next();
  } else {
    ctx.status = 401
  }
};