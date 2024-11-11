/**
 * Represents the structure of a standardized API response.
 */
export interface IApiResponse {
  /**
   * Indicates whether the operation was successful or not.
   */
  success: boolean;

  /**
   * The message associated with the response.
   */
  message?: string;

  /**
   * The data returned by the API.
   */
  data?: any;
}
