"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const SqPractitioner_1 = __importDefault(require("../sequelize-model/SqPractitioner"));
const SqReview_1 = require("../sequelize-model/SqReview");
const SqUser_1 = __importDefault(require("../sequelize-model/SqUser"));
const SqVisitor_1 = require("../sequelize-model/SqVisitor");
const error_1 = require("../util/error");
class ReviewService {
    createReview(reviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield SqUser_1.default.findOne({
                    where: { userId: reviewData.userId },
                    include: [
                        { model: SqPractitioner_1.default },
                        { model: SqVisitor_1.SqVisitor }
                    ]
                });
                if (!user) {
                    throw new error_1.CustomError(404, 'User not found');
                }
                const review = yield SqReview_1.SqReview.create({
                    userId: reviewData.userId,
                    title: reviewData.title,
                    description: reviewData.description,
                    rating: reviewData.rating,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });
                return review.get({ plain: true });
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error creating review');
            }
        });
    }
    getReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield SqReview_1.SqReview.findAll({
                    include: [{
                            model: SqUser_1.default,
                            include: [
                                { model: SqPractitioner_1.default },
                                { model: SqVisitor_1.SqVisitor }
                            ]
                        }],
                    order: [['createdAt', 'DESC']]
                });
                return reviews.map((review) => review.get({ plain: true }));
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error fetching reviews');
            }
        });
    }
    updateReviews(reviewId, reviewData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield SqReview_1.SqReview.findByPk(reviewId);
                if (!review) {
                    throw new error_1.CustomError(404, "Review not found");
                }
                yield review.update(reviewData);
                return review.get({ plain: true });
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error updating review');
            }
        });
    }
    deleteReviews(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const review = yield SqReview_1.SqReview.findByPk(reviewId);
                if (!review) {
                    throw new error_1.CustomError(404, "Review not found");
                }
                yield SqReview_1.SqReview.destroy({ where: { reviewId } });
            }
            catch (error) {
                throw new error_1.CustomError(500, 'Error deleting review');
            }
        });
    }
}
exports.ReviewService = ReviewService;
