import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';

const Credits = () => {
    const classes = styles();
    return (
    <Container maxWidth="md">
      <Typography variant="h2" className={classes.titleClasses}>
        Credits
      </Typography>
    </Container>
  );
}

export default Credits;