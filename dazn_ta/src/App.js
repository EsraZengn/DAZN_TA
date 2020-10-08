import React from 'react';
import EggGroups from './components/EggGroups';
import Pokemons from './components/Pokemons';
import { Segment, Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import EggGroup from './components/EggGroup';

function App() {
  return (
    <Router>
      <NavBar />
      <Segment basic>
        <Container>
          <Switch>
            <Route exact path="/" component={EggGroups} />
            <Route exact path="/pokemons" component={Pokemons} />
            <Route path="/egg_group/:id" component={EggGroup} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </Segment>
    </Router>
  );
}

export default App;
