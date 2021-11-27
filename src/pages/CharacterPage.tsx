import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/CharacterPage.scss';

type CharacterType = {
  name: string,
  slug: string,
  house: {
    slug: string,
    name: string,
  },
  quotes: string[],
}

const CharacterPage = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const navigate = useNavigate();
  const { slug } = useParams<'slug'>();

  useEffect(() => {
    axios.get(`https://game-of-thrones-quotes.herokuapp.com/v1/character/${slug}`)
      .then(({ data }: AxiosResponse<CharacterType[]>) => {
        setCharacters(data);
      }).catch(() => {
        navigate('../../404');
      });
  }, []);

  return (
    <div className="container">
      {characters.map((character) => (
        <div key={character.slug}>
          <h1 className="heading1">{character.name}</h1>
          <h3 className="heading2">{character.house.name}</h3>
          <h4 className="heading4">Quotes:</h4>
          <ul className="quotes__List">
            {character.quotes.map((quote) => (
              <li key={quote}>{quote}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CharacterPage;
