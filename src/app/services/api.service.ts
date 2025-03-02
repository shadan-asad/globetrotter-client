import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from '../models/destination.model';
import { GameQuestion, GameResponse } from '../models/game.model';
import { User, ChallengeLink } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Destination endpoints
  getAllDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/destinations`, { headers: this.getHeaders() });
  }

  getRandomDestination(): Observable<Destination> {
    return this.http.get<Destination>(`${this.apiUrl}/destinations/random`, { headers: this.getHeaders() });
  }

  // Game endpoints
  getGameQuestion(): Observable<GameQuestion> {
    return this.http.get<GameQuestion>(`${this.apiUrl}/game/question`, { headers: this.getHeaders() });
  }

  submitAnswer(questionId: string, answer: string, username?: string): Observable<GameResponse> {
    return this.http.post<GameResponse>(`${this.apiUrl}/game/answer`, 
      { questionId, answer, username }, 
      { headers: this.getHeaders() }
    );
  }

  // User endpoints
  registerUser(username: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/register`, { username }, { headers: this.getHeaders() });
  }

  getUserProfile(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/profile/${username}`, { headers: this.getHeaders() });
  }

  // Challenge endpoints
  createChallenge(username: string): Observable<ChallengeLink> {
    return this.http.post<ChallengeLink>(`${this.apiUrl}/users/challenge/create`, 
      { username }, 
      { headers: this.getHeaders() }
    );
  }

  joinChallenge(challengeId: string, username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/challenge/join`, 
      { challengeId, username }, 
      { headers: this.getHeaders() }
    );
  }
} 