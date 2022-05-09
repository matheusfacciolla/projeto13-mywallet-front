import { Link } from 'react-router-dom';

import styled from 'styled-components';

function MenuTransactions() {
    return (
        <ContainerMenu>
            <ContainerEnter>
                <Link to='/transaction/enter' style={{ textDecoration: 'none'}}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova <br/> Entrada</p>
                </Link>
            </ContainerEnter>
            <ContainerExit>
                <Link to='/transaction/exit' style={{ textDecoration: 'none'}}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova <br/> Saída</p>
                </Link>
            </ContainerExit>
        </ContainerMenu>
    );
}

export default MenuTransactions;

const ContainerMenu = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 13px;
    p {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
        text-decoration: none;
    }
`;

const ContainerEnter = styled.div `
    width: 155px;
    height: 114px;
    left: 25px;
    top: 537px;
    background: #A328D6;
    border-radius: 5px;

    ion-icon{
        position:absolute;
        font-size:23.88px;
        color:white;
        margin-top: 8.56px;
        margin-left: 9.56px;
        cursor:pointer;
    }

    p{
        font-weight: 700;
        font-size: 17px;
        color: #FFFFFF;
        margin-left:9.56px;
        margin-top:70px;
    }
`;

const ContainerExit = styled.div `
    width: 156px;
    height: 114px;
    left: 195px;
    top: 537px;
    background: #A328D6;
    border-radius: 5px;

    ion-icon{
        position:absolute;
        font-size:23.88px;
        color:white;
        margin-top: 8.56px;
        margin-left: 9.56px;
        cursor:pointer;
    }

    p{
        font-weight: 700;
        font-size: 17px;
        color: #FFFFFF;
        margin-left:9.56px;
        margin-top:70px;
    }
`;