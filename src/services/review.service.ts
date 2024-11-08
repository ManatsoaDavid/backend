import { IReview } from "../models/review.model";
import { SqReview } from "../sequelize-model/SqReview";
import SqUser from "../sequelize-model/SqUser";
import { CustomError } from "../util/error";

export class ReviewService {
  public async createReview(reviewData: IReview): Promise<IReview> {
    try {
      const user = await SqUser.findByPk(reviewData.userId);
      if (!user) {
        throw new CustomError(404, 'User not found');
      }

      const review = await SqReview.create({
        userId: reviewData.userId,
        title: reviewData.title,
        description: reviewData.description,
        rating: reviewData.rating,
      } as IReview);

      return review.get({ plain: true }) as IReview;
    } catch (error) {
      throw new CustomError(500, 'Error creating review');
    }
  }

  public async getReviews(): Promise<IReview[]> {
    try {
      const reviews = await SqReview.findAll();
      return reviews.map((review) => review.get({ plain: true }) as IReview);
    } catch (error) {
      throw new CustomError(500, 'Error fetching reviews');
    }
  }

  public async updateReviews(reviewId: number, reviewData: Partial<IReview>): Promise<IReview> {
    try {
      const review = await SqReview.findByPk(reviewId);
      if (!review) {
        throw new CustomError(404, "Review not found");
      }
      await review.update(reviewData);
      return review.get({ plain: true }) as IReview;
    } catch (error) {
      throw new CustomError(500, 'Error updating review');
    }
  }

  public async deleteReviews(reviewId: number): Promise<void> {
    try {
      const review = await SqReview.findByPk(reviewId);
      if (!review) {
        throw new CustomError(404, "Review not found");
      }
      await SqReview.destroy({ where: { reviewId } });
    } catch (error) {
      throw new CustomError(500, 'Error deleting review');
    }
  }
}
