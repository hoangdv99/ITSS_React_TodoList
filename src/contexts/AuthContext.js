import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function signin(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }
    function signout(){
        return auth.signOut();
    }

    useEffect(() => {
        const unsubcriber = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);    
        });
        return unsubcriber;
    }, []);

    const value = {
        currentUser,
        signup,
        signin,
        signout,
    }
    return (
        <AuthContext.Provider value={value}>
            { !loading && children}
        </AuthContext.Provider>
    )
}