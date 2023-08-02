import './ProfileStatsPage.css'
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileStatsPage = ({topArtists, topTracks, name, picture}) => {
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

            <div className="top-artists-and-tracks">
                <div className="top-artists">
                    <h2>Top Artists</h2>
                    <div className="grid">
                        {topArtists.map((artist, index) => (
                            <div className="item" id={artist.id}> 
                                <img src={artist.images[0].url} alt={artist.name}/>
                                <p>#{index+1}: <a href={artist.uri}>{artist.name}</a></p>
                            </div> 
                        ))}
                    </div>
                </div>

                <div className="top-tracks">
                    <h2>Top Tracks</h2>
                    <div className="grid">
                        {topTracks.map((track, index) => (
                            <div className="item" id={track.id}> 
                                <img src={track.album.images[0]?.url} alt={track.name} />
                                <p>#{index+1}: <a href={track.uri}>{track.name}</a></p>
                            </div>
                        // <li key={track.id}><a href={track.uri}>{track.name}</a> {track.preview_url}({track.popularity})</li> 
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStatsPage;