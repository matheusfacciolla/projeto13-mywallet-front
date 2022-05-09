import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../../contexts/UserContext';
import MenuTransactions from './MenuTransactions';

function Transactions() {

    const [transactions, setTransactions] = useState([]);

    const { userInformation } = useContext(UserContext);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInformation.token}`
            }
        }

        const URL = 'https://http://localhost:3000/';

        const promise = axios.get(URL, config);

        promise.then((response) => {
            setTransactions(response.data);
        });
        promise.catch(error => {
            alert("Deu algum erro no cadastro...");
        });
    }, []);

    return (
        <ContainerContent>
            <Header>
                <h2>Olá Fulano</h2>
                <ion-icon name="exit-outline"></ion-icon>
            </Header>
            <ContainerTransactions>
                {
                    transactions.length > 0 ?
                        <>
                            {transactions.map(transaction => <UserTransactions info={transaction} key={transactions.id} />)}
                        </>
                        :
                        <ContainerEmpty>
                            <p>Não há registros de <br/> entrada ou saída</p>
                        </ContainerEmpty>
                }
            </ContainerTransactions>
            <MenuTransactions />
        </ContainerContent>
    );
}

function UserTransactions(props) {

    const { info } = props
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

const ContainerTransactions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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