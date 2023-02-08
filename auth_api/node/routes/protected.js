import { protectFunction } from '../services/protected';

export const protect = async (req, res, next) => {
  let authorization = req.headers.authorization;
  let message = await protectFunction(authorization);
  let response = {
    "data": message
  };
  res.send(response);
  next();
}
