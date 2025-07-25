import {Card, CardMedia, CardContent} from "@mui/material";
import { styled } from '@mui/system';

export const CardStyle = styled(Card)`
    margin: 0.5rem;
    border: 1px solid black;
    position: relative;
`;

export const CardMediaImagenStyle = styled(CardMedia)`
    padding-left: 1rem;
    padding-right: 1rem;
    height: 20rem;
    width: 30rem;
    cursor: pointer;
`;

export const TypographyPrice = styled(CardMedia)`
    position: absolute;
    background: green;
    z-index: 1000;
    color: white;
    top: 100px;
    left: 20px;
    padding: 5px;
`;

export const CardContentAgencia = styled(CardContent)`
    max-height: 10rem;
    min-height: 10rem;
`;
