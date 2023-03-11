import { User } from "firebase/auth";

export interface signUpFormInterface {
    email: string;
    password: string;
    username: string;
}
export interface logInFormInterface {
    email: string;
    password: string;
}

export type AppActionType = {
    type: string;
    payload?:{
        currentUserPayload?: User | null
        emailPayload?: string;
        passwordPayload?: string;
        usernamePayload?: string;
        errorPayload? : string;
    }
}

export type AppContextType = {
    currentUser: User | null
    email: string;
    username: string;
    password: string;
    errorMessage: string;
    dispatch: React.Dispatch<AppActionType>
}

export type allboardsType = BoardType[]


export type BoardType = {
    id: number;
    name: string;
    columns: columnType[]
}

export type columnType = {
    id: number;
    name: string;
    tasks: tasksType[]
}
export type tasksType = {
    id: number;
    description: string;
    title: string;
    status: string;
    statusId: Number;
    subtasks: subtasksType[]
}

export type subtasksType = {
    title: string;
    isCompleted: Boolean;
}