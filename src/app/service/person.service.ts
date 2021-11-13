

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../model/person';
import {JsonResponse} from '../model';
@Injectable({
    providedIn: 'root'
})
export class PersonService {
    constructor(private http: HttpClient) { }
    /**
     *
     * @param area
     */
    listByArea(area) {
        return this.http.get<JsonResponse<Person[]>>('/vvf/person/listbyarea', {
            params: {
                area
            }
        });
    }
    getBy(idArea) {
        return this.http.get<JsonResponse<Person[]>>('/vvf/person/getby', {
            params: {
                idArea
            }
        });
    }
    /**
     *
     * @param person
     */
    save(person:Person) {
        return this.http.post<Person>(`/vvf/person/new`, person);
    }
    /**
     *
     * @param person
     */
    update(person: Person){
        return this.http.post<Person>(`/vvf/person/update`, person);
    }
    /**
     *
     * @param id
     */
    delete(id) {
        return this.http.get<Person>(`/vvf/person/${id}/delete`, {
            params: {
                id
            }
        });
    }

}
