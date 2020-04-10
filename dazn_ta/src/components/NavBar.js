import React, { useState } from 'react';
import { Menu, Header, Container, Segment } from 'semantic-ui-react';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar(props) {
  const [menuState, setMenuState] = useState('Egg Groups');
  const location = useLocation();

  const handleItemClick = (e, { name }) => setMenuState(name);

  return (
    <Container>
      <Header as="h1">POKEMON</Header>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <NavLink exact to="/">
            <Menu.Item
              to="/"
              name="Egg Groups"
              active={menuState === 'Egg Groups' && location.pathname === '/'}
              onClick={handleItemClick}
            />
          </NavLink>
          <NavLink exact to="/pokemons">
            <Menu.Item
              to="/pokemons"
              name="Pokemons"
              active={menuState === 'Pokemons' && location.pathname === '/pokemons'}
              onClick={handleItemClick}
            />
          </NavLink>
        </Menu>
      </Segment>
    </Container>
  );
}

export default NavBar;
