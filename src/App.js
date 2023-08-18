import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import ProfileStatsPage from './ProfileStatsPage';
import PlaySearchPage from './PlaySearchPage';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const spotifyApi = new SpotifyWebApi(); 

const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [followers, setFollowers] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const { access_token } = queryString.parse(window.location.hash);
    if (access_token) {
      setAccessToken(access_token);
      spotifyApi.setAccessToken(access_token);
      setAccessToken(access_token);

      // get spotify account's info
      spotifyApi.getMe().then((response) => {
        setDisplayName(response.display_name)
        setProfilePicture(response.images[0]?.url)
        setFollowers(response.followers.total)
      })

      spotifyApi.getMyTopArtists({time_range: "long_term", limit: 10, offset: 0})
        .then((response) => {
          setTopArtists(response.items)
          
        })
        .catch((error) => {
          console.error('Error fetching top artists:', error);
        });
      
      spotifyApi.getMyTopTracks({time_range: "long_term", limit: 10, offset: 0})
        .then((response) => {
          setTopTracks(response.items)
        })
        .catch((error) => {
          console.error('Error fetching top tracks:', error);
        });
    }
  }, []);

  // Rest of component code
  const handleLogin = () => {
    window.location = 'https://accounts.spotify.com/authorize?' +
      queryString.stringify({
        client_id: clientId,
        response_type: 'token',
        redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
        scope: 'user-read-private user-read-email user-top-read user-modify-playback-state',
        show_dialog: 'true'
      });
  };

  return (
    <Router>
      <div>
          {!accessToken ? (
            <button onClick={handleLogin}>Login with Spotify</button>
          ) : (
            <div>
              {/* // APP COMPONENTS AFTER LOGIN SUCCESSFULLY */}
              <Switch>
                <Route exact path='/'>
                  <WelcomePage name={displayName} picture={profilePicture} followers={followers}/>
                </Route>
            
                <Route exact path='/profile-stats'>
                  <ProfileStatsPage name={displayName} picture={profilePicture} topArtists={topArtists} topTracks={topTracks} />
                </Route>
              
                <Route exact path='/play-search'>
                  <PlaySearchPage name={displayName} picture={profilePicture} accesstoken={accessToken}/>
                </Route>
              </Switch>
            </div>
          )
          }     
      </div>
    </Router>
  );
};

export default App;