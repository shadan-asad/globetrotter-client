import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ChallengeLink, ChallengeInvite, User } from '../../models/user.model';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss'
})
export class ChallengeComponent implements OnInit {
  challengeId: string | null = null;
  challengeLink: ChallengeLink | null = null;
  inviterInfo: ChallengeInvite | null = null;
  isLoading: boolean = false;
  error: string = '';
  username: string = '';
  showRegistration: boolean = false;
  
  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if we're joining a challenge
    this.route.paramMap.subscribe(params => {
      this.challengeId = params.get('id');
      
      if (this.challengeId) {
        this.loadChallengeInfo();
      }
    });
  }

  loadChallengeInfo(): void {
    // In a real implementation, we would load the challenge info from the API
    // For now, we'll just simulate it
    this.isLoading = true;
    
    setTimeout(() => {
      this.inviterInfo = {
        challengeId: this.challengeId || '',
        creatorUsername: 'ChallengeCreator',
        creatorStats: {
          correct: 15,
          incorrect: 5,
          totalPlayed: 20,
          lastPlayed: new Date()
        }
      };
      
      this.isLoading = false;
    }, 1000);
  }

  createChallenge(): void {
    if (!this.authService.isLoggedIn()) {
      this.showRegistration = true;
      return;
    }
    
    this.isLoading = true;
    this.error = '';
    
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.error = 'You must be logged in to create a challenge';
      this.isLoading = false;
      return;
    }
    
    this.apiService.createChallenge(currentUser.username).subscribe({
      next: (response) => {
        this.challengeLink = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to create challenge. Please try again.';
        this.isLoading = false;
        console.error('Error creating challenge:', err);
      }
    });
  }

  joinChallenge(): void {
    if (!this.challengeId) {
      this.error = 'Invalid challenge ID';
      return;
    }
    
    if (!this.authService.isLoggedIn()) {
      this.showRegistration = true;
      return;
    }
    
    this.isLoading = true;
    this.error = '';
    
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.error = 'You must be logged in to join a challenge';
      this.isLoading = false;
      return;
    }
    
    this.apiService.joinChallenge(this.challengeId, currentUser.username).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/game']);
      },
      error: (err) => {
        this.error = 'Failed to join challenge. Please try again.';
        this.isLoading = false;
        console.error('Error joining challenge:', err);
      }
    });
  }

  registerAndCreate(): void {
    if (!this.username || this.username.trim().length < 3) {
      this.error = 'Username must be at least 3 characters long';
      return;
    }
    
    this.isLoading = true;
    this.error = '';
    
    this.authService.register(this.username.trim()).subscribe({
      next: (user) => {
        if (user && user.username) {
          if (this.challengeId) {
            this.joinChallenge();
          } else {
            this.createChallenge();
          }
        } else {
          this.error = 'Registration failed. Please try again.';
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.error = 'Registration failed. Please try again.';
        this.isLoading = false;
        console.error('Error registering:', err);
      }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(
      () => {
        alert('Link copied to clipboard!');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }
} 