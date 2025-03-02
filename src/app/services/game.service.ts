import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { GameQuestion, GameResponse } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private currentQuestionSubject = new BehaviorSubject<GameQuestion | null>(null);
  public currentQuestion$ = this.currentQuestionSubject.asObservable();

  private gameResultSubject = new BehaviorSubject<GameResponse | null>(null);
  public gameResult$ = this.gameResultSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  getNewQuestion(): Observable<GameQuestion> {
    return this.apiService.getGameQuestion().pipe(
      tap(question => {
        this.currentQuestionSubject.next(question);
        this.gameResultSubject.next(null); // Reset previous result
      })
    );
  }

  submitAnswer(answer: string): Observable<GameResponse> {
    const currentQuestion = this.currentQuestionSubject.value;
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentQuestion) {
      throw new Error('No active question');
    }

    return this.apiService.submitAnswer(
      currentQuestion.questionId, 
      answer,
      currentUser?.username
    ).pipe(
      tap(result => {
        this.gameResultSubject.next(result);
        
        // Update user stats locally
        if (currentUser) {
          this.authService.updateUserStats(result.correct);
        }
      })
    );
  }

  getCurrentQuestion(): GameQuestion | null {
    return this.currentQuestionSubject.value;
  }

  getCurrentResult(): GameResponse | null {
    return this.gameResultSubject.value;
  }

  resetGame(): void {
    this.currentQuestionSubject.next(null);
    this.gameResultSubject.next(null);
  }
} 