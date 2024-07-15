import { Typography, Container } from '@mui/material/';
import {css} from "@emotion/react"; 

const Footer = () => {
  return (
    <footer css={cajaPadre}>
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
             
        </Typography>
        <Typography variant="body2" color="#084b8f" align="center">
             © {new Date().getFullYear()} fiszDev
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;

const cajaPadre = css`
     padding: theme.spacing(2);
     margin-top: 'auto';
     background-color: '#f0f0f0';
     color: #084b8f;
`;