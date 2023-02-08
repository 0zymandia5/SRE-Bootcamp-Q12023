import Config from 'config';
import app from './server';

let config = Config;

app.listen(config.port, async function () {
  console.log('http://localhost:' + config.port);
});
