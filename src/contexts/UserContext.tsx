import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface UserContextValues{
  user: LoggedUser
  setUser: Dispatch<SetStateAction<LoggedUser>>
}

export const UserContext = createContext({} as UserContextValues)

export default function AuthProvider({children}: {children: JSX.Element | JSX.Element[]}) {
  const [user, setUser] = useState<LoggedUser>({username: '', token:''})

  const value = {
    user,
    setUser
  }

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}
