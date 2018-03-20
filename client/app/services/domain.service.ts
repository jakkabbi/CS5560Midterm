import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Domain } from '../shared/models/domain.model';

@Injectable()
export class DomainService {

  constructor(private http: HttpClient) { }

  getDomains(): Observable<Domain[]> {
    return this.http.get<Domain[]>('/api/domains');
  }

  countDomains(): Observable<number> {
    return this.http.get<number>('/api/domains/count');
  }

  addDomain(domain: Domain): Observable<Domain> {
    return this.http.post<Domain>('/api/domain', domain);
  }

  getDomain(domain: Domain): Observable<Domain> {
    return this.http.get<Domain>(`/api/domain/${domain._id}`);
  }

  editDomain(domain: Domain): Observable<string> {
    return this.http.put(`/api/domain/${domain._id}`, domain, { responseType: 'text' });
  }

  deleteDomain(domain: Domain): Observable<string> {
    return this.http.delete(`/api/domain/${domain._id}`, { responseType: 'text' });
  }

}
