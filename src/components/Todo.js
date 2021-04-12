import React, { useEffect, useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { firestore } from '../config/firebase';

export default function Todo() {
    const { signout, currentUser } = useAuth();
    const [firstName, setFistName] = useState('');
    const [lastName, setLastName] = useState('');
    const history = useHistory();
    const handleSignOut = async () => {
        await signout();
        history.push("/signin");
    }

    useEffect(() => {
        firestore.collection('users').doc(currentUser.uid).get()
            .then((data) => {
                setFistName(data.data().firstName);
                setLastName(data.data().lastName);
            })
    }, [currentUser.uid])

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand href="/">Group 4</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Hello, {firstName + ' ' + lastName}
                    </Navbar.Text>
                    <Navbar.Text
                        style={{ marginLeft: 50, cursor: 'pointer' }}
                        onClick={handleSignOut}
                    >Sign Out</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
