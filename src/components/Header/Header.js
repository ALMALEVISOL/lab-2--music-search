import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import Logo from "../Logo";
import { PLAYLIST_ID } from "../../constants";

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="container">
          <a className="mr-2" href="/">
            <Logo />
          </a>
          <Link to={`/playlists/${PLAYLIST_ID}`}>{PLAYLIST_ID}</Link>
          <Link to={"/search"}>
            <span className="search-span">
              Looking more artist?, Click here
            </span>
          </Link>
        </div>
      </div>
    );
  }
}
