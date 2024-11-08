import express from 'express';
import { ReviewController } from '../controllers/review.controller';

const reviewRoutes = express.Router();
const reviewController = new ReviewController();

reviewRoutes.post('/', reviewController.createReview.bind(reviewController));
reviewRoutes.get('/', reviewController.getReviews.bind(reviewController));
reviewRoutes.put('/:id', reviewController.updateReview.bind(reviewController));
reviewRoutes.delete('/:id', reviewController.deleteReview.bind(reviewController));

export default reviewRoutes;
