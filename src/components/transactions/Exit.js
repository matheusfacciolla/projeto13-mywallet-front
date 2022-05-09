import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

//import UserContext from '../contexts/UserContext';

function Exit() {
    //const { setUserInformation } = useContext(UserContext);
    const [infosExit, setInfosExit] = useState({ value: '', description: '' });
    const inputsExit = handleInputsExit();
    const navigate = useNavigate();

    const ObjExit = {
        value: infosExit.value,
        description: infosExit.description
    }

    const URL = 'http://localhost:3000/transacoes';

    function handleExit(e) {
        e.preventDefault();
        const promise = axios.post(URL, ObjExit);

        promise.then((response) => {
            setInfosExit(response.data);
            navigate('/transacoes');
        });

        promise.catch(error => {
            alert('Deu algum erro...');
        });
    }

    function handleInputsExit() {
        return (
            <form onSubmit={handleExit}>
                <input
                    placeholder='Valor'
                    name='value'
                    value={infosExit.value}
                    onChange={e => setInfosExit({ ...infosExit, value: e.target.value })}
                    disabled={false}
                    required
                />
                <input
                    placeholder='Descrição'
                    name='description'
                    value={infosExit.description}
                    onChange={e => setInfosExit({ ...infosExit, description: e.target.value })}
                    disabled={false}
                    required
                />
                <button type='submit'>Salvar saída</button>
            </form>
        );
    }

    return (
        <ContainerContent>
            <Header>
                <h2>Nova saída</h2>
            </Header>

            <ContainerInputs>
                {inputsExit}
            </ContainerInputs>
        </ContainerContent>
    );
}

export default Exit;

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