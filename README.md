# COVID-19 Intervention Modeling

For a full write-up of the methodology and results of the project and an interactive visualization see the website: ourwebsite.com  

We extended the SEIQHRF model developed by Tim Churches, which itself is an extension of the SIR model continaed in [EpiModel](https://www.epimodel.org/). The SEIQHRF code is [here](https://gist.github.com/timchurches/92073d0ea75cfbd387f91f7c6e624bd7) and the analysis notebook which inspired parts of our analysis is [here](https://gist.github.com/timchurches/ce8858ae1e572153a54271bd52deb9c3).

We added two main extensions:  
* Recovery of asymptomatic but infected people, as since Churches' work it has become clear that some people recover without showing symptoms. 
* Contact tracing through the addition of A and P compartments, representing asymptomatic people who are isolated and either infected (A) or not infected (P).

The code with the extensions are the files beginning with `_icm`.  

The code to run the intervention simulations discussed in our results section is in `RunSimulation.Rmd`.  

The code for the visualization website frontend is in `viz`, and the code for the visualization website backend is in `backend`.
