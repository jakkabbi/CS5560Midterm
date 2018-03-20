import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Pair } from '../shared/models/pair.model';

@Injectable()
export class PairService {

  constructor(private http: HttpClient) { }

  getPairs(): Observable<Pair[]> {
    return this.http.get<Pair[]>('/api/pair');
  }

  countPairs(): Observable<number> {
    return this.http.get<number>('/api/pair/count');
  }

  addPair(pair: Pair): Observable<Pair> {
    return this.http.post<Pair>('/api/pair', pair);
  }

  getPair(pair: Pair): Observable<Pair> {
    return this.http.get<Pair>(`/api/pair/${pair._id}`);
  }

  editPair(pair: Pair): Observable<string> {
    return this.http.put(`/api/pair/${pair._id}`, pair, { responseType: 'text' });
  }

  deletePair(pair: Pair): Observable<string> {
    return this.http.delete(`/api/pair/${pair._id}`, { responseType: 'text' });
  }

}
