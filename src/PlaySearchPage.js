import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import './PlaySearchPage.css';

const PlaySearchPage = ({name, picture, accesstoken}) => {
    // console.log(accesstoken + " is hereeee")
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accesstoken);

    // search for track function
    const handleSearch = () => {
        if (searchQuery) {
            spotifyApi.searchTracks(searchQuery, {limit: 21})
                .then((response) => {
                setSearchResults(response.tracks.items);
                })
                .catch((error) => {
                console.error('Error searching for tracks:', error);
                });
        }
    }

    // play track function
    const playTrack = (trackuri) => {
        // setSelectedTrack(trackuri);
        // spotifyApi.play(selectedTrack);
        spotifyApi.play({
            uris: [trackuri],
        });
    
    }

    useEffect(() => {
        const delaySearch = setTimeout(() => {
          handleSearch();
        }, 500); // delay to avoid making too many API calls while typing

        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

    return (
        <div>
            <div className='header'>
                <div className="buttons">
                    <Link to="/profile-stats" className="header-button">Profile Stats</Link>
                    <Link to="/play-search" className="header-button">Play/Search</Link>
                </div>
                
                <div className='profile'>
                    <img src={picture} alt='' className='profile-picture-corner'/>
                    <p className='display-name-corner'>{name}</p>
                </div>
            </div>

            <div className='search-and-play'>
                <h2>Search and Play</h2>
                <div className='search-bar'>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter track name..."/>
                </div>
                <div className='search-results'>
                    {searchResults.map((track) => (
                    <div key={track.id} className='track-item'>
                        <img src={track.album.images[0].url} alt={track.name} />
                        <div className='track-info'>
                            <p className='track-name'>{track.name}</p>
                            <p className="artist-name">{track.artists.map((artist) => (artist.name)).join(', ')}</p>
                            <p className='artist-name'>{millisToMinutesAndSeconds(track.duration_ms)}</p>
                        </div>
                        <button onClick={() => playTrack(track.uri)}>Play</button>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlaySearchPage;