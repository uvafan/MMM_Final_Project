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
import lock1 from "./images/lock1.png";
import lock2 from "./images/lock2.png";
import lock3 from "./images/lock3.png";
import lock4 from "./images/lock4.png";
import phys1 from "./images/phys1.png";
import phys2 from "./images/phys2.png";
import phys3 from "./images/phys3.png";
import phys4 from "./images/phys4.png";
import phys5 from "./images/phys5.png";
import phys6 from "./images/phys6.png";
import trace1 from "./images/trace1.png";
import trace2 from "./images/trace2.png";
import trace3 from "./images/trace3.png";
import comb1 from "./images/comb1.png";
import comb2 from "./images/comb2.png";
import comb3 from "./images/comb3.png";

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

      <div className={classes.imageContainerClasses}>
        <img src={baseline} className={classes.imageClasses} />
      </div>

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

      <div className={classes.imageContainerClasses}>
        <img src={isol1} className={classes.imageGridClasses} />
        <img src={isol2} className={classes.imageGridClasses} />
      </div>

      <Typography variant="body1" gutterBottom>
        We modeled the ramping up to a transition rate of ⅔ per day more slowly,
        taking until day 30 to reach the maximum transition rate. However, there
        wasn’t a significant difference in the number of deaths.
      </Typography>

      <div className={classes.imageContainerClasses}>
        <img src={isol3} className={classes.imageClasses} />
      </div>

      <Typography variant="body1" gutterBottom>
        All subsequent interventions include isolation of symptomatic infected
        people up to ⅓ by day 15 because we assumed that if further steps are
        being taken, awareness will be high enough that infected people will
        isolate at a higher rate than usual.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Lockdown
      </Typography>

      <Typography variant="body1" gutterBottom>
        Lockdowns were simulated by severely lowering the number of interactions for a set number of days, and then returning to a level between the baseline and the lockdown rate.  Lockdowns need to be long enough to lower the number of those infected to a low number before physical distancing becomes effective.
      </Typography>
      <div className={classes.imageContainerClasses}>
        <img src={lock1} className={classes.imageGridClasses} />
        <img src={lock2} className={classes.imageGridClasses} />
        <img src={lock3} className={classes.imageGridClasses} />
      </div>

      <Typography variant="body1" gutterBottom>
        The length of the lockdown does not significantly influence the number of deaths as long as it is sufficiently long to reduce the number of cases down to a small number. However, if physical distancing is not followed sufficiently well after the lockdown, the number of cases will spike again.
      </Typography>

      <div className={classes.imageContainerClasses}>
        <img src={lock4} className={classes.imageClasses} />
      </div>

      <Typography variant="h4" gutterBottom>
        Physical Distancing
      </Typography>

      <Typography variant="body1" gutterBottom>
        Physical distancing was modeled by gradually reducing the number of interactions down to a set amount, then remaining there for the rest of the simulation. We found that beginning physical distancing early (while the number infected was low) reduced the number of deaths significantly, but it was significantly less effective once the infections were already skyrocketing. However, even when suppression was impossible, stronger physical distancing allowed herd immunity to be achieved with a lower percentage of the population infected.
      </Typography>
      
      <div className={classes.imageContainerClasses}>
        <img src={phys3} className={classes.imageGridClasses} />
        <img src={phys2} className={classes.imageGridClasses} />
        <img src={phys1} className={classes.imageGridClasses} />
        <img src={phys4} className={classes.imageGridClasses} />
        <img src={phys5} className={classes.imageGridClasses} />
        <img src={phys6} className={classes.imageGridClasses} />
      </div>

      <Typography variant="h4" gutterBottom>
        Contact Tracing
      </Typography>

      <Typography variant="body1" gutterBottom>
        We modeled contact tracing by having each new symptomatic case cause a certain number of asymptomatic people to go into quarantine. We find that early aggressive contract tracing is the most effective at reducing total deaths. Isolated susceptible cases were omitted from the graphs to better visualize the other curves.
      </Typography>

      <div className={classes.imageContainerClasses}>
        <img src={trace1} className={classes.imageGridClasses} />
        <img src={trace2} className={classes.imageGridClasses} />
      </div>

      <Typography variant="body1" gutterBottom>
        With the same level of aggressiveness of enforcing contact tracing, delaying the start of contract tracing to day 35 almost doubles the number of deaths compared to starting contact tracing on day 5. 
      </Typography>

      <div className={classes.imageContainerClasses}>
        <img src={trace3} className={classes.imageClasses} />
      </div>

      <Typography variant="h4" gutterBottom>
        Contact Tracing + Physical Distancing
      </Typography>

      <Typography variant="body1" gutterBottom>
        With the best physical distancing and contact tracing situations, the number of infected and the number of death cases are significantly lower, compared to only using the best contact tracing intervention. Similarly, the number of infected and the number of death cases are lower compared to only using the best physical distancing intervention.  These two interventions work well together to reduce the number of deaths by approximately half compared to just one of the two being applied.
      </Typography>
      <div className={classes.imageContainerClasses}>
        <img src={comb1} className={classes.imageGridClasses} />
        <img src={comb2} className={classes.imageGridClasses} />
        <img src={comb3} className={classes.imageGridClasses} />
      </div>
    </Container>
  );
};

export default Results;
