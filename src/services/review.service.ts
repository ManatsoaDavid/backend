import { IReview } from "../models/review.model";
import SqPractitioner from "../sequelize-model/SqPractitioner";
import { SqReview } from "../sequelize-model/SqReview";
import SqUser from "../sequelize-model/SqUser";
import { SqVisitor } from "../sequelize-model/SqVisitor";
import { CustomError } from "../util/error";

export class ReviewService {
  public async createReview(reviewData: IReview): Promise<IReview> {
    try {
      const user = await SqUser.findOne({
        where: { userId: reviewData.userId },
        include: [
          { model: SqPractitioner },
          { model: SqVisitor }
        ]
      });

      if (!user) {
        throw new CustomError(404, 'User not found');
      }

      const review = await SqReview.create({
        userId: reviewData.userId,
        title: reviewData.title,
        description: reviewData.description,
        rating: reviewData.rating,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      return review.get({ plain: true });
    } catch (error) {
      throw new CustomError(500, 'Error creating review');
    }
  }

  public async getReviews(): Promise<IReview[]> {
    try {
      const reviews = await SqReview.findAll({
        include: [{
          model: SqUser,
          include: [
            { model: SqPractitioner },
            { model: SqVisitor }
          ]
        }],
        order: [['createdAt', 'DESC']]
      });
      return reviews.map((review) => review.get({ plain: true }));
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
