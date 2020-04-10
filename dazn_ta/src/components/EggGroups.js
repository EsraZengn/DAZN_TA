import React, { useEffect, useState } from 'react';
import EggGroup from './EggGroupPokemons';
import { Message } from 'semantic-ui-react';

function Films() {
  const [eggGroups, setEggGroups] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEggGroups() {
      try {
        const data = await fetch('https://pokeapi.co/api/v2/egg-group/');
        const { results } = await data.json();
        setEggGroups(results);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    fetchEggGroups();
  }, []);

  return (
    <>
      {!error ? (
        <EggGroup eggGroups={eggGroups} />
      ) : (
        <Message negative>
          <Message.Header>Oops! </Message.Header>
          <p>{error}</p>
        </Message>
      )}
    </>
  );
}

export default Films;
