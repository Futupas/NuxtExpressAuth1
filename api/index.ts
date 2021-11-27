import { ServerMiddleware } from '@nuxt/types';

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  // Use req, res, next
  res.write('hello world');
  console.log(req.url);
  next();
}

export default myServerMiddleware;
