import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';

function Register() {

    const [infosRegister, setInfosRegister] = useState({  name: "", email: "", password: "", confirmedPassword: "", });

    const inputsRegister = handleInputsRegister();
    const navigate = useNavigate();

    const ObjRegister = {
        name: infosRegister.name,
        email: infosRegister.email,
        password: infosRegister.password,
        confirmedPassword: infosRegister.confirmedPassword
    }

    const URL = 'http://localhost:5000/sign-up';

    function handleRegister(e) {
        e.preventDefault();
        const promise = axios.post(URL, ObjRegister);

        promise.then((response) => {
            setInfosRegister(response.data);
            navigate('/');
        });

        promise.catch(error => {
            console.log(error);
            alert("Deu algum erro...");
        });
    }

    function handleInputsRegister() {
        return (
            <form onSubmit={handleRegister}>
                <input
                    type='text'
                    placeholder='nome'
                    name='name'
                    value={infosRegister.name}
                    onChange={e => setInfosRegister({ ...infosRegister, name: e.target.value })}
                    disabled={false}
                    required
                />
                <input
                    type='email'
                    placeholder='email'
                    name='email'
                    value={infosRegister.email}
                    onChange={e => setInfosRegister({ ...infosRegister, email: e.target.value })}
                    disabled={false}
                    required
                />
                <input
                    type='text'
                    placeholder='senha'
                    name='password'
                    value={infosRegister.password}
                    onChange={e => setInfosRegister({ ...infosRegister, password: e.target.value })}
                    disabled={false}
                    required
                />
                <input
                    type='text'
                    placeholder='Confirme a senha'
                    name='confirmedPassword'
                    value={infosRegister.confirmedPassword}
                    onChange={e => setInfosRegister({ ...infosRegister, confirmedPassword: e.target.value })}
                    disabled={false}
                    required
                />
                <div>
                    <button type='submit'>Cadastrar</button>
                </div>
            </form>
        );
    }

    return (
        <ContainerContent>
            <ContainerLogo>
                <h1>MyWallet</h1>
            </ContainerLogo>

            <ContainerInputs>
                {inputsRegister}
            </ContainerInputs>

            <Link to='/'>
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
        </ContainerContent>
    );
}

export default Register;

const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    width: 100%;
    height: 100%;
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