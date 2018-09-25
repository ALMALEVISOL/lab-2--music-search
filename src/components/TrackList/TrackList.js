import React, { Component } from "react";
import TrackItem from "../../components/TrackItem";

export default class TrackList extends Component {
  render() {
    return (
      <ul>
        {this.props.tracks.map(track => {
          return <TrackItem track={track} />;
        })}
      </ul>
    );
  }
}
