import { IStars } from "../types/stars";

export const getAverageStars = (stars: IStars[]) => {
  if (!stars.length) {
    return 0;
  }

  return (
    stars.reduce((sum, star) => {
      return sum + star.number;
    }, 0) / stars.length
  );
};
