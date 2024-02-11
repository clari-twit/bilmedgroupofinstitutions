import { ThemeProvider } from '@mui/material';
import App from 'App';
import { CustomThemeBreakpoint } from 'components';
import 'index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ThemeProvider theme={CustomThemeBreakpoint}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
