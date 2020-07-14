  
import React, { Component } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import styled from 'styled-components';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './App.css'
import Home from './Home'
import Analytics from './Analytics'
import RootComponent from './RootComponent'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const StyledSideNav = styled(SideNav)`
    background-color: #1ecd97;
`;
class App extends Component {


  render() {

    return (
    <div className="App">
        <Router>
            <Route render={({ location, history }) => (
                <React.Fragment>
                    <StyledSideNav
                        onSelect={(selected) => {
                            const to = '/' + selected;
                            if (location.pathname !== to) {
                                history.push(to);
                            }
                        }}
                    >
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="home">
                            <NavItem eventKey="home">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="devices">
                                <NavIcon>
                                    <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Analytics
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </StyledSideNav>
                    <main>
                    <Route path="/" exact component={props => <RootComponent />} />
                    <Route path="/home" component={props => <Home />} />
                    <Route path="/devices" component={props => <Analytics />} /> 
                    </main>
                </React.Fragment>
            )}
            />
        </Router>
    </div>
    );
  }
}

export default App;


{/* <Route path="/" exact component={props => <RootComponent />} />
<Route path="/home" component={props => <Home />} />
<Route path="/devices" component={props => <Devices />} /> */}