import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/Houses.scss';

type House = {
  name: string,
  members: [
    {
      name: string,
      slug: string,
    }
  ],
};

const baseUrl = 'https://game-of-thrones-quotes.herokuapp.com/v1/houses';

const Houses = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios.get(baseUrl)
      .then(({ data }: AxiosResponse<House[]>) => {
        setHouses(data);
      }).catch(() => {
        navigate('../../404');
      });
  }, []);

  return (
    <div className="houses__container">
      <h1 className="heading1">List of Houses</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
      }}
      >
        <input
          type="search"
          value={searchParams.get('filter') || ''}
          onChange={(e) => {
            setSearchParams(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
      <div className="houses__wrapper">
        {houses.filter((item) => item.name
          .toLowerCase() || item.members
          .find((character) => character.name.toLowerCase()))}
        {houses.map(({ name, members }) => (
          <div className="houses__content" key={name}>
            <h3 className="heading3 heading3-house">{name}</h3>
            {members.map((member) => (
              <Link className="links links-house" key={member.slug} to={`/characters/${member.slug}`}>
                <h4 className="heading4">{member.name}</h4>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Houses;
