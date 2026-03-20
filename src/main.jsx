import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from "./context/AuthContext.jsx";
import SavedPlantsProvider from "./context/SavedPlantsContext.jsx";

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <Router>
            <AuthContextProvider>
                <SavedPlantsProvider>
                    <App/>
                </SavedPlantsProvider>
            </AuthContextProvider>
        </Router>
    </StrictMode>,
);
