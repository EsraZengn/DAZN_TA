import React, { useState } from 'react';
import { Card, Image, Menu, Container, Grid, Message, Dimmer, Loader } from 'semantic-ui-react';

function EggGroup({ eggGroups }) {
  const [activeItem, setActiveItem] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  // eslint-disable-next-line
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
  };

  function mapCharactersToItems(pokemons) {
    return pokemons.sort(sortCallBack).map((pokemon) => ({
      header: pokemon.name.capitalize(),
      image: { src: `/images/pokeball.png`, style: { width: '50%', marginLeft: '25%' } },
      color: 'grey',
      fluid: true,
      childKey: pokemon.id,
      href: ``,
      description: (
        <ul>
          <li>
            <b>Color: </b>
            {pokemon.color.capitalize()}
          </li>
          <li>
            <b>Growth Rate: </b>
            {pokemon.growth_rate.capitalize()}
          </li>
          <li>
            <b>Abilities: </b>
            {pokemon.abilities.capitalize()}
          </li>
        </ul>
      ),
    }));
  }

  async function fetchPokemons(groupUrl) {
    setPokemons([]);
    try {
      setLoading(true);
      const res = await fetch(groupUrl);
      const group = await res.json();
      let pokemons = group.pokemon_species.map(async (poke) => {
        const res = await fetch(poke.url);
        const pokemon = await res.json();

        const resp = await fetch(pokemon.varieties[0].pokemon.url);
        const varieties = await resp.json();
        const { abilities } = varieties;

        const abilityList =
          abilities.length === 0
            ? 'none'
            : abilities
                .map((abi) => {
                  const { ability } = abi;
                  return ability.name;
                })
                .join(', ');
        return {
          id: pokemon.id,
          name: pokemon.name,
          color: pokemon.color.name,
          growth_rate: pokemon.growth_rate.name,
          abilities: abilityList,
        };
      });
      return Promise.all(pokemons);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError(error.message);
    }
  }

  function handleClick(e, group) {
    if (activeItem !== group.name) {
      fetchPokemons(group.url).then((pokemons) => {
        setPokemons(pokemons);
        setLoading(false);
      });
    }
    const newIndex = activeItem === group.name ? -1 : group.name;
    setActiveItem(newIndex);
  }

  const sortCallBack = (a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <>
      {!error ? (
        <Grid>
          <Grid.Column width={3}>
            <Menu vertical compact>
              {eggGroups.sort(sortCallBack).map((group) => {
                return (
                  <Menu.Item
                    key={group.name}
                    name={group.name}
                    active={activeItem === group.name}
                    onClick={(e, name) => handleClick(e, group)}
                  >
                    <Image src={`/images/${group.name}.png`} avatar />
                    <p className="menuItem__p">{group.name.capitalize()}</p>
                  </Menu.Item>
                );
              })}
            </Menu>
          </Grid.Column>
          <Grid.Column width={13}>
            <Container fluid>
              <Dimmer active={loading} inverted>
                <Loader inverted style={{top:'25%'}}>Loading</Loader>
              </Dimmer>
              <Card.Group
                stackable
                itemsPerRow="3"
                centered
                items={pokemons ? mapCharactersToItems(pokemons) : []}
              />
            </Container>
          </Grid.Column>
        </Grid>
      ) : (
        <Message negative>
          <Message.Header>Oops! </Message.Header>
          <p>{error}</p>
        </Message>
      )}
    </>
  );

  /*   return (
    <>
      {eggGroups.map((group) => {
        return (
          <Segment key={group.name}>
            <Accordion>
              <Accordion.Title
                index={group.name}
                active={activeIndex === group.name}
                onClick={(e) => handleClick(e, group)}
              >
                <Header>{group.name.toUpperCase()}</Header>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === group.name}>
                
                <Card.Group
                  stackable
                  itemsPerRow="3"
                  centered
                  items={pokemons ? mapCharactersToItems(pokemons) : []}
                />
              </Accordion.Content>
            </Accordion>
          </Segment>
        );
      })}
    </>
  ); */
}

export default EggGroup;
