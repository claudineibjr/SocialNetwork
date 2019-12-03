import User from './User';

export default class Post {
    id: string = '';
    user: User;
    date: Date;
    content: string;
    history: Array<Post>;

    _user: string;

    constructor(user: User, date: Date, content: string){
        this.user = user;
        this._user = user.id;
        this.date = date;
        this.content = content;
        
        this.history = new Array<Post>();
    }
}