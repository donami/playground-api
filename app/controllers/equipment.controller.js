import Promise from 'bluebird';

import Equipment from '../models/equipment.model';

const load = (req, res, next, id) => {
  Equipment.get(id)
    .then((equipment) => {
      req.equipment = equipment;
      return next();
    })
    .catch(e => next(e));
};

const create = (req, res, next) => {
  const equipment = new Equipment({
    name: req.body.name,
  });

  equipment.save()
    .then(equipment => res.json({ message: 'Equipment created!', data: equipment }))
    .catch(e => next(e));
};

const list = (req, res, next) => {
  const { limit = 50, skip = 0, query = '' } = req.query;

  Equipment.list({ limit, skip, query })
    .then(equipment => res.json(equipment))
    .catch(e => next(e));
};

const get = (req, res) => res.json(req.equipment);

const remove = (req, res, next) => {
  /* const { soft = 'true' } = req.query;

  const product = req.product;

  // Delete action either soft delete or hard
  return Promise.resolve()
    .then(soft === 'true' ? product.delete() : product.remove())
    .then(() => res.json({ message: 'Successfully deleted!', data: product }))
    .catch(e => next(e)); */
};



const update = (req, res, next) => {
  /* const variants = req.body.variants
    .map((variant) => {
      // Create new variant if it does not exist
      if (!variant._id) {
        delete variant._id; // eslint-disable-line no-param-reassign
        variant.images = req.product.images;  // eslint-disable-line no-param-reassign
        return new Variant({ ...variant, product: req.product._id }).save();
      }
      return Variant.findByIdAndUpdate(variant._id, variant, { new: true });
    });

  Promise.all(variants)
    .then((savedVariants) => {
      const body = Object.assign({}, req.body, {
        variants: savedVariants,
      });

      return Product
        .findByIdAndUpdate(req.params.id, body, { new: true })
        .populate('category')
        .populate({
          path: 'variants',
          model: 'Variant',
          populate: {
            path: 'options',
            model: 'OptionValue',
          },
        })
        .populate({
          path: 'optionTypes',
          model: 'OptionType',
          populate: {
            path: 'values',
            model: 'OptionValue',
          }
        })
        .exec();
    })
    .then(product => res.json({ message: 'Product updated!', data: product }))
    .catch(e => next(e)); */
};

export default {
  create,
  list,
  get,
  load,
  remove,
  update,
};
