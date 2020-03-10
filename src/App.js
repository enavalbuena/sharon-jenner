import React from 'react';
//import logo from './logo.svg';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


class  App extends React.Component{
  constructor(){
    super();
    this.state = {
      lng : null,
      lat : null,
      fecha : null,
      position:[10.9878, -74.7889]
    }
    setInterval(()=>this.consulta(), 1000);
    this.consulta();
  }

  async consulta () {
    console.log("entreooo")
    const hacer = this;
    let  data = null;
    await fetch('http://186.112.192.129:50188')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      hacer.setState({lng : myJson.data[0].Longitud, lat : myJson.data[0].Latitud, fecha : myJson.data[0].Fecha ,position:[myJson.data[0].Latitud,myJson.data[0].Longitud]});
      console.log(myJson.data[0].Fecha);
    });
    console.log(data)
  }


  render(){

    return (
      <div className="App">
        
        <center>    
          
          <p></p>
          <h1>JES CORP</h1>
          <p></p>
          <p>Ubicación de la Syrus 3G</p>
          <p></p>
            
        
        </center>

        <table>
          <tr>
            <th>Longitud</th>
            <th>Latitud</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
          {this.state.fecha &&
            <tr>
              <td>{this.state.lng}</td>
              <td>{this.state.lat}</td>
              <td>{this.state.fecha.split(" ")[0]}</td>
              <td>{this.state.fecha.split(" ")[1]}</td>
            </tr>
          }
        </table>

        <center>
        <Map center={this.state.position} zoom={13}>
          <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution="JESCORP"
            />
          <Marker position={this.state.position} >
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
         </Marker>
          </Map>
        </center>



        
  
      

      </div>
    );



  }
}

export default App;
