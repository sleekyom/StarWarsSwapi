import { gql, useQuery } from "@apollo/client";

const ALL_FILMS = gql`
  query Query {
    allFilms {
      films {
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
            homeworld {
              name
            }
          }
        }
      }
    }
  }
`;
const AllFilms = () => {
  const { data, loading, error } = useQuery(ALL_FILMS);
  if (loading) return "Loading ...";
  if (error) return `Error... ${error.message}`;
  return (
    <div>
      <h4>Swapi Films</h4>
      {/* Show the films title, director and release date */}
      {data?.allFilms?.films?.map((film, index) => (
        <div key={index}>
          <div>
            <b>Title:</b> {film.title}
          </div>
          <div>
            <b>Director:</b> {film.director}
          </div>
          <div>
            <b>Release Date:</b> {film.releaseDate}
          </div>
          {/* Show the films species connection */}
          {film.speciesConnection.species.map((specie, index) => (
            <div key={index}>
              <span>Species Connection: {specie.name}</span>
              <span role="img" aria-label="ghost">
                {" "}
                👻{" "}
              </span>
              <span>Species classification: {specie.classification}</span>
              <br />
            </div>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AllFilms;
