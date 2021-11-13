import { Injectable } from '@angular/core';
import { Team } from '../model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: Team
})
export class TeamService {

  constructor(private http: HttpClient) { }

  listLettere(idSquadra?): Observable<String[]> {
    return this.http.get<String[]>('/vvf/lettere/list', {
        params: {
            idSquadra
        }
    });
  }
}
