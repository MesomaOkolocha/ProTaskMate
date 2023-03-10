import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import { logInFormInterface, signUpFormInterface } from "../Types/types";


export async function signUpUser(formData: signUpFormInterface){
    await createUserWithEmailAndPassword(auth, formData.email, formData.password)
    const reference = ref(db, 'users/')
    
    set(reference, {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstname,
        lastname: formData.lastName
    })
    
}

export async function loginUser(formData: logInFormInterface){
    await signInWithEmailAndPassword(auth, formData.email, formData.password)
}