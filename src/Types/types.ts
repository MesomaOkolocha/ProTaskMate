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
        BoardsPayload?: BoardType[],
        currentBoardPayload?: BoardType | null
    }
}

export type AppContextType = {
    currentUser: User | null
    email: string;
    username: string;
    password: string;
    errorMessage: string;
    dispatch: React.Dispatch<AppActionType>,
    Boards: BoardType[],
    currentBoard: BoardType | null,
    modals: {
        boardsModal: boolean,
        editBoardmodal: boolean
    }
}

export type allboardsType = BoardType[]

export type BoardType = {
    id: number | string;
    name: string;
    isActive: boolean;
    columns: columnType[]
}

export type columnType = {
    id: number | string;
    name: string;
    tasks: tasksType[]
}
export type tasksType = {
    id: number | string;
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
