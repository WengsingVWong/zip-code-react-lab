import React, { Component } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, ListGroupItem } from 'react-bootstrap';


function City(props) {
  return (
    <Card className="city-card mx-auto my-3">
      <Card.Header>{props.cityInfo.LocationText}</Card.Header>
      <Card.Body>
        <ListGroup>
          <ListGroupItem>State: {props.cityInfo.State}</ListGroupItem>
          <ListGroupItem>Location: ({props.cityInfo.Lat}, {props.cityInfo.Long})</ListGroupItem>
          <ListGroupItem>Population (estimated): {props.cityInfo.EstimatedPopulation}</ListGroupItem>
          <ListGroupItem>Total Wages: {props.cityInfo.TotalWages}</ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>);
}

function ZipSearchField(props) {
  return (
  <div className="zip-search-field-div text-center mt-3 row justify-content-center">
    <label className="col-sm-1 col-form-label">Zip Code: </label>
    <input className="col-sm-2 form-control" type="text" maxLength="5" placeholder="Ex: 10016" onChange={(e) => props.onChange(e)}/>
  </div>);
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cities: [],
    }
  }

  zipChanged(e) {
    this.setState({
      zipCode: e.target.value
    });
    let myZipCode = e.target.value;
    let apiURL = "http://ctp-zip-api.herokuapp.com/zip/" + myZipCode;
    fetch(apiURL, {
      method: "GET"
    })
      .then(response => response.json())
      /*.then(response => console.log("Success:", JSON.stringify(response)))*/
      .then(response => (
        this.setState({
        cities: response}),
        console.log("CITIES", this.state.cities)
      ))
      .catch(error => console.log("Error:", error));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onChange={(e) => this.zipChanged(e)} />
        <div>
          {
            this.state.cities.map(obj => (<City key={obj.RecordNumber} cityInfo={obj} />))
          }
        </div>
      </div>
    );
  }
}

export default App;
