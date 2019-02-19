import React, { Component } from 'react';
import Autocomplete from "./Autocomplete";
import './App.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            Artist:"",
            Song:"",
            lyrics1:"",
            response:false
        }
    }

    componentDidMount(API_CALL) {
        this.setState({
            isLoaded: true,
        })


    }
 

    onArtistChange = event => {
        this.setState({ Artist: event.target.value});
    }

    onSongChange = event => {
        this.setState({ Song: event.target.value});
    }
    
    updateCity = (e,items) => {
        const  {Artist}  = this.state;
        const  {Song}  = this.state;
      
    
        
        //Musixmatch API KEY
        const API_KEY = "3e7a3a20b3044fc6760c80fbed0ea16e";
        // const Artist = "Blind Melon"
        // const Song = "No Rain"
        
        const API_CALL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&callback=callback&q_track=${Song}&q_artist=${Artist}&apikey=${API_KEY}`;
        
        console.log(Artist);
        console.log(Song);
  
        fetch(API_CALL)
        .then(res => res.json())

  
        .then(json  => {
            
 
            this.setState({
                items:json,
                Artist:Artist,
                Song:Song,
                lyrics1: json.message.body.lyrics.lyrics_body,
                 
            })
          


            
            
        });

    


    }
    render() {
        
        var { isLoaded, } = this.state;
        if (!isLoaded) {
            return <div>Data Loading.. Please Wait...</div>;
        }
     
        return (
            
            <div className="App">

            
                <h1 className="title">Search Your Favorite Lyrics<div className="icon"></div></h1>
                
                <div>
                    
                    <br/>
                  <div className="app-container">

                    <div className="song-header">Your Song:<br/>{this.state.Song.toUpperCase()}<br/>{this.state.Artist.toUpperCase()}</div>
                    <div className="song-header"></div> 
                   
                    <div className="response">{this.state.lyrics1}</div> 
                   
                    <div id="imageContainer" ></div>

                  </div>


                  <div className="wrap">
               
                  <h1 className="string">Enter Artist</h1>
                  < Autocomplete />
                    {/* <input id="artistInput" className="input2" onChange={this.onArtistChange}  type="text"  id="city" placeholder="Artist" name="Artist" /> */}
                  <h1 className="string">Enter Song</h1>
                    <input id="songInput" className="input2" onChange={this.onSongChange} type="text" id="state" placeholder="Song" name="Song" />
                   
                    <br/>
                    
                    <button type="submit" id="submit-btn" className="submit-button wow fadeInDownBig" data-wow-delay="1.5s" onClick={this.updateCity}>Submit</button>
                    
                 
                 </div>
                 {/* End Wrap Div */}
                </div>
            </div>
        );

       
    }
}
export default App;