import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import InteractiveSimulator from './InteractiveSimulator';

const App = () => {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Box my={4}>
          <InteractiveSimulator />
        </Box>
      </Container>
    </div>
  );
}

export default App;
