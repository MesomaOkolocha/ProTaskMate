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
        currentUserPayload?: User | null | 'Guest'
        emailPayload?: string;
        passwordPayload?: string;
        usernamePayload?: string;
        errorPayload? : string;
        BoardsPayload?: BoardType[] | null,
        currentBoardPayload?: BoardType | null,
        columnPayload?: columnType,
        currentBoardCopyPayload?: BoardType | null,
        newTaskPayload?: tasksType,
        currentTaskPayload? : tasksType,
        newBoardPayload? : BoardType | null
    }

}

export type AppContextType = {
    currentUser: User | null | 'Guest'
    email: string;
    username: string;
    password: string;
    errorMessage: string;
    dispatch: React.Dispatch<AppActionType>,
    Boards: BoardType[] | null,
    currentBoard: BoardType | null,
    modals: {
        boardsModal: boolean,
        editBoardmodal: boolean,
        deleteBoardModal: boolean,
        addColumnModal: boolean,
        editModal: boolean,
        addTaskModal: boolean,
        showTaskModal: boolean,
        deleteTaskModal: boolean,
        editTaskModal: boolean,
        createBoardModal: boolean,
    },
    currentBoardCopy: BoardType | null,
    newTask: tasksType,
    currentTask: tasksType,
    isLightToggled: boolean,
    sideBarShown: boolean,
    newBoard: BoardType | null
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
    isCompleted: boolean;
    id: string | number
}
