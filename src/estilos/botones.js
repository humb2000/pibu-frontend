import {Button} from "@mui/material";
import {styled} from "@mui/material";


export const PropertyButton = styled(Button)`
    background-color: green;
    color: white;
    width: 15rem;
    font-size: 1.1rem;
    margin-right: 1rem;
    &:hover {
        background-color: #03a9f4;
    }
`;

export const  LoginButton = styled(Button)`
    background-color: white;
    color: black;
    width: 15rem;
    font-size: 1.1rem;
    margin-right: 1rem;
    &:hover {
        background-color: green;
    }
`;

export const HomeButton = styled(Button)`
    font-size: 3rem;
    background-color: green;
    border-radius: 15px;
    margin-top: 2rem;
    box-shadow: 3px 3px 3px black;
`;

export const LogInUpButton = styled(Button)`
    background-color: green;
    color: white;
    font-size: 1.1rem;
    margin-left: 1rem;
    &:hover {
        background-color: #03a9f4;
    }
`;
