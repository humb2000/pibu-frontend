import React from 'react';
import {Button} from "@mui/material";
import { styled } from '@mui/system';


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

export const LoginButton = styled(Button)`
    background-color: white;
    color: black;
    width: 15rem;
    font-size: 1.1rem;
    margin-right: 1rem;
    &:hover {
        background-color: green;
    }
`;

