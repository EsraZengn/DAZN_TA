import React, { useEffect, useState } from 'react';
import EggGroup from './EggGroupPokemons';
import { Message, Dimmer, Loader } from 'semantic-ui-react';

function Films() {
  const [eggGroups, setEggGroups] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchEggGroups() {
      try {
        setLoading(true);
        const data = await fetch('https://pokeapi.co/api/v2/egg-group/');
        const { results } = await data.json();
        setEggGroups(results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error.message);
      }
    }
    fetchEggGroups();
  }, []);

  return (
    <>
      <Dimmer active={loading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
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
