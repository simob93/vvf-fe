import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageState } from '../state/allState';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private messageSubject = new Subject<MessageState>();
    messageState = this.messageSubject.asObservable();

    constructor() { }
    
    
    show(object: MessageState) {
        this.messageSubject.next((<MessageState> object))
    }
    hide() {

    }
}
