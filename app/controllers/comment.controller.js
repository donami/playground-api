import Promise from 'bluebird';

import Comment from '../models/comment.model';

const load = (req, res, next, id) => {
  Comment.get(id)
    .then((comment) => {
      req.comment = comment;
      return next();
    })
    .catch(e => next(e));
};

const create = (req, res, next) => {
  const comment = new Comment({
    name: req.body.name,
    body: req.body.body,
  });

  comment.save()
    .then(comment => res.json({ message: 'Comment created!', data: comment }))
    .catch(e => next(e));
};

const list = (req, res, next) => {
  const { limit = 50, skip = 0, query = '' } = req.query;

  Comment.list({ limit, skip, query })
    .then(comment => res.json(comment))
    .catch(e => next(e));
};

const get = (req, res) => res.json(req.comment);

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
