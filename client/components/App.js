import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavigationBarContainer from './NavBar/NavigationBarContainer';
import FlashMessagesList from './flash/FlashMessagesList';
import ForumsPage from './Forums/ForumsPage';
import TopicsPage from './Topics/TopicsPage';
import RepliesPage from './Replies/RepliesPage';
import SignUpPage from './SignUp/SignUpPage';
import SignInPage from './SignIn/SignInPage';
import GroupsPage from './GroupsDash/GroupsPage';

import Particles from 'react-particles-js';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Particles style = {{ position: 'absolute' }}
                    params = {
                      {
                        "particles": {
                          "number": {
                            "value": 80,
                            "density": {
                              "enable": true,
                              "value_area": 800
                            }
                          },
                          "color": {
                            "value": "#ff0000"
                          },
                          "shape": {
                            "type": "circle",
                            "stroke": {
                              "width": 0,
                              "color": "#000000"
                            },
                            "polygon": {
                              "nb_sides": 5
                            },
                            "image": {
                              "src": "img/github.svg",
                              "width": 100,
                              "height": 100
                            }
                          },
                          "opacity": {
                            "value": 0.5,
                            "random": false,
                            "anim": {
                              "enable": false,
                              "speed": 1,
                              "opacity_min": 0.1,
                              "sync": false
                            }
                          },
                          "size": {
                            "value": 3,
                            "random": true,
                            "anim": {
                              "enable": false,
                              "speed": 40,
                              "size_min": 0.1,
                              "sync": false
                            }
                          },
                          "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#ff0000",
                            "opacity": 0.4,
                            "width": 1
                          },
                          "move": {
                            "enable": true,
                            "speed": 6,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                              "enable": false,
                              "rotateX": 600,
                              "rotateY": 1200
                            }
                          }
                        },
                        "interactivity": {
                          "detect_on": "canvas",
                          "events": {
                            "onhover": {
                              "enable": true,
                              "mode": "repulse"
                            },
                            "onclick": {
                              "enable": true,
                              "mode": "push"
                            },
                            "resize": true
                          },
                          "modes": {
                            "grab": {
                              "distance": 400,
                              "line_linked": {
                                "opacity": 1
                              }
                            },
                            "bubble": {
                              "distance": 400,
                              "size": 40,
                              "duration": 2,
                              "opacity": 8,
                              "speed": 3
                            },
                            "repulse": {
                              "distance": 200,
                              "duration": 0.4
                            },
                            "push": {
                              "particles_nb": 4
                            },
                            "remove": {
                              "particles_nb": 2
                            }
                          }
                        },
                        "retina_detect": true
                      }
                    }
                />
                <NavigationBarContainer />
                <FlashMessagesList />
                <main>
                    <Switch>
                        <Route exact path={`/groups`} component={GroupsPage} />
                        <Route path={`/forum/:forumName/:topicName`} component={RepliesPage} />
                        <Route path={`/forum/:forumName`} component={TopicsPage} />
                        <Route exact path='/forum' component={ForumsPage} />
                        <Route path='/signup' component={SignUpPage} />
                        <Route path='/signin' component={SignInPage} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;