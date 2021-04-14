import React from 'react'
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from 'react-bootstrap'
export default function TopNavabar({ username }) {
    const { signout } = useAuth();
    const history = useHistory();
    const handleSignOut = async () => {
        await signout();
        history.push("/signin");
    }
    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand href="/">Group 4</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Hello, { username }
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
