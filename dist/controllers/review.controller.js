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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_service_1 = require("../services/review.service");
class ReviewController {
    constructor() {
        this.reviewService = new review_service_1.ReviewService();
    }
    createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const reviewData = req.body;
                const newReview = yield this.reviewService.createReview(reviewData);
                response = {
                    success: true,
                    data: newReview,
                };
                status = 201;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    getReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const reviews = yield this.reviewService.getReviews();
                response = {
                    success: true,
                    data: reviews,
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    updateReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                const reviewData = req.body;
                const updatedReview = yield this.reviewService.updateReviews(parseInt(id), reviewData);
                response = {
                    success: true,
                    data: updatedReview,
                };
                status = 200;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    deleteReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                success: false,
            };
            let status;
            try {
                const { id } = req.params;
                yield this.reviewService.deleteReviews(parseInt(id));
                response = {
                    success: true,
                };
                status = 204;
            }
            catch (error) {
                this.handleError(error, res);
                return;
            }
            res.status(status).json(response);
        });
    }
    handleError(error, res) {
        console.error('Error in review controller:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred',
        });
    }
}
exports.ReviewController = ReviewController;
