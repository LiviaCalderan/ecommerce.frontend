import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const { user } = useSelector((state) => state.auth);

  return (
    <div className='lg:px-40 sm:px-8 px-4 py-14 font-raleway'>
      <div className='flex flex-col'>
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
            {user?.username.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Olá, {user?.username}!</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>

    

  )
}

export default Profile