import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { styles } from "./styles";
import SEIQHRF from "./images/seiqhrf.png";
import SEIQHRFPA from "./images/seiqhrfpa.png";

const Methods = () => {
  const classes = styles();
  return (
    <Container maxWidth="md">
      <Typography variant="h2" className={classes.titleClasses} gutterBottom>
        Methods
      </Typography>

      <Typography variant="h4" gutterBottom>
        Background
      </Typography>

      <Typography variant="body1" gutterBottom>
        We used a stochastic individual contact model for modeling the spread of
        COVID-19.
      </Typography>

      <Typography variant="body1" gutterBottom>
        The basic stochastic individual contact model is referred to SIR,
        containing 3 groups: Susceptible, Infections, and Recovered. Infectious
        people may transmit the disease to susceptible people while they are
        infected, but they eventually recover. The base SIR model is implemented
        in the <Link href="https://www.epimodel.org/"> EpiModel </Link> R
        package.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Transmission is parametrized in an SIR model by an act rate, which
        represents the amount of interactions individuals have with others at
        each timestep, and the transmission probability given that an
        interaction occurs.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Tim Churches extended SIR to SEIQHRF for COVID-19 intervention modeling.
        He open sourced
        <Link href="https://gist.github.com/timchurches/92073d0ea75cfbd387f91f7c6e624bd7">
          his code
        </Link>
        and wrote a
        <Link href="https://timchurches.github.io/blog/posts/2020-03-18-modelling-the-effects-of-public-health-interventions-on-covid-19-transmission-part-2/">
          blog post
        </Link>
        describing the extension. The transition diagram for the SEIQHRF model
        is shown in the image below:
      </Typography>

      <img src={SEIQHRF} className={classes.imageClasses} />

      <Typography variant="body1" gutterBottom>
        The dotted lines represent infection pathways between compartments, and
        the solid lines represent movement from one compartment to the other.
      </Typography>

      <Typography variant="body1" gutterBottom>
        4 components were added to the SIR model:
        <List>
          <ListItem>
            1. E, representing asymptomatic but infections people
          </ListItem>
          <ListItem>
            2. H, representing people requiring hospitalization
          </ListItem>
          <ListItem> 3. F, representing people who have died </ListItem>
          <ListItem>
            4. Q, representing infected people who have self-isolated
          </ListItem>
        </List>
      </Typography>

      <Typography variant="body1" gutterBottom>
        These components allow for the modeling of interventions such as
        lockdowns, physical distancing, and encouragement of self-isolation for
        those who are sick. They also allow for the overwhelming of hospital
        capacity to be taken into account.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Our contributions
      </Typography>

      <Typography variant="body1" gutterBottom>
        We extended the SEIQHRF model to create an SEIQHRFPA model. The
        transition diagram for our model, with our contributions highlighted in
        green, is shown below:
      </Typography>

      <img src={SEIQHRFPA} className={classes.imageClasses} />

      <Typography variant="body1" gutterBottom>
        The two components of our extension are:
        <List>
          <ListItem>
            1. Recovery of asymptomatic but infected people, as it has become
            clear that some people recover without showing symptoms. This is the
            E->R transition.
          </ListItem>
          <ListItem>
            2. Contact tracing through the addition of A and P compartments,
            representing asymptomatic people who are isolated through contact
            tracing and either infected (A) or not infected (P).
          </ListItem>
        </List>
      </Typography>

      <Typography variant="body1" gutterBottom>
        The addition of the first component makes the model more representative
        of how COVID-19 behaves in the real world. We implemented the E->R
        transition to have the same distribution as the E->I transition, as it’s
        estimated approximately 50% of people don’t show symptoms.
      </Typography>

      <Typography variant="body1" gutterBottom>
        The second component allows us to simulate interventions focused on
        contact tracing, isolating those who have come into contact with
        infected people. We implemented it through the isolation of (on average)
        N asymptomatic people for each person infected at each timestep, where N
        is a parameter representing the aggressiveness of contact tracing
        measures. We assumed that people who were isolated through contact
        tracing had a likelihood of being infected slightly higher than the
        baseline probability of transmission when two individuals meet. People
        who are isolated through contact tracing are placed in the P compartment
        if they are not infected, or the A compartment if they are infected.
        There they have lower act rates similar to that of those in the Q
        self-isolation group.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Experiments
      </Typography>

      <Typography variant="body1" gutterBottom>
        We tested the following interventions:
        <List>
          <ListItem>
            1. Increased isolation of infectious people: People comply with
            isolating when they are sick at an increasing rate over time, up to
            a maximum compliance level. We modeled this by increasing the
            transition rate from the I to Q compartment (infectious to
            self-isolated). We varied ramp up speed and maximum compliance
            level.
          </ListItem>
          <ListItem>
            2. Lockdown: A lockdown is enforced for a fixed amount of time,
            decreasing the act rate to a small amount. After the lockdown is
            lifted the act rate goes back up, but not as high as the original
            baseline. We varied starting time, lockdown length, and
            post-lockdown act rate.
          </ListItem>
          <ListItem>
            3. Physical distancing: People gradually interact less with each
            other over time, decreasing the act rate. When they reach the final
            act rate they remain there for the rest of the simulation. We varied
            starting time and final act rate.
          </ListItem>
          <ListItem>
            4. Contact tracing: As described above, contact tracing is modeled
            through the addition of the A and P compartments and accompanying
            transitions. We varied starting time and aggressiveness levels.
          </ListItem>
        </List>
      </Typography>

      <Typography variant="body1" gutterBottom>
        We assume that for the interventions besides increased isolation, the
        increased isolation is also implemented. This is because if measures
        such as lockdowns and contact tracing are being taken by the government,
        it’s likely to be combined with the isolation rate of sick individuals
        increasing substantially.
      </Typography>

      <Typography variant="body1" gutterBottom>
        We also test combining the interventions of physical distancing and
        contact tracing, as the strategy of contact tracing is often accompanied
        by at least moderate distancing.
      </Typography>

      <Typography variant="body1" gutterBottom>
        For each of our simulations, we start with a population of 10,000
        people: 9,996 susceptible and 4 infected. While this is a relatively
        small population, it allows us to test many different interventions and
        interventions have broadly similar effects in large and small
        populations. To reduce variance, we ran 5 simulations for each scenario
        and averaged them.
      </Typography>
    </Container>
  );
};

export default Methods;
