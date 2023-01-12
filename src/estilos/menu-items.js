import {styled} from "@mui/material";
import {MenuItem} from "@mui/material";

export const MenuItemStyle1 = styled(MenuItem)`
    width: 15rem;
    border-radius: 15px;
    border: 1px solid white;
    &:hover {
        border: 1px solid green;
        background: rgba(0, 128, 0, 0.51);
    }
`;

export const MenuItemStyle2 = styled(MenuItem)`
    width: 15rem;
    border-radius: 15px;
    border: 1px solid white;
    &:hover {
        border: 1px solid red;
        background: rgba(255, 0, 0, 0.51);
    }
`;