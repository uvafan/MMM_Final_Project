import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { styles } from "./styles";

const Credits = () => {
  const classes = styles();
  return (
    <Container maxWidth="md">
      <Typography variant="h2" className={classes.titleClasses} gutterBottom>
        Credits
      </Typography>
      <Typography variant="body1">
        Tim Churches for his previous work on extending the SIR individual
        contact model:
      </Typography>
      <List>
        <ListItem>
          <Link href="https://timchurches.github.io/blog/posts/2020-03-10-modelling-the-effects-of-public-health-interventions-on-covid-19-transmission-part-1/">
            Blog post 1
          </Link>
        </ListItem>
        <ListItem>
          <Link href=" https://timchurches.github.io/blog/posts/2020-03-18-modelling-the-effects-of-public-health-interventions-on-covid-19-transmission-part-2/">
            Blog post 2
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://gist.github.com/timchurches/92073d0ea75cfbd387f91f7c6e624bd7#file-_icm-mod-status-seiqhrf-r-L692">
            SEIQHRF Model Code
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://gist.github.com/timchurches/ce8858ae1e572153a54271bd52deb9c3">
            Notebook running SEIQHRF Model
          </Link>
        </ListItem>
      </List>
      <Typography variant="body1" gutterBottom>
        <Link href="https://www.epimodel.org/"> EpiModel </Link> for providing
        their tools for simulating mathematical models of infectious disease
        dynamics in an R package and providing tutorials on their website.
      </Typography>
      <Typography variant="body1" >
        For estimating several parameters of our model:
      </Typography>
      <List>
        <ListItem>
          <Link href="https://data.worldbank.org/indicator/SH.MED.BEDS.ZS">
            World Bank hospital bed estimates
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRwAqp96T9sYYq2-i7Tj0pvTf6XVHjDSMIKBdZHXiCGGdNC0ypEU9NbngS8mxea55JuCFuua1MUeOj5/pubhtml#">
            COVID Tracker estimates of progression rates
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6113687/">
            Zhaoyang et al. estimate of interaction rate
          </Link>
        </ListItem>
      </List>
      <Typography variant="body1" gutterBottom>
        <Link href="https://www.nytimes.com/interactive/2020/03/25/opinion/coronavirus-trump-reopen-america.html">
          New York Times interactive model for inspiration in visualizations
        </Link>
      </Typography>
    </Container>
  );
};

export default Credits;
