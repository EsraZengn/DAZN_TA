import React, { useEffect, useState } from 'react';
import { Card, Segment, Header, Accordion, Image } from 'semantic-ui-react';

function Films() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [chars, setChars] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const data = await fetch('https://swapi.co/api/films/?format=json');
        const { results } = await data.json();
        results.map((result) => {
          setFilms((prevFilm) => [...prevFilm, result]);
        });
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    fetchFilms();
  }, []);

  function mapCharactersToItems(characters) {
    return characters.map((character) => ({
      header: character.name,
      image: { src: `/images/actor.png`, style: { width: '50%', marginLeft: '25%' } },
      meta: character.birth_year,
      color: 'grey',
      fluid: true,
      childKey: character.name,
      href: ``,
      description: (
        <ul>
          <li>
            <b>Planet: </b>
            {character.planet}
          </li>
          <li>
            <b>Species: </b>
            {character.species}
          </li>
        </ul>
      ),
    }));
  }

  async function fetchCharacters(urls) {
    setChars([]);

    const chars = await Promise.all(
      urls.map((url) => fetch(`${url}?format=json`).then((resp) => resp.json())),
    );
    const charList = chars.map(async (char) => {
      const speciesList = await Promise.all(
        char.species.map((url) => fetch(`${url}?format=json`).then((resp) => resp.json())),
      );
      const species =
        speciesList.length === 0 ? 'Unknown' : speciesList.map((specie) => specie.name).join(', ');

      const res = await fetch(`${char.homeworld}?format=json`);
      const planet = await res.json();

      return {
        name: char.name,
        planet: planet.name,
        species,
      };
    });

    return Promise.all(charList);
  }

  function handleClick(e, film) {
    if (activeIndex !== film.episode_id) {
      fetchCharacters(film.characters).then((chars) => setChars(chars));
    }
    const newIndex = activeIndex === film.episode_id ? -1 : film.episode_id;
    setActiveIndex(newIndex);
  }

  return (
    <>
      {films
        .sort((a, b) => a.episode_id - b.episode_id)
        .map((film) => {
          return (
            <Segment key={film.episode_id}>
              <Accordion>
                <Accordion.Title
                  index={film.episode_id}
                  active={activeIndex === film.episode_id}
                  onClick={(e) => handleClick(e, film)}
                >
                  <Header>{film.title}</Header>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === film.episode_id}>
                  <Image src={`/images/${film.episode_id}.jpeg`} />
                  <ul>
                    <li>
                      <b>Release Date: </b>
                      {film.release_date}
                    </li>
                    <li>
                      <b>Director: </b>
                      {film.director}
                    </li>
                    <li>
                      <b>Producer: </b>
                      {film.producer}
                    </li>
                    <li>
                      <b>Opening Crawl: </b>
                      {film.opening_crawl}
                    </li>
                  </ul>
                  <Card.Group
                    stackable
                    itemsPerRow="3"
                    centered
                    items={chars ? mapCharactersToItems(chars) : []}
                  />
                </Accordion.Content>
              </Accordion>
            </Segment>
          );
        })}
    </>
  );
}

export default Films;
