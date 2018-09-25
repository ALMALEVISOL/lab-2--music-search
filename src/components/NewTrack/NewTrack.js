import React, { Component } from "react";
import "./NewTrack.css";

export default class NewTrack extends Component {
  trackNameInput = React.createRef();
  trackAlbumInput = React.createRef();
  trackArtistInput = React.createRef();

  state = {
    loading: false,
    error: null
  };

  handleSubmit = event => {
    const props = this.props;
    event.preventDefault();
    this.setState({
      loading: true,
      error: null
    });
    let newTrackdata = {
      track: {
        trackNumber: Date.now() + "_adm",
        name: this.trackNameInput.current.value,
        durationInSeconds: 400,
        album: {
          id: Date.now() + "_adm",
          name: this.trackAlbumInput.current.value
        },
        artist: {
          id: Date.now() + "_adm",
          name: this.trackArtistInput.current.value
        }
      }
    };
    let config = {
      method: "POST",
      body: JSON.stringify(newTrackdata),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(
      `https://react-api-lab.herokuapp.com/playlists/${this.props.playlistId}`,
      config
    )
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          alert("¡Éxito, canción guardada!");
        }
        this.setState({
          loading: false,
          error: null
        });
        props.onAddToPlaylist();
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error
        });
      });
    event.target.reset();
  };

  render() {
    const { loading, error } = this.state;
    return (
      <div className={"addNewTrack"}>
        {loading && "Guardando canción en la playlist..."}
        <form onSubmit={this.handleSubmit}>
          <p>Agregar canción:</p>
          <p>Nombre de la canción</p>
          <input ref={this.trackNameInput} />
          <p>Nombre del album</p>
          <input ref={this.trackAlbumInput} />
          <p>Nombre del artista</p>
          <input ref={this.trackArtistInput} />
          <input type="submit" value="Agregar canción" />
        </form>
      </div>
    );
  }
}
