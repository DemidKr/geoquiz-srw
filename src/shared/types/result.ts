export interface IResult {
  id: number;
  score: number;
  userId: number;
  questionId: number;
  createdAt?: string;
  updatedAt?: string;
  users: {
    username: string;
  };
}

export interface ICreateResultDto {
  score: number;
  questionId: number;
}
