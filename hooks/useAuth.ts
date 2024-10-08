import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';


interface User {
    id:number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
  }
  

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {

    const [user, setUser] = useState< User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [token,setToken] = useState('')
    
    const isWindow =  typeof window !== 'undefined'

    useEffect(()=>{
      if (isWindow) {
        const userFromLocalStorage = window.localStorage.getItem("userData") 
        userFromLocalStorage && setToken(JSON.parse(userFromLocalStorage)?.token)
      }
    },[isWindow])
  
    useEffect(()=> {

        if (isWindow) {
            const userFromLocalStorage = window.localStorage.getItem("userData")
            userFromLocalStorage && setUser(JSON.parse(userFromLocalStorage)?.user);
        }

    },[isWindow]);
  
    const login = async (credentials: {email: string; password: string}) => {

        try {
            const response = await axios.post('/api/auth/login', credentials);
            const token = response?.data?.token;
            const userData = response?.data?.data;

            localStorage.setItem('token', token);

            // localStorage.setItem('userData', JSON.stringify('userData', JSON.stringify(userData)));

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            setUser(userData);

        } 
        catch (err) {
            if (err) {
                console.log(err)
            }
        }

    };

    const logout =()=> {
        localStorage.removeItem('token');
        localStorage.removeItem('userData')
        axios.defaults.headers.common['Authorization'] = '';   
        setUser(null);
    }    

    return {user , loading , error, isWindow, login, logout, token};
};

export default useAuth;


