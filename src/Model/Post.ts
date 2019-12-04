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
    date: Date;
    content: string;
    history: Array<PostEdited>;
    visibility: PostVisibility;

    _user: string; // UserID - Persisted on database

    constructor(user: User, date: Date, content: string, visibility: PostVisibility = PostVisibility.PUBLIC){
        this.user = user;
        this._user = user.id;
        this.date = date;
        this.content = content;
        this.visibility = visibility;

        this.history = new Array<PostEdited>();
    }

    getUpdatable() {
        return {
            'id': this.id,
            'user': this._user,
            'date': this.date.getTime(),
            'content': this.content,
            'visibility': this.visibility,
            'history': this.history
        }
    }

    static async getPost(_post: any, loadHistory: boolean = false): Promise<Post> {
        let id: string = _post.id;
        let _user: string = _post._user;
        let date: Date = new Date(_post.date);
        let content: string = _post.content;
        let visibility: PostVisibility = _post.visibility;
        let history: Array<PostEdited> = _post.history ? Object.keys(_post.history).map(iCount => _post.history[iCount]) : new Array<PostEdited>();

        return new Promise((resolve, reject) => {
            UserDB.getUser(_user).then((user) => {
                let post: Post = new Post(user, date, content, visibility);
                post.id = id;
                post._user = _user;
                post.history = history;
        
                resolve(post);
            });
        })

;
    }
}