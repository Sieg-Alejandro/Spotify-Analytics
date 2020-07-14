import React, { Component } from 'react';
import styled from 'styled-components';
import { authEndpoint, clientId, redirectUri, scopes } from "./config";

class RootComponent extends Component{


  render(){
  //console.log(this.state.labels)
  return(
  
    <div className="FullScreen">
    <a
    className="btn btn--loginApp-link"
    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`}
    >
    Log into Spotify!
  </a>
  </div>
  )


  }


}
export default RootComponent