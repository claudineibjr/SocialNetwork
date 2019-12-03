// React Imports
import React from 'react';

// Styles
import './styles.css'

// Material-UI Components
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Components
import LoginComponent from '../../Components/LoginComponent';
import RegisterComponent from '../../Components/RegisterComponent';

// Model

// Services

// Icons


export default function Login(){
    enum TABS {
        Login = 'LOGIN',
        Register = 'REGISTER'
    }

    const [selectedTab, setSelectedTab] = React.useState(TABS.Register);

    function renderActiveTab(){
        switch (selectedTab) {
            case TABS.Login:
                return <LoginComponent/>
            case TABS.Register:
                return <RegisterComponent/>
            default:
                return <h1>Falha no sistema</h1>
        }
    }

    return(
        <div className="login-container">
            {renderActiveTab()}

            <Paper square className='bottomTabs'>
                <Tabs
                value={selectedTab}
                onChange={(event, value) => setSelectedTab(value) }
                indicatorColor="primary"
                textColor="primary"
                centered
                aria-label="icon label tabs example">
                    <Tab value = {TABS.Login}    label="Login" />
                    <Tab value = {TABS.Register} label="Create account" />
                </Tabs>
            </Paper>

      </div>
    );
}