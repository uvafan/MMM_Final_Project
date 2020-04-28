import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';

const Introduction = () => {
    const classes = styles();
    return (
    <Container maxWidth="md">
      <Typography variant="h2" className={classes.titleClasses}>
        COVIM because we KARE

COVID-19 Visualization and Intervention Modeling
By Kiara, Aaron, Rashid, Eli
      </Typography>
      <Box pt={2} />
      <Typography variant="body1">
        The COVID-19 pandemic poses a serious health risk to people all over the world. Many countries are currently imposing public health interventions that include stay-at-home orders, social distancing measures, or contact tracing. These efforts help to reduce the load on hospital systems and the total number of deaths. Our model can be used to illustrate why these public health interventions have been employed, and show the consequences of returning to normal too quickly. Furthermore, our model can help predict when it is safe to ease public health measures, and whether it is necessary to impose more severe ones. Beyond COVID-19, our model may be helpful for modeling when interventions should first be put into place for future pandemics.
      </Typography>
      <Box pt={2} />

    </Container>
  );
}

export default Introduction;
