import { connect } from 'react-redux';
import { fetchTrip } from '../../actions/trip_actions';
import TripShow from './trip_show';


const mapStateToProps = (state, ownProps) => {  
  let tripId = ownProps.match.params.tripId;
  let origin = [];
  let destination = [];
  let pois = [];
  
  if (state.trips.selected) {
    origin = state.trips.selected.origin;
    destination = state.trips.selected.destination;    
    pois = state.trips.selected.pois;
  }

  return {
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user,
    tripId,
    origin,
    destination,
    pois
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrip: tripId => dispatch(fetchTrip(tripId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripShow);
