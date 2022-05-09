import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import UserContext from '../contexts/UserContext';
import Login from './Login';
import Register from './Register';
import Transactions from './transactions/Transactions';
import NewTransaction from './transactions/NewTransaction'
import GlobalStyle from '../assets/GlobalStyle';

function App() {
    
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    const [userInformation, setUserInformation] = useState(tokenStorage);
    const [userName, setUserName] = useState("");

    const contextValue = { userInformation, setUserInformation, userName, setUserName };


    useEffect(() => {
        if (tokenStorage) {
            setUserInformation(tokenStorage);
        }
    }, []);

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={contextValue}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/sign-up' element={<Register />} />
                        <Route path='/transaction' element={<Transactions />} />
                        <Route path='/transaction/:type' element={<NewTransaction />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;