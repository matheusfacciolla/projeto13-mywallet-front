import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import UserContext from '../contexts/UserContext';
import Login from './Login';
import Register from './Register';
import Transactions from './Transactions';
import GlobalStyle from '../assets/GlobalStyle';

function App() {
    
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    const [userInformation, setUserInformation] = useState(tokenStorage);

    const contextValue = { userInformation, setUserInformation };


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
                        <Route path='/cadastro' element={<Register />} />
                        <Route path='/Hoje' element={<Transactions />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;