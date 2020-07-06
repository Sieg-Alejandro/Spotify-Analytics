import "./App.css";
import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import logo from "./logo.svg";
import disc from "./disc.svg";
import GenreChart from './components/GenreChart'


const time_periods = {
  medium_term: "Over the past 6 months",
  short_term: "Over the past 4 weeks",
  long_term: "Over the Years"
}
var shortid = require('shortid');
function createNewTodo(text) {
  return {
    completed: false,
    id: shortid.generate(),
    text
  }
}

//Helper method to pass in params to GET method for fetch api
function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

//Function to help set up identify genre
class TopArtistList extends Component{
  constructor(props){
    super(props)
    console.log(this.props.artistlist)
  }
  render(){
    let artistlist = this.props.artistlist
    console.log(artistlist)
  
    return(
    <div>
    <ul>
    {artistlist.map(artist => {
      return <li>{artist.name}</li>;}
    )}
    </ul>
    </div>
    );
  }

}
class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      topArtists: [],
      no_data: false,
      genres:{},
    };


  }


  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      //this.getCurrentlyPlaying(_token);
      this.getTopArtists2(_token);
    }

  }  

  getTopArtists2(token){
    const params= objToQueryString(
      {limit: 50,
       time_range: 'long_term'});
    fetch(`https://api.spotify.com/v1/me/top/artists?${params}`, {
    method: "GET",
    headers: {"Authorization": "Bearer " + token},   
    }).then((response) => response.json())
    .then(data => this.setState({
      artistlist: data.items.map(item => {
        //console.log(item.name)
       // console.log("Genres for " + item.name + ": " + item.genres)
        return {
          name: item.name,
          key: shortid.generate(),
          genre: this.BasicGenre(item.genres[0])
        }
    }),
      no_data:false 
  })//setstate
  )//then
  }
  BasicGenre(genreString){
    var genres=["alternative r&b","hip hop", "rap","pop", "r&b", "country", "edm", "alternative"]
    var ret=genreString;
    genres.forEach(function(g){
      if(genreString.includes(g)){
        //console.log("For string" + genreString +" we returned : " + g)
        ret=g;
      }
    })
    
    var temp=this.state.genres
    //console.log('HI ${ret}');
    if(!(ret in temp)){
      temp[ret]=1
      this.setState({
        genres : temp
      })
      console.log("added: " + ret)
    }
    else{
      temp[ret] = (temp[ret]+1) || 1 ;
   
      this.setState({
        genres : temp
      })

      console.log("updated: " + ret)
    }

    return ret
  }
  render() {
    let artistToRender = 
    this.state.artistlist
        ? this.state.artistlist
        : []
 
    return (
      <div className="App">
        <header className="App-header">
          {/* {this.state.token && !this.state.no_data
            ?<img src={disc} className="App-logo" alt="disc" />
            : null
          }    */}
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Log into Spotify!
            </a>
          )}
          {this.state.token && !this.state.no_data && (
            <span>Your Top Genre Breakdown {time_periods.long_term}
              <GenreChart artistlist={artistToRender} genredata={this.state.genres} name="hello" />
            </span>
           )}
          {this.state.no_data && (
            <p>
              You need to be playing a song on Spotify, for something to appear here.
            </p>
            
          )}
        </header>
        
      </div>
    );
  }
}

export default App;
