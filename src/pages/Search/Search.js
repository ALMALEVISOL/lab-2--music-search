import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
  searchInput = React.createRef();
  state = {
    loading: false,
    error: null,
    artists: null
  };

  handleClick = () => {
    /* this.setState({
      loading: true,
      error: "No podemos buscar al artista fantasma, lo sentimos..."
    }); */
    if (this.searchInput.current.value === "") {
      alert("No podemos buscar al artista fantasma, lo sentimos...");
      return;
    }
    this.setState({
      loading: true,
      error: null
    });
    fetch(
      `https://react-api-lab.herokuapp.com/search?query=${
        this.searchInput.current.value
      }`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          artists: data.data
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
    const { loading, artists, error } = this.state;
    /* console.log( { artist.name } ); */
    return (
      <div className="mainSearchDiv">
        <div className="col-10">
          <input
            className="SearchBar__input"
            placeholder="Artist name"
            ref={this.searchInput}
          />
        </div>

        <button onClick={this.handleClick}>Buscar</button>
        {loading && "Buscando artistas..."}
        {artists && (
          <ul className="list-unstyled">
            {artists.map(artist => {
              return (
                <li>
                  <Link to={`/artists/${artist.id}`}>
                    <div className="row mb-4">
                      <div className="col-4">
                        <img className="img-fluid" src={artist.imageUrl} />
                      </div>
                      <div className="col-8">
                        <h1> {artist.name} </h1>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default Search;
