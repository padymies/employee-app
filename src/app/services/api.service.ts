import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getWorkPositions(): Observable<string[]> {
    return this.http.get<string[]>('api/positions').pipe(
      map((res: any) => res?.positions),
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: `Api Service Error: ${error.message}`,
          detail: 'TRY DISABLING ADBLOQUER IN YOUR BROWSER',
        });
        return EMPTY;
      })
    );
  }
}
