import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { GameQuestion, GameResponse } from '../../models/game.model';
import { GameResultComponent } from '../game-result/game-result.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, GameResultComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  question: GameQuestion | null = null;
  result: GameResponse | null = null;
  selectedAnswer: string = '';
  isLoading: boolean = true;
  error: string = '';
  
  constructor(
    private gameService: GameService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNewQuestion();
  }

  loadNewQuestion(): void {
    this.isLoading = true;
    this.error = '';
    this.result = null;
    this.selectedAnswer = '';
    
    this.gameService.getNewQuestion().subscribe({
      next: (question) => {
        this.question = question;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load question. Please try again.';
        this.isLoading = false;
        console.error('Error loading question:', err);
      }
    });
  }

  selectAnswer(answer: string): void {
    if (this.result) return; // Don't allow selection after answer is submitted
    this.selectedAnswer = answer;
  }

  submitAnswer(): void {
    if (!this.selectedAnswer || !this.question) return;
    
    this.isLoading = true;
    
    this.gameService.submitAnswer(this.selectedAnswer).subscribe({
      next: (result) => {
        this.result = result;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to submit answer. Please try again.';
        this.isLoading = false;
        console.error('Error submitting answer:', err);
      }
    });
  }

  playAgain(): void {
    this.loadNewQuestion();
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  isOptionSelected(option: string): boolean {
    return this.selectedAnswer === option;
  }
} 