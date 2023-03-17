import { nanoid } from "nanoid";
import { allBoards } from "../data";
import { generateColumn } from "../Functions/Functions";
import { AppActionType, AppContextType } from "../Types/types";

export function appReducer(state: AppContextType, action: AppActionType){
    
    const task =  {
        id: nanoid(),
        description: '',
        title: '',
        status: '',
        statusId: '',
        subtasks: []
    }

    switch(action.type){

        case 'setCurrentUser':
            return {
                ...state,
                currentUser: action.payload?.currentUserPayload ?? null
            }
        case 'setNoUser':
            return {
                ...state,
                currentUser: null
            }
        case 'setNoParameter':
            return {
                ...state,
                username: '',
                password: '',
                email: '',
                errorMessage: ''
            }
        case 'setUsername':
            return {
                ...state,
                username: action.payload?.usernamePayload ?? ''
            }
        case 'setEmail':
            return {
                ...state,
                email: action.payload?.emailPayload ?? ''
            }
        case 'setPassword':
            return {
                ...state,
                password: action.payload?.passwordPayload ?? ''
            }
        case 'setError':
            return {
                ...state,
                errorMessage : action.payload?.errorPayload ?? ''
            }
        case 'setBoards':
            return {
                ...state,
                Boards: action.payload?.BoardsPayload ?? []
            }
        case 'setNoBoards':
            return {
                ...state,
                Boards: []
            }
        case 'setCurrentBoard':
            return {
                ...state,
                currentBoard: action.payload?.currentBoardPayload ?? null
            }
        case 'setCurrentBoardCopy':
            return {
                ...state,
                currentBoardCopy: action.payload?.currentBoardCopyPayload ?? null
            }
        case 'setNoBoard':
            return {
                ...state,
                currentBoard: null
            }
        case 'setNewTask':
            return {
                ...state,
                newTask: action.payload?.newTaskPayload ?? task
            }
        case 'setBoardsModalCurrent':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    boardsModal: true
                }
            }
        case 'setBoardsModalFalse':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    boardsModal: false
                }
            }
        case 'setEditBoardsModal':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    editBoardmodal: true
                }
            }
        case 'setEditBoardsModalFalse':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    editBoardmodal: false
                }
            }
        case 'setDeleteBoardModalTrue':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    deleteBoardModal: true
                }
            }
        case 'setDeleteBoardModalFalse':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    deleteBoardModal: false
                }
            }
        case 'setAddColumnModalTrue':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    addColumnModal: true
                }
            }
        case 'setEditModalTrue':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    editModal: true
                }
            }
        case 'setAddTaskModalTrue':
            return {
                ...state, 
                modals: {
                    ...state.modals,
                    addTaskModal: true
                }
            }
        case 'setNoModals':{
            return {
                ...state,
                modals: {
                    editBoardmodal: false,
                    boardsModal: false,
                    deleteBoardModal: false,
                    addColumnModal: false,
                    editModal: false,
                    addTaskModal: false
                }
            }
        }
        default:
            return state
    }
}