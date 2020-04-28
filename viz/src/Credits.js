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
      <Typography variant="body1">
        Credits:
Tim Churches for his previous work on extending the SIR individual contact model
Blog post 1: https://timchurches.github.io/blog/posts/2020-03-10-modelling-the-effects-of-public-health-interventions-on-covid-19-transmission-part-1/
Blog post 2: https://timchurches.github.io/blog/posts/2020-03-18-modelling-the-effects-of-public-health-interventions-on-covid-19-transmission-part-2/
Open Source Gist: https://gist.github.com/timchurches/ce8858ae1e572153a54271bd52deb9c3
SEIQHRF Model
https://gist.github.com/timchurches/92073d0ea75cfbd387f91f7c6e624bd7#file-_icm-mod-status-seiqhrf-r-L692
Epimodel for providing their tools for simulating mathematical models of infectious disease dynamics in an R package and providing tutorials on their website
http://www.epimodel.org/
Jenness SM, Goodreau SM and Morris M. EpiModel: An R Package for Mathematical Modeling of Infectious Disease over Networks. Journal of Statistical Software. 2018; 84(8): 1-47.
For estimating several parameters of our model
https://data.worldbank.org/indicator/SH.MED.BEDS.ZS
https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRwAqp96T9sYYq2-i7Tj0pvTf6XVHjDSMIKBdZHXiCGGdNC0ypEU9NbngS8mxea55JuCFuua1MUeOj5/pubhtml#
https://covidtracking.com/data
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6113687/
New York Times Interactive model for inspiration in visualizations
https://www.nytimes.com/interactive/2020/03/25/opinion/coronavirus-trump-reopen-america.html


        </Typography>
    </Container>
  );
}

export default Credits;
