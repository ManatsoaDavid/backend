export interface IReview {
  reviewId?: number;
  userId: number
  title: string;
  description: string;
  rating : number;
  createdAt: number;
  updatedAt: number;
}

export class Review implements IReview {
  public reviewId!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public rating!: number;
  public createdAt!: number;
  public updatedAt!: number;

}
