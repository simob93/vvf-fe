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
    
    fetchResponse(response: HttpResponse<any>) {
        
        if (response.body) {
            let mostraPopUp = !response.body.success;
            if ((response.url.indexOf('new') >= 0) || (response.url.indexOf('update') >= 0) || (response.url.indexOf('delete') >= 0) || (response.url.indexOf('save') >= 0)) {
                mostraPopUp = true;
            }

            let strMessage = response.body.message && response.body.message
            .map(rec => rec['testo'])
            
            const objResponse: MessageState = {
                success: response.body.success,
                message: strMessage,
                showDialog: mostraPopUp
            }

            if (strMessage && strMessage.length > 0 && mostraPopUp) {
                this.show(objResponse); 
            }
        }
    }

    show(object: MessageState) {
        this.messageSubject.next((<MessageState> object))
    }
    hide() {

    }
}
