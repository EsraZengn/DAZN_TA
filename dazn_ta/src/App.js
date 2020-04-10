import React, { useState } from 'react';
import Films from './components/FilmsNew';
import Actors from './components/Actors';
import { Segment, Menu, Header, Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

function App() {
  const [menuState, setMenuState] = useState('Films');
  const handleItemClick = (e, { name }) => setMenuState(name);
  return (
    <Router>
      <Header as="h1">STAR WARS</Header>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={Link}
            to="/"
            name="Films"
            active={menuState === 'Films'}
            onClick={handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/actors"
            name="Actors"
            active={menuState === 'Actors'}
            onClick={handleItemClick}
          />
        </Menu>
      </Segment>
      <Container>
        <Route exact path="/" component={Films} />
        <Route path="/actors" component={Actors} />
      </Container>
    </Router>
  );
}

export default App;
