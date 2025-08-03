import { useEffect, useState } from "react";
import "./Pokemon.css";
import { Pokemon2 } from "./Pokemon2";

export default function Pokemon() {
  const [poki, setPoki] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  const url = "https://pokeapi.co/api/v2/pokemon?limit=60";
  let pokemons = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      const allUrl = data.results.map(async (item) => {
        const res = await fetch(item.url);
        const data = await res.json();

        return data;
      });

      const finaldata = await Promise.all(allUrl);
      setPoki(finaldata);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    pokemons();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  const handel = (e) => {
    setInput(e.target.value);
  };

  const searchData = poki.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <section className="container">
        <header>
          <h1> Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search pokemon"
            value={input}
            onChange={handel}
            name=""
            id=""
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => {
              return <Pokemon2 key={curPokemon.id} pokemonData={curPokemon} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
