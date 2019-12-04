import User from './User';

export enum PostVisibility{
    PUBLIC,
    PRIVATE
}

export default class Post {
    id: string = '';
    user: User;
    date: Date;
    content: string;
    history: Array<Post>;
    visibility: PostVisibility;

    _user: string;

    constructor(user: User, date: Date, content: string, visibility: PostVisibility = PostVisibility.PUBLIC){
        this.user = user;
        this._user = user.id;
        this.date = date;
        this.content = content;
        this.visibility = visibility;

        this.history = new Array<Post>();
    }
}