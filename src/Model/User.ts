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
    friends: Array<User>; // Not persisted on database
    hasImage: boolean;
    

    _friends: Array<string>; // Users ID - Persisted on database

    constructor(email: string, firstName: string, gender: Gender, lastName: string = ''){
        this.email = email;
        this.firstName = firstName;
        this.gender = gender;
        
        this.lastName = lastName;
        
        this.friends = new Array<User>();
        this._friends = new Array<string>();
        this.hasImage = false;
    }

    getFirstLetter(): string{
        return this.firstName[0];
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
            'friends': this._friends,
            'hasImage': this.hasImage
        }
    }

    static getUser(_user: any, loadFriends: boolean = false): User {
        let id: string = _user.id;
        let email: string = _user.email;
        let firstName: string = _user.firstName;
        let lastName: string = _user.lastName;
        let gender: Gender = _user.gender;
        let _friends: Array<string> = _user.friends ? Object.keys(_user.requests).map(iCount => _user.friends[iCount]) : new Array<string>();
        let friends: Array<User> = new Array<User>();
        let hasImage: boolean = _user.hasImage;
        if (loadFriends)
            friends = new Array<User>();

        let user: User = new User(email, firstName, gender, lastName);
        user.id = id;
        user._friends = _friends;
        user.friends = friends;
        user.hasImage = hasImage;

        return user;
    }
}