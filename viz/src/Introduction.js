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
        Introduction
      </Typography>
      <Box pt={2} />
      <Typography variant="body1">
        The COVID-19 pandemic poses a serious health risk to people all over the world. While older adults tend to have more severe symptoms and higher death rates, the complete effects of infection with COVID-19 are still unknown. We will model several mitigation and suppression strategies and compare their effectiveness. By modeling the effects of different interventions, we hope to make helpful visualizations of intervention effects that can be used to inform policy recommendations for how to best respond to COVID-19. Though most major countries have taken some interventions already, our models will be able to help predict when it is safe to ease public health measures, and whether it is necessary to impose more severe ones. Additionally, the models may be helpful for modeling when interventions should first be put into place for future epidemics.
      </Typography>
      <Box pt={2} />
      <Typography variant="body1">
        The COVID-19 pandemic poses a serious health risk to people all over the world. While older adults tend to have more severe symptoms and higher death rates, the complete effects of infection with COVID-19 are still unknown. We will model several mitigation and suppression strategies and compare their effectiveness. By modeling the effects of different interventions, we hope to make helpful visualizations of intervention effects that can be used to inform policy recommendations for how to best respond to COVID-19. Though most major countries have taken some interventions already, our models will be able to help predict when it is safe to ease public health measures, and whether it is necessary to impose more severe ones. Additionally, the models may be helpful for modeling when interventions should first be put into place for future epidemics.
      </Typography>
    </Container>
  );
}

export default Introduction;
