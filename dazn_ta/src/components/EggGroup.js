import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Icon, Card, Image, Label, Message } from 'semantic-ui-react';

function EggGroup() {
  const { id } = useParams();
  const [error, setError] = useState('');
  const [eggGroup, setEggGroup] = useState({});

  useEffect(() => {
    async function fetchEggGroup() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/egg-group/${id}/`);
        const egg_group = await res.json();
        console.log(egg_group);
        setEggGroup(egg_group);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    fetchEggGroup();
  }, [id]);

  return (
    <>
      <Container textAlign="center" style={{ width: '50%' }}>
        <Label as={Link} to="/pokemons" size="big" style={{ backgroundColor: 'white' }}>
          <Icon name="arrow left" />
          Back to pokemon search
        </Label>
        {!error ? (
          Object.keys(eggGroup).length !== 0 && (
            <Card color="red" style={{ marginTop: '5em' }} fluid textalign="center">
              <Card.Content>
                <Image size="small" src={`/images/${eggGroup.name}.png`} />
                <Card.Header style={{ marginTop: '0.5em' }}>
                  {eggGroup.name.toUpperCase()}
                </Card.Header>
                <Card.Description textAlign="center">
                  {
                    <div>
                      <ul>
                        <li>
                          <b>Number of Pokemons: </b>
                          {eggGroup.pokemon_species.length}
                        </li>
                        <b>Names: </b>
                        {eggGroup.names.map((name) => {
                          return (
                            <li key={name.language.name}>
                              <b>{name.language.name}: </b> {name.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  }
                </Card.Description>
              </Card.Content>
            </Card>
          )
        ) : (
          <Message negative>
            <Message.Header>Oops! </Message.Header>
            <p>{error}</p>
          </Message>
        )}
      </Container>
    </>
  );
}

export default EggGroup;
