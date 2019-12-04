export enum Gender{
    MALE,
    FEMALE,
    NOT_INFORM
}

export default class User{
    id: string = '';
    email: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    birthday: Date;
    friends: Array<User>;

    _friends: Array<string>;

    constructor(email: string, firstName: string, gender: Gender, birthday: Date,  lastName: string = ''){
        this.email = email;
        this.firstName = firstName;
        this.gender = gender;
        this.birthday = birthday;
        this.lastName = lastName;
        
        this.friends = new Array<User>();
        this._friends = new Array<string>();
    }

    getFullName(): string{
        return this.firstName + ' ' + this.lastName;
    }
}