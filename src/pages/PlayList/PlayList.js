import React, { Component } from "react";
import NewTrack from "../../components/NewTrack";
import TrackList from "../../components/TrackList";

class PlayList extends Component {
  state = {
    loading: true,
    error: null,
    playlist: null
  };

  componentDidMount() {
    this.loadPlayList();
  }

  loadPlayList = () => {
    this.setState({
      loading: true,
      error: null
    });
    /* https://react-api-lab.herokuapp.com/playlists/@sparragus */
    fetch(
      `https://react-api-lab.herokuapp.com/playlists/${
        this.props.match.params.playlistId
      }`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          playlist: data.data
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error
        });
      });
  };
  render() {
    const { loading, playlist, error } = this.state;
    return (
      <div className="playList">
        {loading && "Cargando información del playlist..."}
        {playlist && playlist.length > 0 && <TrackList tracks={playlist} />}
        {playlist &&
          (playlist.length === 0 && (
            <React.Fragment>
              <p>
                No tienes canciones registradas para la lista:
                {this.props.match.params.playlistId}
              </p>
            </React.Fragment>
          ))}
        <NewTrack
          playlistId={this.props.match.params.playlistId}
          onAddToPlaylist={this.loadPlayList}
        />
      </div>
    );
  }
}

export default PlayList;
