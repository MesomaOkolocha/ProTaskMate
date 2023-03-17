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
        currentBoardPayload?: BoardType | null,
        columnPayload?: columnType,
        currentBoardCopyPayload?: BoardType | null,
        newTaskPayload?: tasksType
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
        editBoardmodal: boolean,
        deleteBoardModal: boolean,
        addColumnModal: boolean,
        editModal: boolean,
        addTaskModal: boolean,
    },
    currentBoardCopy: BoardType | null,
    newTask: tasksType
}

export type allboardsType = BoardType[]

export interface BoardType {
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
    statusId: string | number;
    subtasks: subtasksType[]
}

export type subtasksType = {
    title: string;
    isCompleted: Boolean;
    id: string | number
}
