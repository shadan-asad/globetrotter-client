export interface UserStats {
  correct: number;
  incorrect: number;
  totalPlayed: number;
  lastPlayed: Date;
}

export interface User {
  username: string;
  gameStats: UserStats;
  token?: string;
}

export interface ChallengeInvite {
  challengeId: string;
  creatorUsername: string;
  creatorStats: UserStats;
}

export interface ChallengeLink {
  challengeId: string;
  inviteUrl: string;
  imageUrl: string;
} 