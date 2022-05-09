import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';

function Login() {
    const { setUserInformation, setUserName } = useContext(UserContext);
    const [infosLogin, setInfosLogin] = useState({ email: '', password: '' });
    const inputsLogin = handleInputsLogin();
    const navigate = useNavigate();

    const ObjLogin = {
        email: infosLogin.email,
        password: infosLogin.password
    }
    console.log("OBJ??", ObjLogin)

    const URL = 'http://localhost:5000/';

    function handleLogin(e) {
        e.preventDefault();
        const promise = axios.post(URL, ObjLogin);

        promise.then((response) => {
            console.log("ENTROU?????????????????????")
            setUserInformation(response.data.token);
            setUserName(response.data.name)
            console.log("SETINFORMATION", response.data)
            const user = JSON.stringify(response.data.token)
            localStorage.setItem('token', user);
            navigate('/transaction');
        });

        promise.catch(error => {
            console.log(error);
            alert('Usuário ou senha incorretos...1111');
        });
    }

    function handleInputsLogin() {
        return (
            <form onSubmit={handleLogin}>
                <input
                    type='email'
                    placeholder='email'
                    name='email'
                    value={infosLogin.email}
                    onChange={e => setInfosLogin({ ...infosLogin, email: e.target.value })}
                    disabled={false}
                    required
                />
                <input
                    type='password'
                    placeholder='senha'
                    name='password'
                    value={infosLogin.senha}
                    onChange={e => setInfosLogin({ ...infosLogin, password: e.target.value })}
                    disabled={false}
                    required
                />
                <button type='submit'>Entrar</button>
            </form>
        );
    }

    return (
        <ContainerContent>
            <ContainerLogo>
                <h1>MyWallet</h1>
            </ContainerLogo>

            <ContainerInputs>
                {inputsLogin}
            </ContainerInputs>

            <Link to='/sign-up'>
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </ContainerContent>
    );
}

export default Login;

const ContainerContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 180px;
    background: #8C11BE;

    p {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;
        text-align: center;
        text-decoration-line: underline;
    }
`;

const ContainerLogo = styled.div`
    h1 {
        width: 147px;
        height: 50px;
        font-family: 'Saira Stencil One';
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
        text-align: center;
        margin-bottom: 24px;
    }
`;

const ContainerInputs = styled.div`
    input {
        width: 326px;
        height: 58px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 13px;
        display: flex;
        flex-direction: column;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
        padding-left: 14px;
        box-shadow: 0 0 0 0;
        outline: 0;
    }

    input::placeholder {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
    }

    button {
        width: 326px;
        height: 46px;
        background: #A328D6;
        border-radius: 5px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        border: none;
        color: #FFFFFF;
        margin-bottom: 25px;
        cursor: pointer;
    }
`;