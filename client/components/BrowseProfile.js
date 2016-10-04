import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions/browse';
import { fetchFriendshipStatus } from '../actions/friends';
import NavBar from './navbar';
import FriendRequestButton from './FriendRequestButton';
import RadarGraph from './radarGraph';
import ProfilePic from './profilePic';

class BrowseProfile extends Component {

  componentWillMount() {
    this.props.fetchProfile(this.props.params.id);
    this.props.fetchFriendshipStatus(this.props.params.id);
  }

  componentDidUpdate() {
  }

  render() {
    //if friends or public, fetch all data,
    //if private, fetch selected data
    if(this.props.profileInfo !== null) {
      return (
        <div>
          <NavBar />
          <ProfilePic />
          <FriendRequestButton otherID={this.props.params.id} friendshipStatus={this.props.friendshipStatus} />
          <div>Age: {this.props.profileInfo.age}</div>
          <div>Gender: {this.props.profileInfo.gender}</div>
          <RadarGraph userID={this.props.params.id} />
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading profile...</h3>
        </div>
      )
    }
  }

}

function mapStateToProps(state) {
  return {
    profileInfo: state.browse.profileInfo,
    friendshipStatus: state.friends.friendshipStatus
  }
}

export default connect(mapStateToProps, { fetchProfile, fetchFriendshipStatus })(BrowseProfile);
