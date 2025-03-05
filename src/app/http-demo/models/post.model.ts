export interface Post {
  id: number;
  userId: number;
  title?: string;
  body?: string;
}

export interface PostCreate {
  userId: number;
  title: string;
  body: string;
}

export interface PostUpdate {
  id: number;
  title?: string;
  body?: string;
}
