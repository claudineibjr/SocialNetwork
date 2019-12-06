import User from './User';
import PostEdited from './PostEdited';
import { UserDB } from '../Services/Firebase/Database/UserDB';

export enum PostVisibility{
    PUBLIC,
    PRIVATE
}

export default class Post {
    id: string = '';
    user: User; // Not persisted on database
    private _date: Date;
    private _inverseDate: number; // Datetime of post inverted to sort the post descending on Firebase
    content: string;
    history: Array<PostEdited>;
    visibility: PostVisibility;
    hasPicture: boolean;

    userStr: string; // UserID - Persisted on database

    constructor(user: User, date: Date, content: string, visibility: PostVisibility = PostVisibility.PUBLIC, hasPicture: boolean = false){
        this.user = user;
        this.userStr = user.id;
        this._date = date;
        this._inverseDate = - date.getTime();
        this.content = content;
        this.visibility = visibility;
        this.hasPicture = hasPicture;

        this.history = new Array<PostEdited>();
    }

    setDate(date: Date){
        this._date = date;
        this._inverseDate = - date.getTime();
    }

    getDate(): Date{
        return this._date;
    }

    getUpdatable() {
        return {
            'id': this.id,
            'user': this.userStr,
            'date': this._date.getTime(),
            'inverseDate': this._inverseDate,
            'content': this.content,
            'visibility': this.visibility,
            'history': this.history,
            'hasPicture': this.hasPicture
        }
    }

    static async getPost(_post: any, loadUser: boolean = false, loadHistory: boolean = false): Promise<Post> {
        let id: string = _post.id;
        let _user: string = _post.user;
        let date: Date = new Date(_post.date);
        let content: string = _post.content;
        let visibility: PostVisibility = _post.visibility;
        let history: Array<PostEdited> = _post.history ? Object.keys(_post.history).map(iCount => _post.history[iCount]) : new Array<PostEdited>();
        let hasPicture: boolean = _post.hasPicture;

        return new Promise(async (resolve, reject) => {
            let user = await UserDB.getUser(_user);
            
            let post: Post = new Post(user, date, content, visibility, hasPicture);
            post.id = id;
            post.userStr = _user;
            post.history = history;

            resolve(post);
        });
    }
}