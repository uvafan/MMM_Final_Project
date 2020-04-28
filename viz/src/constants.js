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

export const API_URL = "http://localhost:5000/dataset";