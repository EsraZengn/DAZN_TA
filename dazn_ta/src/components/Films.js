import React, { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';

function Films() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchFilms() {
      try {
        const data = await fetch('https://swapi.co/api/films/?format=json');
        const { results } = await data.json();
        setFilms(results);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchFilms();
  });

  function mapFilmsToItems(films) {
    return films
      .sort((a, b) => a.episode_id - b.episode_id)
      .map((film) => ({
        header: film.title,
        image: { src: `/images/${film.episode_id}.jpeg`, style: { width: '50%' } },
        meta: film.release_date,
        color: 'grey',
        fluid: true,
        childKey: film._id,
        href: ``,
        description: `${film.opening_crawl}`,
        wrapped: true,
      }));
  }

  return <Card.Group stackable itemsPerRow="3" centered items={mapFilmsToItems(films)} />;
}

export default Films;
