// filepath: /Users/ravitejamannam/Course_Connect/frontend/src/App.js
import React from 'react';
import RoutesComponent from './routes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <RoutesComponent />
            </div>
        </ThemeProvider>
    );
};

export default App;