import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import { logInFormInterface, signUpFormInterface } from "../Types/types";


export async function signUpUser(email: string, password: string, username: string){
    await createUserWithEmailAndPassword(auth, email, password)
    const reference = ref(db, 'users/'+username)
    
    set(reference, {
        email: email,
        password: password,
        username: username
    })
    
}

export async function loginUser(email: string, password: string){
    await signInWithEmailAndPassword(auth, email, password)
}

export function logout(){
    signOut(auth)
}

export async function forgotPassword(email: string){
    await sendPasswordResetEmail(auth, email)
}