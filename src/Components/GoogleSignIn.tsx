import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { onValue, ref, set, update } from "firebase/database"
import { auth, db } from "../firebase"
import { FcGoogle } from 'react-icons/fc'
import { useState } from "react"
import { BoardType } from "../Types/types"
import { defaultBoard } from "../data"

export default function GoogleSignIn() {

  const [loading, setLoading] = useState(false)

  async function logInWithGoogle(){

    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })

    setLoading(true)

    await signInWithPopup(auth, provider).then(result=>{
      const reference = ref(db, 'users/'+result.user.displayName)
      let data: BoardType[] = [] 
      const newReference = ref(db, 'users/'+result.user.displayName+'/tasks')

      onValue(newReference, snapshot=>{
        if(snapshot.val()!==null){
          data= snapshot.val()
        }
      })

      if(data.length === 0){
        set(reference, {
          email: result.user.email,
          username: result.user.displayName,
          tasks: defaultBoard
        })
      } else{
        update(reference, {
          tasks: [...data], 
          email: result.user.email, 
          username: result.user.displayName
        })
      }
    }).catch(error=>{
      console.log(error)
    })

    setLoading(false)
  }


  return (
    <button disabled={loading} onClick={logInWithGoogle} className='bg-white shadow-sm mt-4 shadow-slate-400 p-4 rounded-lg w-[300px] text-[1.1rem] font-bold flex items-center justify-center gap-3'>
      <i className='text-[1.8rem]'><FcGoogle /> </i>
      <p> Sign In With Google</p>
    </button>
  )
}
