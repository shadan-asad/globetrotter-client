import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'challenge', component: ChallengeComponent },
  { path: 'challenge/:id', component: ChallengeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '**', redirectTo: '' }
]; 