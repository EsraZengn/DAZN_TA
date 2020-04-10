import React, { useState } from 'react';
import _ from 'lodash';
import { Search, Container, Image, Card, Grid, Header, Message } from 'semantic-ui-react';
import Poke_Ball from '../Poke_Ball.svg';
import { Link } from 'react-router-dom';

function Pokemon({ pokemons, source }) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');
  const [pokemon, setPokemon] = useState({});

  // eslint-disable-next-line
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
  };

  async function fetchPokemon(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const pokemon = {
        id: data.id,
        name: data.name.capitalize(),
        color: data.color.name.capitalize(),
        capture_rate: data.capture_rate,
        growth_rate: data.growth_rate.name.capitalize(),
        egg_groups: data.egg_groups, //array
      };
      setPokemon(pokemon);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  function handleResultSelect(e, { result }) {
    setPokemon([]);
    setValue(result.title);
    const poke = pokemons.filter((poke) => poke.name === result.title);
    fetchPokemon(poke[0].url);
  }

  function handleSearchChange(e, { value }) {
    setValue(value);
    setLoading(true);

    setTimeout(() => {
      if (value.length < 1) {
        setLoading(false);
        setResults([]);
        setValue('');
        return;
      } else if (value.length >= 3) {
        const isMatch = (result) => result.title.startsWith(value);
        setLoading(false);
        setResults(_.filter(source, isMatch));
      } else {
        setLoading(false);
        setResults([]);
      }
    }, 300);
  }

  const getEggGroupId = (url) => {
    let str = url.substring(url.indexOf("group/") + 6); 
    str = str.substring(0, str.indexOf("/"));
    return str;
  }

  return (
    <>
      <Container textAlign="center" style={{ width: '50%' }}>
        <Search
          fluid
          loading={isLoading}
          onResultSelect={(e, { result }) => handleResultSelect(e, { result })}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            leading: true,
          })}
          results={results}
          value={value}
          size="big"
        />
      </Container>
      <Container textAlign="center" style={{ width: '50%' }}>
        {!error && !value && Object.entries(pokemon).length === 0 && (
          <div>
            <Image
              src={Poke_Ball}
              style={{ width: '30%', margin: '5em 35% 2em 35%', opacity: 0.8 }}
            />
            <p>Search for your favorite pokemon! </p>
          </div>
        )}
        {!error && Object.entries(pokemon).length !== 0 && (
          <Card color="red" style={{ marginTop: '5em' }} fluid>
            <Card.Content>
              <Image floated="right" size="mini" src="/images/pokeball.png" />
              <Card.Header style={{ marginBottom: '0.5em' }}>{pokemon.name}</Card.Header>
              <Card.Description textAlign="left">
                <div>
                  <b>Capture Rate: </b> {pokemon.capture_rate}{' '}
                </div>
                <div>
                  <b>Color: </b> {pokemon.color}
                </div>
                <div>
                  <b>Growth Rate: </b>
                  {pokemon.growth_rate}
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Grid columns={pokemon.egg_groups.length} stackable textAlign="center">
                {pokemon.egg_groups.length !== 0 &&
                  pokemon.egg_groups.map((egg_group) => {
                    const egg_group_id = getEggGroupId(egg_group.url);
                    return (
                      <Grid.Column key={egg_group.name}>
                        <Link to={`/egg_group/${egg_group_id}`}>
                          <Image
                            src={`/images/${egg_group.name}.png`}
                            alt={`${egg_group.name}`}
                            fluid
                            style={{ width: '10em' }}
                          />
                        </Link>
                        <Header>{egg_group.name.capitalize()}</Header>
                      </Grid.Column>
                    );
                  })}
              </Grid>
            </Card.Content>
          </Card>
        )}
        {error && (
          <Message negative>
            <Message.Header>Oops! </Message.Header>
            <p>{error}</p>
          </Message>
        )}
      </Container>
    </>
  );
}

export default Pokemon;
