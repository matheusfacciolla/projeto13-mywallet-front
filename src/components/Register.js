import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';

function Register() {

    const [infosRegister, setInfosRegister] = useState({ email: "", name: "", image: "", password: "" });

    const inputsRegister = handleInputsRegister();
    const navigate = useNavigate();

    const ObjRegister = {
        email: infosRegister.email,
        name: infosRegister.name,
        image: infosRegister.image,
        password: infosRegister.password
    }

    const URL = 'https://http://localhost:3000/';

    function handleRegister(e) {
        e.preventDefault();
        const promise = axios.post(URL, ObjRegister);

        promise.then((response) => {
            setInfosRegister(response.data);
            navigate('/');
        });

        promise.catch(error => {
            alert("Deu algum erro...");
        });
    }

    function handleInputsRegister() {
        return (
            <form onSubmit={handleRegister}>
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
                    placeholder='nome'
                    name='name'
                    value={infosRegister.name}
                    onChange={e => setInfosRegister({ ...infosRegister, name: e.target.value })}
                    disabled={false}
                    required
                />
                <input
                    type="url"
                    placeholder='foto'
                    name='image'
                    value={infosRegister.image}
                    onChange={e => setInfosRegister({ ...infosRegister, image: e.target.value })}
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
    width: 100vw;
    height: 100vh;
    background-color: white;
`;

const ContainerLogo = styled.div`
    h1 {
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        text-align: center;
        color: #126BA5;
        margin-bottom: 33px;
    }
`;

const ContainerInputs = styled.div`
    input {
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;
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
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
    }
    button {
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        border: none;
        color: #FFFFFF;
        margin-bottom: 25px;
    }
    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`;