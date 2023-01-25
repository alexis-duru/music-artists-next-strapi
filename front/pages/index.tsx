import Image from 'next/image';
import Nav from '../components/nav';

const Home = ({ artists, error, genres }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  // console.log(artists)
  console.log(artists)
  console.log(genres)
  // console.log("genre : " + JSON.stringify(genres.data[1].attributes.name))
  return (
    <>
    <ul>
      {artists.data.map(artist => (
        <li key={artist.id}>
          <h2>{artist.attributes.name}</h2>
          <h3>{artist.attributes.description}</h3>
          <h4>{artist.attributes.genres.data?.attributes.name}</h4>
          <img src={'http://localhost:1337' + artist.attributes.image.data?.attributes.url} alt="toto"  width={500} height={500}/>
          <img src={'http://localhost:1337' + artist.attributes.artwork.data?.attributes.url} alt="toto"  width={500} height={500}/>
          {/* <h4>{artist.attributes.genre}</h4> */}
           {/* {console.log(artist.attributes.image.data?.attributes.url)} */}
          {/* <Image src={artist.attributes.image.data?.attributes.url}
          alt="toto"
          width={500}
          height={500}
          /> */}
        </li>
      ))}
    </ul>
    </>

  );
};

export async function getStaticProps() {
  // Fetch data from first endpoint
  const response = await fetch('http://localhost:1337/api/artists?populate=artwork,image,genres');
  const artists = await response.json();

  // Fetch data from second endpoint
  const res2 = await fetch('http://localhost:1337/api/genres');
  const genres = await res2.json();

  // Return the data as props
  return {
    props: {
      artists,
      genres
    },
  }
}

// Home.getInitialProps = async ctx => {
//   try {

//     const parseJSON = resp => (resp.json ? resp.json() : resp);

//     const checkStatus = resp => {
//       if (resp.status >= 200 && resp.status < 300) {
//         return resp;
//       }

//       return parseJSON(resp).then(resp => {
//         throw resp;
//       });
//     };

//     const headers = {
//       'Content-Type': 'application/json',
//     };

//     const artists = await 
//     fetch('http://localhost:1337/api/artists?populate=artwork,image',  {
//       method: 'GET',
//       headers,
//     })
//       .then(checkStatus)
//       .then(parseJSON);

//     const genres = await
//     fetch('http://localhost:1337/api/genres',  {
//       method: 'GET',
//       headers,
//     })
//       .then(checkStatus)
//       .then(parseJSON);

//     return { artists };

//   } catch (error) {
//     return { error };
//   }

// };


export default Home;
