const PRODUCTION = process.env.NODE_ENV === 'production';

export const STATE_MAPPING = {
  's': 'Susceptible', 
  'e': 'Exposed', 
  'i': 'Infected', 
  'p': 'Preventative Isolation',
  'a': 'Asymptomatic Isolation', 
  'q': 'Quarantined', 
  'h': 'Requires Hospitalization', 
  'r': 'Recovered', 
  'f': 'Fatality' 
}
  
export const STATES = Object.keys(STATE_MAPPING);

export const DEV_API_URL = "http://localhost:5000/dataset";
export const PROD_API_URL = "http://ec2-184-73-33-179.compute-1.amazonaws.com/dataset";

export const API_URL = PRODUCTION ? PROD_API_URL : DEV_API_URL;