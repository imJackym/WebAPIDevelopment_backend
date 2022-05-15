import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  console.log("generateToken")
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

export const isAuth = (ctx, next) => {
  console.log(ctx)
  const authorization = ctx.request.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        ctx.status = 401
        ctx.body = { status: 'Invalid Token' };
      } else {
        ctx.request.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (ctx, next) => {
  if (ctx.request.user && ctx.request.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};