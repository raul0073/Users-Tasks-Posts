export class UserFull {
  
  public allTasksCompleted: boolean = false;
  public _id?: string;

  constructor(
    public name: string,
    public email: string,
    public street: string,
    public city: string,
    public zipcode: number,
    public tasks: Task[],
    public posts: Post[],
  ) {}
}

// this interface will ensure that when passing posts or todos it will only accept this terms
export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
}

export interface Post {
  _id?: string;
  title: string;
  body: string;
}

 