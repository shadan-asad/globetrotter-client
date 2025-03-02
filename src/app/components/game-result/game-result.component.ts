import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameResponse } from '../../models/game.model';

@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss'
})
export class GameResultComponent {
  @Input() result: GameResponse | null = null;
  @Input() isLoggedIn: boolean = false;
  @Output() playAgain = new EventEmitter<void>();

  onPlayAgain(): void {
    this.playAgain.emit();
  }
} 