import express from 'express';

import {
  equipmentCtrl
} from '../controllers';
import {
  isValid
} from '../common/id-validator';

const router = express.Router();

router.use('/:id', (req, res, next) => {
  if (!isValid(req.params.id)) {
    return res.status(404).send({
      data: null,
      message: 'The equipment was not found',
      status: 404
    });
  }

  return next();
});

router.route('/')
  .get(equipmentCtrl.list)

  .post(equipmentCtrl.create);

router.route('/:id')
  .get(equipmentCtrl.get)

  .put(equipmentCtrl.update)

  .delete(equipmentCtrl.remove);

router.param('id', equipmentCtrl.load);

export default router;
