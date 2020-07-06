import React, { Component } from "react";
import {Pie} from 'react-chartjs-2'
import { data } from "jquery";
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
class GenreChart extends Component{
    constructor(props){
        super(props);
        this.state={
            data: []
        }
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.artistlist!==this.props.artistlist){
          //Perform some operation
          console.log(nextProps)
          var temp=[]
          this.setState({
            data: {
            labels : Object.keys(nextProps.genredata),
            datasets: [{data:Object.values(nextProps.genredata),
                        backgroundColor:Object.keys(nextProps.genredata).map(x => getRandomColor())}]
            
            }
          })
        }

      }

    render(){
    //console.log(this.state.labels)
    return(

        <div>
        <Pie width={400} height = {400} options={{ maintainAspectRatio: false }} data={this.state.data} />
      </div>
    )


    }


}
export default GenreChart