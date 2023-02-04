import express, {Router} from 'express';
import {error as _error, info} from 'winston';

//=========================================================
//  SETUP
//---------------------------------------------------------
const PROJECT_ROOT_DIR = process.cwd();
const STATIC_DIR = `${PROJECT_ROOT_DIR}/target`;

const HOST = '0.0.0.0';
const PORT = 3000;

const app = express();

app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || 3000);

app.use(require('morgan')('dev'));
app.use(require(STATIC_DIR));

//=========================================================
//  ROUTER
//---------------------------------------------------------
const router = new Router();

router.get('*', (req, res) => {
  res.sendFile(`${STATIC_DIR}/index.html`);
});

app.use(router);

//=========================================================
//  START SERVER
//---------------------------------------------------------
app.listen(PORT, HOST, (error) => {
  if (error) {
    _error(error);
  } else {
    info(`Server listening @ ${HOST}:${PORT}`);
  }
});
