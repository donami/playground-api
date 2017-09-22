import Promise from 'bluebird';

import Playground from '../models/playground.model';
import Comment from '../models/comment.model';

const load = (req, res, next, id) => {
  Playground.get(id)
    .then((playground) => {
      req.playground = playground;
      return next();
    })
    .catch(e => next(e));
};

const create = (req, res, next) => {
  
  const playground = new Playground({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    equipments: req.body.equipments,
    images: req.body.images || [],
  });

  playground.save()
    .then(playground => res.json({ message: 'Playground created!', data: playground }))
    .catch(e => next(e));
};

const list = (req, res, next) => {
  const { limit = 50, skip = 0, query = '' } = req.query;

  Playground.list({ limit, skip, query })
    .then(playground => res.json(playground))
    .catch(e => next(e));
};

const get = (req, res) => res.json(req.playground);

const remove = (req, res, next) => {
  const { soft = 'true' } = req.query;

  const playground = req.playground;

  // Delete action either soft delete or hard
  return Promise.resolve()
    .then(soft === 'true' ? playground.delete() : playground.remove())
    .then(() => res.json({ message: 'Successfully deleted!', data: playground }))
    .catch(e => next(e));
};

const restore = (req, res, next) => {

  const playground = req.playground;

  playground.deleted = false;

  return playground.save()
    .then(() => res.json({ message: 'Successfully restored!', data: playground }))
    .catch(e => next(e));
};

const update = (req, res, next) => {

  const body = req.body || {};

  return Playground
    .findByIdAndUpdate(req.params.id, body, { new: true })
    .populate('equipments comments')
    .exec()
    .then(playground => res.json({ message: 'Product updated!', data: playground }))
    .catch(e => next(e));
};

const addComment = (req, res, next) => {
  const playground = req.playground;
  const comment = new Comment({
    ...req.body,
  });

  comment.save()
    .then((comment) => {
      playground.comments.push(comment);

      return playground.save();
    })
    .then((playground) => res.json({ message: 'Comment added!', data: playground }))
    .catch(err => next(err));
};

const addRating = (req, res, next) => {

  const playground = req.playground;

  playground.votes.push({ value: req.body.rating });

  const { votes } = playground;
  const numberOfVotes = votes.length;

  const votesValue = votes.reduce((sum, vote) => {

    return sum + vote.value;
  }, 0);

  const rating = votesValue / numberOfVotes;

  playground.rating = rating;

  playground.save()
    .then((playground) => res.json({ message: 'Rating updated!', data: playground }))
    .catch(err => next(err));
};

export default {
  create,
  list,
  get,
  load,
  remove,
  update,
  restore,
  addComment,
  addRating,
};
