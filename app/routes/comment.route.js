import express from 'express';

import {
  commentCtrl
} from '../controllers';
import {
  isValid
} from '../common/id-validator';

const router = express.Router();

router.use('/:id', (req, res, next) => {
  if (!isValid(req.params.id)) {
    return res.status(404).send({
      data: null,
      message: 'The comment was not found',
      status: 404
    });
  }

  return next();
});

router.route('/')
  .get(commentCtrl.list)

  .post(commentCtrl.create);

router.route('/:id')
  .get(commentCtrl.get)

  .put(commentCtrl.update)

  .delete(commentCtrl.remove);

router.param('id', commentCtrl.load);

export default router;
