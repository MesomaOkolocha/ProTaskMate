import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { allBoards } from "../data";
import { auth } from "../firebase";
import { appReducer } from "../Reducer/appReducer";
import { AppContextType } from "../Types/types";


const AppContext = createContext<AppContextType>({
    currentUser: null,
    email: '',
    username: '',
    password: '',
    errorMessage: '',
    dispatch: ()=>{},
    Boards: [],
    currentBoard: allBoards.boards[0]
})

export function useAuth(){
    return useContext(AppContext)
}

export function AppProvider({children}: {children: ReactNode}){
    
    const value = useAuth()
    const [mainState, dispatch] = useReducer(appReducer, value)

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            dispatch({
                type: 'setCurrentUser',
                payload: {
                    currentUserPayload: user
                }
            })
        })
        return unsubscribe
    },[])
    return (
        <AppContext.Provider value={{...mainState, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}
