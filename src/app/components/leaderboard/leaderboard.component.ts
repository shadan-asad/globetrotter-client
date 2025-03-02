import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit {
  leaderboardUsers: User[] = [];
  isLoading: boolean = true;
  error: string = '';
  
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    // In a real implementation, we would load the leaderboard from the API
    // For now, we'll just simulate it with mock data
    this.isLoading = true;
    
    setTimeout(() => {
      this.leaderboardUsers = [
        {
          username: 'GeoMaster',
          gameStats: {
            correct: 45,
            incorrect: 5,
            totalPlayed: 50,
            lastPlayed: new Date()
          }
        },
        {
          username: 'TravelExpert',
          gameStats: {
            correct: 38,
            incorrect: 7,
            totalPlayed: 45,
            lastPlayed: new Date()
          }
        },
        {
          username: 'WorldExplorer',
          gameStats: {
            correct: 32,
            incorrect: 8,
            totalPlayed: 40,
            lastPlayed: new Date()
          }
        },
        {
          username: 'GlobeTrotter',
          gameStats: {
            correct: 28,
            incorrect: 12,
            totalPlayed: 40,
            lastPlayed: new Date()
          }
        },
        {
          username: 'MapReader',
          gameStats: {
            correct: 25,
            incorrect: 15,
            totalPlayed: 40,
            lastPlayed: new Date()
          }
        }
      ];
      
      // Add current user if logged in
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && !this.leaderboardUsers.some(u => u.username === currentUser.username)) {
        this.leaderboardUsers.push(currentUser);
      }
      
      // Sort by correct answers
      this.leaderboardUsers.sort((a, b) => b.gameStats.correct - a.gameStats.correct);
      
      this.isLoading = false;
    }, 1000);
  }

  getAccuracyPercentage(user: User): number {
    if (user.gameStats.totalPlayed === 0) return 0;
    return Math.round((user.gameStats.correct / user.gameStats.totalPlayed) * 100);
  }

  isCurrentUser(username: string): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.username === username : false;
  }
} 