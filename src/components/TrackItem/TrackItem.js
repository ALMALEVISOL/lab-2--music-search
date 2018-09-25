import React, { Component } from "react";

export default class TrackItem extends Component {
  render() {
    const { track } = this.props.track;
    return (
      <li className="mb-4">
        <h4 className="mb-0">Nombre: {track.name}</h4>
        <p>Nombre del artista: {track.artist.name}</p>
      </li>
    );
  }
}
