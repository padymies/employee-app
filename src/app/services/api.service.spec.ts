import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { MessageService } from 'primeng/api';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageService],
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getWorkPositions should get the work positions', () => {
    const mockResponse = {
      positions: [
        'full-stack developer',
        'front-end developer',
        'sw admin',
        'help desk',
        'scrum master',
        'product manager',
      ],
    };
    service.getWorkPositions().subscribe((data) => {
      expect(data.length).toBe(6);
    });
    const req = http.expectOne('api/positions');
    req.flush(mockResponse);
    expect(req.request.method).toBe('GET');
  });

  it('getWorkPositions should catch errors and fire message', () => {
    const messageService: MessageService = TestBed.inject(MessageService);
    const spy = spyOn(messageService, 'add');
    service.getWorkPositions().subscribe();
    const req = http
      .expectOne('api/positions')
      .error(new ErrorEvent('Mock Error'));
    expect(spy).toHaveBeenCalled();
  });
});
