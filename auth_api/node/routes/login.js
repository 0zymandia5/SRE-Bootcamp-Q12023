import { loginFunction } from '../services/login';

export const login =  async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let token = await loginFunction(username, password);
  
  let response = {
    "data": token
  };
  
  res.send(response);
  next();
}
