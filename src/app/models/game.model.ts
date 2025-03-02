export interface GameQuestion {
  questionId: string;
  clues: string[];
  options: string[];
}

export interface GameResponse {
  correct: boolean;
  funFact: string;
  correctAnswer: string;
} 