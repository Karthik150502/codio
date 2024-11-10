

import { onAuthStateChanged, getAuth } from 'firebase/auth'
import React, { useEffect } from 'react'
import { App as FirebaseApp } from '@/lib/auth'
export default function Landing() {

    const auth = getAuth(FirebaseApp)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("This is the user", user);
            } else {
                console.log('No user is signed in')
            }
        })
    }, [])


    return (
        <div>
            <p className='text-5xl tracking-tighter'>
                {/* Welcome to the Home. */}
            </p>
        </div>
    )
}
