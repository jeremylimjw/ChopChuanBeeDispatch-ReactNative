import moment from 'moment';

export function parseDate(date: any): string {
    return moment(date).format('ll');
}

export function parseDateTime(date: any): string {
    return moment(date).format('lll');
}

export function parseDateTimeSeconds(date: any): string {
    return moment(date).format('ddd D, YYYY h:mm:ss A');
}