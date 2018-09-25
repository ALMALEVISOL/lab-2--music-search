import React, { Component } from "react";
import { Link } from "react-router-dom";

class ArtistInfo extends Component {
  state = {
    loading: true,
    error: null,
    artist: null
  };

  componentDidMount() {
    this.loadArtist();
  }

  loadArtist = () => {
    this.setState({
      loading: true,
      error: null
    });
    /* https://react-api-lab.herokuapp.com/artists/83d91898-7763-47d7-b03b-b92132375c47 */
    fetch(
      `https://react-api-lab.herokuapp.com/artists/${
        this.props.match.params.artistId
      }`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          artist: data.data
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
    const { loading, artist, error } = this.state;
    /* console.log( { artist.name } ); */
    return (
      <div className="artisInfo">
        {loading && "Cargando información del artista..."}
        {artist && (
          <React.Fragment>
            <div className="row mb-4">
              <div className="col-4">
                <img className="img-fluid" src={artist.imageUrl} />
              </div>
              <div className="col-8">
                <h1> {artist.name} </h1>
                <p>{artist.bio}</p>
              </div>
            </div>
            <h2>ALBUMS:</h2>
            {artist.albums.map(album => {
              return (
                <div>
                  <Link to={`/albums/${album.id}`}>
                    <div className="row mb-4">
                      <div className="col-3">
                        <img className="img-fluid" src={album.imageUrl} />
                      </div>
                      <div className="col-8">
                        <h1> {album.name} </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ArtistInfo;
