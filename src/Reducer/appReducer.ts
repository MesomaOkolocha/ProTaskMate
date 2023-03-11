import { AppActionType, AppContextType } from "../Types/types";

export function appReducer(state: AppContextType, action: AppActionType){
    switch(action.type){

        case 'setCurrentUser':
            return {
                ...state,
                currentUser: action.payload?.currentUserPayload ?? null
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
                username: action.payload?.emailPayload ?? ''
            }
        case 'setPassword':
            return {
                ...state,
                username: action.payload?.passwordPayload ?? ''
            }
        case 'setError':
            return {
                ...state,
                errorMessage : action.payload?.errorPayload ?? ''
            }
        default:
            return state
    }
}