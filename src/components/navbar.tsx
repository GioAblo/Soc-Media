import React from 'react'
import { Link  } from 'react-router-dom'
import { auth } from '../config/firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import { signOut } from 'firebase/auth'

export const Navbar = () => {

  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth)
  }

  return (
    <div>
        <Link to={'/'}>Home</Link>
        {!user ? (<Link to={'login'}>login</Link>) : <Link to={'createpost'}>CreatePost</Link>}
        
        

        <div>
          {user && (
            <>  
            <p>{user?.displayName}</p>
            <img alt='profpic' src={user?.photoURL || ""} width="25px" height="25px" style={{borderRadius: "50%"}}/>
            <button onClick={signUserOut}>Log Out</button>
          </>
          ) }
          
          
        </div>
    </div>
  )
}
