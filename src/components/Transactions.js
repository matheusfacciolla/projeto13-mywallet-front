import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';
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
            {transactions.map(transaction => <UserTransactions info={transaction} key={transactions.id} />)}
            <MenuTransactions />
        </ContainerContent>
    );
}

function UserTransactions(props) {

    const { info } = props

    return (
        <ContainerTransactions>
        </ContainerTransactions>
    );
}

export default Transactions;

const ContainerContent = styled.div`
    width: 100%;
    height: 100%;
    background-color: #E5E5E5;
    margin-bottom: 90px;
`;

const ContainerTransactions = styled.div`
    width: 100%;
    height: 100%;
    background-color: #E5E5E5;
`;