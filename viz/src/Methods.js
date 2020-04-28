import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';
import SEIQHRF from './images/seiqhrf.png';
import SEIQHRFPA from './images/seiqhrfpa.png';

const Methods = () => {
    const classes = styles();
    return (
    <Container maxWidth="md">
      <Typography variant="h2" className={classes.titleClasses}>
        Methods
      </Typography>
      <img src={SEIQHRF} />
      <img src={SEIQHRFPA} />
    </Container>
  );
}

export default Methods;
