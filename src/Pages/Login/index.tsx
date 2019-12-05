// React Imports
import React, { Component } from 'react';

// Router
import {PossibleRoutes} from '../../Routes';

// Redux
import { connect } from 'react-redux';
import * as Actions from '../../Store/actions';
import store, { IStore } from '../../Store/index';

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
import User from '../../Model/User';

// Services

// Icons

// Enums
enum TABS {
    Login,
    Register
}

// Interfaces
interface IProps {
    userAuthenticated?: User,
    dispatch: any,
    history: any
}

interface IState {
    selectedTab: TABS
}

class Login extends Component<IProps, IState>{
    constructor(props: IProps){
        super(props);

        this.state = {
            selectedTab: TABS.Login
        };

        store.subscribe(this.authenticationCanBeChanged);
    }

    authenticationCanBeChanged = () => {
        if ((store.getState() as IStore).userAuthenticated !== undefined)
            this.props.history.push(PossibleRoutes.HOME);
    }

    setSelectedTab(newValue: TABS){
        this.setState({selectedTab: newValue});
    }
    
    renderActiveTab(){
        switch (this.state.selectedTab) {
            case TABS.Login:
                return <LoginComponent/>
            case TABS.Register:
                return <RegisterComponent/>
            default:
                return <h1>Falha no sistema</h1>
        }
    }

    render(){
        return(
            <div className="login-container">
                {this.renderActiveTab()}

                <Paper square className='bottomTabs'>
                    <Tabs
                    value={this.state.selectedTab}
                    onChange={(event, value) => this.setSelectedTab(value) }
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
}

export default Login;