import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPoiToTrip } from '../../actions/poi_actions';
const axios = require('axios');
const qs = require('qs');

class PoiContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            data: [],
            selectedPois: []
        }
    }

    yelpCall() {
        const apiKey =
          "mOp_g5UnBzGDCmW5_fpxXmCCaitoXrzlIwxKlEEL8Dvre40PECjRrMVWqNLMaZBeILGQWGEZ6KQyyATXlfgVAwHvw_UuzBSDVV-kDwGsR-fzmzkvgeSyL5xQeG3YXXYx";
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
        
        // this.props.addPoiToTrip({
        //     _id: this.props.tripId,
        //     poi  
        // });    
        this.props.selectedPois(poi);
    }
    
    render() {
        let defaultImg =
          "https://i7.pngguru.com/preview/186/969/183/heart-love-symbol-brand-metroui-google-places-thumbnail.jpg"; //'https://img.pngio.com/danny-devito-face-png-vector-clipart-psd-peoplepngcom-danny-devito-face-png-388_563.png';
        if (this.state.data && this.state.data.image_url) {
            defaultImg = this.state.data.image_url;
        }
        return (
          <div>
            <div className="poi-item">
              <h3>{this.props.name}</h3>
              <img src={defaultImg}></img>
              {this.state.data && (
                <div>Yelp Rating: {this.state.data.rating || "None"}</div>
              )}
              <button onClick={this.handleAddToTrip.bind(this, this.props.poi)}>Add to trip</button>
            </div>            
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    // tripId: ownProps.match.params.tripId,
    poi: ownProps.poi,
    key: ownProps.key,
    name: ownProps.name,
    city: ownProps.city,
    selectedPois: ownProps.selectedPois
});

const mapDispatchToProps = dispatch => ({
    addPoiToTrip: (poi) => dispatch(addPoiToTrip(poi))
});

export default connect(mapStateToProps, mapDispatchToProps)(PoiContainer);

