import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { DATE_TIME_FORMAT_STANDARD } from './constant';

/**
 * 
 * @param object 
 */
export function convertiBoolean(object : any) {
    let newObject = {};
    for (let prop in object) {
        newObject[prop] = object[prop];
        if (typeof newObject[prop] === 'boolean') {
            newObject[prop] = Boolean(newObject[prop]) ? 'T' : 'F'
        }
    }
    return newObject;
}

/**
 *  ritorna una nuova data con ore e minuti a 23:59:59
 */
export function endOfDay(data: Date, nullIsToday = false) {
    let newDate = data != null ? data : nullIsToday ?  new Date() : null;
    if (newDate)
        return moment(newDate).endOf('day').utc(true).toDate();
    return null;
}

/**
 *  ritorna una nuova data con ore e minuiti a 00:00
 */
export function startOfDay(data: Date, nullIsToday = false) {
    let newDate = data != null ? data : nullIsToday ?  new Date() : null;
    if (newDate) {
        return moment(newDate).startOf('day').utc(true).toDate();

    }
    return null;

}
/**
 * metodo che formatta la data da mandare al ws
 * @param data  f
 */
export function formattaData(data: any, format?: string) {
    let result = null;
    if (!format) {
        format = DATE_TIME_FORMAT_STANDARD;
    }
    if (data) {
        result = moment.utc(data).format(format);
    }
    return result;
}

export function sommaDataOra(data: Date, ora?: Date | string) :Date {
    let d = data != null ? moment.utc(data) : moment();
    let o = ora != null ? moment.utc(ora, 'HH:mm') : moment();

    d.set({
        hours: o.hours(),
        minutes: o.minutes(),
        seconds: o.seconds()
    });
    return d.utc(true).toDate();
}
/**
 * 
 * @param form 
 */
export function resetStateForm(form : FormGroup) {
    form.markAsUntouched();
    form.markAsPristine();
}

export function sporcaForm(form : FormGroup) {
    form.get('id').setValue(-9999);
    form.markAsDirty();
}

export function isValidID(id) : boolean {
    return (id != null) && (id > 0)
}