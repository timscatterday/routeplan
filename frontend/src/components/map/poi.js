import React, { Component } from 'react'
const axios = require('axios');
const qs = require('qs');

export default class Poi extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            data: [],
            selectedPois: []
        }
    }

    yelpCall() {
                const apiKey = 'p-XhSqgupUYL5Wv0qR38I6O5hCGVMLYjdoU4iEGS_fUizw_5u9YQDaff3i5t8wL21NgEF5Y\
SyHM5YXEECxfMWwSVnZi_LWvlDVpBuGEa0VjvdU-8EstUwDb_yiNvXHYx';
        // Place holder for Yelp Fusion's API Key. Grab them                                    
        // from https://www.yelp.com/developers/v3/manage_app                                   

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${this.props.city}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            },
            params: {
                term: this.props.name
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        })
            .then(
                (res) => {
                    this.setState({data: res.data.businesses[0]})
                }
            )
            // .then(() => new Promise(resolve => setTimeout(resolve, 400)))
            .catch(err => {
                //console.log(err)
            });
    }

    componentDidUpdate() {
        this.yelpCall();
    }

    componentDidMount() {
        this.yelpCall();
    }

    
    // This function pass selected POI up to Sidebar component
    handleAddToTrip(poi) {               
        this.props.selectedPois(poi);
    }
    
    render() {
        let defaultImg =
          "https://i7.pngguru.com/preview/186/969/183/heart-love-symbol-brand-metroui-google-places-thumbnail.jpg"; //'https://img.pngio.com/danny-devito-face-png-vector-clipart-psd-peoplepngcom-danny-devito-face-png-388_563.png';
        if (this.state.data && this.state.data.image) {
            defaultImg = this.state.data.image_url;
        }
        return (
          <div>
            <div className="poi-item">
              <h3>{this.props.name}</h3>
              {/* <img src={defaultImg}></img> */}
              {this.state.data && (
                <div>Yelp Rating: {this.state.data.rating || "None"}</div>
              )}
              <button onClick={this.handleAddToTrip.bind(this, this.props.poi)}>Add to trip</button>
            </div>            
          </div>
        );
    }
}
