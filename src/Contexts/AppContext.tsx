import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";
import { appReducer } from "../Reducer/appReducer";
import { AppContextType } from "../Types/types";


const AppContext = createContext<AppContextType>({
    currentUser: null,
    email: '',
    username: '',
    password: '',
    errorMessage: '',
    dispatch: ()=>{}
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
    },[])
    return (
        <AppContext.Provider value={mainState}>

        </AppContext.Provider>
    )
}
