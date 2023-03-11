import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { ref, set } from "firebase/database"
import { useAuth } from "../Contexts/AppContext"
import { auth, db } from "../firebase"
import { FcGoogle } from 'react-icons/fc'

export default function GoogleSignIn() {

  function logInWithGoogle(){
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    signInWithPopup(auth, provider).then(result=>{
      const reference = ref(db, 'users/'+result.user.displayName)
        
      set(reference, {
        email: result.user.email,
        username: result.user.displayName
      })
    })
  }
  return (
    <button onClick={logInWithGoogle} className='bg-white shadow-sm mt-4 shadow-slate-400 p-4 rounded-lg w-[300px] text-[1.1rem] font-bold flex items-center justify-center gap-3'>
      <i className='text-[1.8rem]'><FcGoogle /> </i>
      <p> Sign In With Google</p>
    </button>
  )
}
