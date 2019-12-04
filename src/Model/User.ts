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
    birthday?: Date;
    friends: Array<User>;

    _friends: Array<string>;

    constructor(email: string, firstName: string, gender: Gender, birthday?: Date,  lastName: string = ''){
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

    getUpdatable(){
        return {
            'id': this.id,
            'email': this.email,
            'firstName': this.firstName,
            'lastName': this.lastName,
            'gender': this.gender,
            'birthday': this.birthday != undefined ? this.birthday.getTime() : null,
            'friends': this._friends
        }
    }

    static getUser(_user: any): User {
        let id: string = _user.id;
        let email: string = _user.email;
        let firstName: string = _user.firstName;
        let lastName: string = _user.lastName;
        let gender: Gender = _user.gender;
        let birthday: Date | undefined = _user.birthday ? new Date(_user.birthday) : undefined;
        let friends: Array<string> = _user.friends ? Object.keys(_user.requests).map(iCount => _user.friends[iCount]) : new Array<string>();

        let user: User = new User(email, firstName, gender, birthday, lastName);
        user.id = id;
        user._friends = friends;

        return user;
    }
}