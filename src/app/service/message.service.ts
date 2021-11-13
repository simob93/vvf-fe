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
    
    fetchResponse(response) {
        
        if (response.body) {
            let strMessage = response.body.message
            .filter(recMsg => (recMsg['type'] == 1))
            .map(rec => rec['testo'])
            
            const objResponse: MessageState = {
                success: response.body.success,
                message: strMessage.toString(),
                showDialog: !response.body.success
            }

            if (strMessage && strMessage.length > 0) {
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
