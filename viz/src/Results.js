import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { styles } from "./styles";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import baseline from "./images/baseline.png";
import isol1 from "./images/isolation_.3_15.png";
import isol2 from "./images/isolation_.6_15.png";
import isol3 from "./images/isolation_.6_30.png";

const Results = () => {
  const classes = styles();
  return (
    <Container maxWidth="md">
      <Typography variant="h2" className={classes.titleClasses} gutterBottom>
        Results
      </Typography>

      <Typography variant="h4" gutterBottom>
        Baseline
      </Typography>

      <Typography variant="body1" gutterBottom>
        The baseline simulation has a 1.4% death rate (143.2 deaths for a
        population of 10,000). There are no major interventions involved in the
        baseline simulation but a small percentage self isolate anyway when
        sick. We filter out the number of susceptible and recovered individuals
        to get a closer look at the curves.
      </Typography>

      <img src={baseline} className={classes.imageClasses} />

      <Typography variant="h4" gutterBottom>
        Isolation of infected
      </Typography>

      <Typography variant="body1" gutterBottom>
        We begin by modeling the isolation of infected individuals showing
        symptoms with increasing daily compliance and plateauing 15 days after
        the introduction of COVID-19. We modeled isolation by increasing the
        transition rate of symptomatic cases to isolation with a maximum
        transition rate per day of ⅓ and ⅔ of those infected. The results show
        that a ⅔ transition rate cut the number of deaths by about a third and
        flattened all of the curves.
      </Typography>

      <img src={isol1} className={classes.imageClasses} />
      <img src={isol2} className={classes.imageClasses} />

      <Typography variant="body1" gutterBottom>
        We modeled the ramping up to a transition rate of ⅔ per day more slowly,
        taking until day 30 to reach the maximum transition rate. However, there
        wasn’t a significant difference in the number of deaths.
      </Typography>

      <img src={isol3} className={classes.imageClasses} />

      <Typography variant="body1" gutterBottom>
        All subsequent interventions include isolation of symptomatic infected
        people up to ⅓ by day 15 because we assumed that if further steps are
        being taken, awareness will be high enough that infected people will
        isolate at a higher rate than usual.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Lockdown
      </Typography>
    </Container>
  );
};

export default Results;
