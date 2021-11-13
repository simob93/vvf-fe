import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SubjectNotificationService {

    private dataSource = new BehaviorSubject<any>(null);
    data = this.dataSource.asObservable();

    constructor() { }

    updateNotification(listNotify) {
        this.dataSource.next(listNotify);
    }
}
