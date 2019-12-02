export class Utilities{
    
    static validateEmail(email: string): boolean {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    static formatDate(date: Date): string{
        let year = date.getFullYear();
        let month = Utilities.completeLeadingZeros((date.getMonth() + 1).toString(), 2); //Mês começa com 0 = Janeiro
        let day = Utilities.completeLeadingZeros(date.getDate().toString(), 2);
        return day + '/' + month + '/' + year;        
    }

    static completeLeadingZeros(value: string, numZero: number): string {
        let zeros = '';
        for (let iCount = 0; iCount < numZero; iCount++)    zeros = '0' + zeros;
        return (zeros + value).slice(-numZero);
    }
}