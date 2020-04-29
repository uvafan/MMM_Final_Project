import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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

      <Typography variant="body1" gutterBottom>
      We used a stochastic individual contact model for modeling the spread of COVID-19. 
      </Typography>

      <Typography variant="body1" gutterBottom>
      The basic stochastic individual contact model is referred to SIR, containing 3 groups: Susceptible, Infections, and Recovered. Infectious people may transmit the disease to susceptible people while they are infected, but they eventually recover. The base SIR model is implemented in the <Link href = "https://www.epimodel.org/"> EpiModel </Link> R package.

      </Typography>

      <Typography variant="body1" gutterBottom>
      Transmission is parametrized in an SIR model by an act rate, which represents the amount of interactions individuals have with others at each timestep, and the transmission probability given that an interaction occurs.
      </Typography>

      <Typography variant="body1" gutterBottom>
      Tim Churches extended SIR to SEIQHRF for COVID-19 intervention modeling. He open sourced <Link href="https://gist.github.com/timchurches/92073d0ea75cfbd387f91f7c6e624bd7"> his code </Link> and wrote a <Link href = "https://timchurches.github.io/blog/posts/2020-03-18-modelling-the-effects-of-public-health-interventions-on-covid-19-transmission-part-2/"> blog post </Link> describing the extension. The transition diagram for the SEIQHRF model is shown in the image below:
      </Typography>

      <img src={SEIQHRF} />

      <Typography variant="body1" gutterBottom>
      The dotted lines represent infection pathways between compartments, and the solid lines represent movement from one compartment to the other.
      </Typography>

      <Typography variant="body1" gutterBottom>
        4 components were added to the SIR model:
        <List>
        <ListItem> E, representing asymptomatic but infections people </ListItem>
        <ListItem> H, representing people requiring hospitalization </ListItem>
        <ListItem> F, representing people who have died </ListItem>
        <ListItem> Q, representing infected people who have self-isolated </ListItem>
        </List>
      </Typography>

      <Typography variant="body1" gutterBottom>
        These components allow for the modeling of interventions such as lockdowns, physical distancing, and encouragement of self-isolation for those who are sick. They also allow for the overwhelming of hospital capacity to be taken into account.
      </Typography>

      

      <img src={SEIQHRFPA} />
    </Container>
  );
}

export default Methods;
