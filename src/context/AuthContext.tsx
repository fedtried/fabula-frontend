import UserService from '@/services/UserService'
import { IContextType, IUser } from '@/types'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const INITIAL_USER = {
    id: '',
    name: '',
    email: '',
    role: '',
    stories: []
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    const checkAuthUser = async () => {
        try {
            const currentAccount = await UserService.getCurrentUser()
            console.log(currentAccount)
            if(currentAccount){
                setUser({
                    id: currentAccount.data.id.toString(),
                    name: currentAccount.data.name,
                    email: currentAccount.data.email,
                    role: currentAccount.data.role,
                    stories: currentAccount.data.stories
                })
                setIsAuthenticated(true)
                return true
            }
            return false
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(
            localStorage.getItem('user') === '[]',
            localStorage.getItem('user') === null
        ) {
            navigate('/sign-in')
        }
        checkAuthUser()
    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export const useUserContext = () => useContext(AuthContext);