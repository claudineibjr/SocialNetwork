export class Utilities{
    
    static validateEmail(email: string): boolean {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    static formatDate(date: Date, displayHour: boolean = false): string{
        const year = date.getFullYear();
        const month = Utilities.completeLeadingZeros((date.getMonth() + 1).toString(), 2); //Mês começa com 0 = Janeiro
        const day = Utilities.completeLeadingZeros(date.getDate().toString(), 2);
        let displayedHour = '';
        
        if (displayHour)
            displayedHour = ' ' + this.formatHour(date);

        return day + '/' + month + '/' + year + displayedHour;
    }
    
    static formatHour(date: Date, displaySeconds: boolean = false): string{
        const hour = Utilities.completeLeadingZeros(date.getHours().toString(), 2);
        const minutes = Utilities.completeLeadingZeros(date.getMinutes().toString(), 2);
        const seconds = displaySeconds ? ':' + Utilities.completeLeadingZeros(date.getSeconds().toString(), 2) : '';
        return hour + ':' + minutes + seconds;
    }

    private static getMidnightTime(date: Date): Date {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    }

    static translateDateToText(date: Date): string {
        let originalDate: Date = date;
        if (this.getMidnightTime(date).valueOf() === this.getMidnightTime(new Date()).valueOf() )
            return 'Today at ' + this.formatHour(originalDate); // Today
        else
            return '';
    }

    static completeLeadingZeros(value: string, numZero: number): string {
        let zeros = '';
        for (let iCount = 0; iCount < numZero; iCount++)    zeros = '0' + zeros;
        return (zeros + value).slice(-numZero);
    }
}