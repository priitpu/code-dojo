export interface IPostSender {
  name: string;
  picture: string;
}

export interface IPost {
  id: number;
  author: IPostSender;
  time: string;
  text: string;
  children?: IPost[];
}
