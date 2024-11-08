import { Request, Response } from 'express';
import { IApiResponse } from '../interfaces';
import { IReview } from '../models/review.model';
import { ReviewService } from '../services/review.service';

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  public async createReview(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const reviewData = req.body as IReview;
      const newReview = await this.reviewService.createReview(reviewData);
      response = {
        success: true,
        data: newReview,
      };
      status = 201;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async getReviews(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const reviews = await this.reviewService.getReviews();
      response = {
        success: true,
        data: reviews,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async updateReview(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      const reviewData = req.body as Partial<IReview>;
      const updatedReview = await this.reviewService.updateReviews(parseInt(id), reviewData);
      response = {
        success: true,
        data: updatedReview,
      };
      status = 200;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  public async deleteReview(req: Request, res: Response): Promise<void> {
    let response: IApiResponse = {
      success: false,
    };
    let status: number;

    try {
      const { id } = req.params;
      await this.reviewService.deleteReviews(parseInt(id));
      response = {
        success: true,
      };
      status = 204;
    } catch (error) {
      this.handleError(error, res);
      return;
    }

    res.status(status).json(response);
  }

  private handleError(error: unknown, res: Response): void {
    console.error('Error in review controller:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred',
    });
  }
}
