import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import MenuTransactions from './MenuTransactions';

function Transactions() {

    const [transactions, setTransactions, att] = useState([]);

    const { userInformation, setUserInformation, userName } = useContext(UserContext);
    console.log("INFOOO", userInformation)
    const totalValue = total();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("INFOOO2222222222222", userInformation)
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation}`
            }
        }
        console.log("CONFIGGGG1111111", config)

        const URL = 'http://localhost:5000/transaction';

        const promise = axios.get(URL, config);

        promise.then((response) => {
            console.log("data -> transações", response.data)
            setTransactions(response.data);
        });
        promise.catch(error => {
            console.log(error);
            alert("Deu algum erro...");
        });
    }, [att]);

    function logOut() {
        if (window.confirm("Você deseja se deslogar?")) {
            window.localStorage.removeItem('user');
            window.localStorage.clear('user');
            setUserInformation(null);
            navigate("/");
        }
    }

    function total() {
        console.log("TAL DAS TRANSAÇÕES", transactions)
        let total = 0;
        transactions.forEach((transaction) => {
            transaction.type === 'enter' ?
                total += transaction.value
                :
                total -= transaction.value
        });
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
                <p>{totalValue}</p>
            </Footer>
            <MenuTransactions />
        </ContainerContent>
    );
}

function UserTransactions(props) {

    const { info } = props
    const colorEnter = '#03AC00';
    const colorExit = '#C70000';
    console.log("FALA DELE", info.type)

    return (
        <ContainerTransactions>
            <p>{info.date}</p>
            <p>{info.description}</p>
            <p color={info.type == "enter" ? colorEnter : colorExit} >{info.value}</p>
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
    display: flex;
    flex-direction: column;
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
`;

const ContainerEmpty = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
`;

const ContainerTransactions = styled.div`
    display: flex;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    margin-top: 23px;
    color: #868686;

    p {
        margin-left: 10px;
    }

    p:first-child {
        margin-left: 13px;
    }

    p:last-child {
        margin-left: auto;
        margin-right: 13px;
        color: ${props => props.color};
    }
`;

const Footer = styled.div`
    margin-right: 0;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #868686;
`;