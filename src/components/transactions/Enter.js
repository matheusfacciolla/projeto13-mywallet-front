import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';

function Enter() {
    const { userInformation, att, setAtt, } = useContext(UserContext);
    const [infosEnter, setInfosEnter] = useState({ value: '', description: '' });
    const inputsEnter = handleInputsEnter();
    const navigate = useNavigate();

    const ObjEnter = {
        value: infosEnter.value,
        description: infosEnter.description,
        type: "enter"
    }

    const config = {
        headers: {
            Authorization: `Bearer ${userInformation}`
        }
    }

    console.log("CONFIGGGG2222222222",config)

    const URL = 'http://localhost:5000/transaction';

    function handleEnter(e) {
        e.preventDefault();
        const promise = axios.post(URL, ObjEnter, config);

        promise.then((response) => {
            console.log("ENTROU NA PROMISE", response.data)
            setInfosEnter(response.data);
            setAtt(!att);
            navigate('/transactions');
        });

        promise.catch(error => {
            console.log("!!!!!!!!!!!!??????????",error);
            alert('Deu algum erro...');
        });
    }

    function handleInputsEnter() {
        return (
            <form onSubmit={handleEnter}>
                <input
                    type='text'
                    placeholder='Valor'
                    name='value'
                    value={infosEnter.value}
                    onChange={e => setInfosEnter({ ...infosEnter, value: e.target.value })}
                    disabled={false}
                    required
                />
                <input
                    type='text'
                    placeholder='Descrição'
                    name='description'
                    value={infosEnter.description}
                    onChange={e => setInfosEnter({ ...infosEnter, description: e.target.value })}
                    disabled={false}
                    required
                />
                <button type='submit'>Salvar entrada</button>
            </form>
        );
    }

    return (
        <ContainerContent>
            <Header>
                <h2>Nova entrada</h2>
            </Header>

            <ContainerInputs>
                {inputsEnter}
            </ContainerInputs>
        </ContainerContent>
    );
}

export default Enter;

const ContainerContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const Header = styled.div`
    width: 100%;
    margin-bottom: 40px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #8C11BE;

    h2 {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
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