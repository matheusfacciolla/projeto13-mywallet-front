import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import MenuTransactions from './MenuTransactions';

function Transactions() {

    const [transactions, setTransactions ] = useState([]);

    const { userInformation, setUserInformation, userName } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation}`
            }
        }
        const URL = 'http://localhost:5000/transaction';
        const promise = axios.get(URL, config);

        promise.then((response) => {
            setTransactions(response.data);
        });
        promise.catch(error => {
            console.log(error);
            alert("Deu algum erro...");
        });
    }, []);

    function logOut() {
        if (window.confirm("Você deseja se deslogar?")) {
            window.localStorage.removeItem('user');
            window.localStorage.clear('user');
            setUserInformation(null);
            navigate("/");
        }
    }

    function Total() {      
        const colorEnter = '#03AC00';
        const colorExit = '#C70000';

        let totalValue = 0;
        transactions.forEach((transaction) => {
            transaction.type === 'enter' ?
                totalValue += parseInt(transaction.value)
                :
                totalValue -= parseInt(transaction.value)
        });

        return (
            <Footer color={totalValue >= 0 ? colorEnter : colorExit}>
                <p>SALDO:</p>
                <p>{totalValue}</p>
            </Footer>
        );
    }

    return (
        <ContainerContent>
            <Header>
                <h2>{`Olá, ${userName}`}</h2>
                <ion-icon name="exit-outline" onClick={() => { logOut() }}></ion-icon>
            </Header>
            <ContainerMain>
                {
                    transactions.length > 0 ?
                        <>
                            {transactions.map(transaction => <UserTransactions info={transaction} key={transactions.id} />)}
                        </>
                        :
                        <ContainerEmpty>
                            <p>Não há registros de <br /> entrada ou saída</p>
                        </ContainerEmpty>
                }
            </ContainerMain>
            <Footer>
                <Total />
            </Footer>
            <MenuTransactions />
        </ContainerContent>
    );
}

function UserTransactions(props) {

    const { info } = props
    const colorEnter = '#03AC00';
    const colorExit = '#C70000';

    return (
        <ContainerTransactions color={info.type === "enter" ? colorEnter : colorExit}>
            <p>{info.date}</p>
            <p>{info.description}</p>
            <p >{info.value}</p>
        </ContainerTransactions>
    );
}

export default Transactions;

const ContainerContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;

    ion-icon{
        font-size:30px;
        color:white;
        margin-top: 8.56px;
        margin-left: 9.56px;
        cursor:pointer;
    }
`;

const ContainerMain = styled.div`
    width: 326px;
    height: 420px;
    overflow-y: scroll;
    background: #FFFFFF;
    border-radius: 5px 5px 0px 0px;
`;

const ContainerEmpty = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    align-items: center;
    color: #868686;
    margin-top: 200px;
`;

const ContainerTransactions = styled.div`
    display: flex;
    line-height: 23px;
    margin-top: 23px;

    p:first-child {
        margin-left: 13px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #C6C6C6;
    }

    p:nth-child(2) {
        margin-left: 10px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
    }

    p:last-child {
        margin-left: auto;
        margin-right: 13px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: ${props => props.color};
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 326px;
    height: 40px;
    background-color: white;
    border-radius: 0 0 5px 5px;

    p {
        margin-left: 13px;
        margin-right: 13px;
        margin-top: 13px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        
    }

    p:last-child {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: ${props => props.color};
    }
`;