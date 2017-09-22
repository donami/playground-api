import express from 'express';

import {
  playgroundCtrl
} from '../controllers';
import {
  isValid
} from '../common/id-validator';

const router = express.Router();

router.route('/')
  .get(playgroundCtrl.list)

  .post(playgroundCtrl.create);

router.use('/:id', (req, res, next) => {
  if (!isValid(req.params.id)) {
    return res.status(404).send({
      data: null,
      message: 'The playground was not found',
      status: 404
    });
  }

  return next();
});

router.route('/:id')
  .get(playgroundCtrl.get)

  .put(playgroundCtrl.update)

  .delete(playgroundCtrl.remove);

router.route('/:id/add-rating')

  .put(playgroundCtrl.addRating);

router.route('/:id/restore')

  .get(playgroundCtrl.restore);

router.route('/:id/add-comment')

  .put(playgroundCtrl.addComment);

router.param('id', playgroundCtrl.load);

export default router;
