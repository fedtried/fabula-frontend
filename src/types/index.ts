export type IContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
}

export type IUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    stories: IStory[];
}

export type INavLink = {
    route: string;
    label: string;
}

export default interface User {
    role: string;
    stories: IStory[];
    id: number,
    name: string,
    email: string,
    password: boolean,
}

export type INewUser = {
    name: string;
    email: string;
    password: string;
}

export type IStory = {
    date: string;
    quote: string;
    writing: string;
}

export type INewStory = {
  date: string;
  quote: string;
  writing: string;
  userId: string;
  promptId: string;
}

export type IUpdateUser = {
  id: string;
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export type IPrompt = {
    id: string;
    quote: string;
    date: string;
    mode: string;
}