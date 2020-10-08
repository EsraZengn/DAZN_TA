import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';
import Pokemon from './Pokemon';

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [source, setSource] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=100');
        const { results } = await res.json();
        const source = results.map((pokemon) => {
          return {
            title: pokemon.name,
          };
        });
        setPokemons(results);
        setSource(source);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    fetchPokemons();
  }, []);

  return (
    <>
      {!error ? (
        <Pokemon pokemons={pokemons} source={source} />
      ) : (
        <Message negative>
          <Message.Header>Oops! </Message.Header>
          <p>{error}</p>
        </Message>
      )}
    </>
  );
}

export default Pokemons;
