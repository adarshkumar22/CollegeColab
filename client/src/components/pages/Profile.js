import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';

const Profile = () => {

    const { id } = useParams(); // get ID from the URL
    // const [authState, authDispatch] = useAuth();
    // const { isAuthenticated, user } = authState;

    const [user, setUser] = useState(null);
    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: "GET",
        });
        const data = await response.json();
        setUser(data);
        console.log(response)
    };
    // getUser();
    useEffect(() => {
        getUser();
    }, [])

    return (
        
        <div>
            <h1>Profile</h1>
            {
                user && <h4>{user.name}</h4>
            }
            {
                user && <h4>{user.email}</h4>
            }
            
        </div>
    )
}

export default Profile