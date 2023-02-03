import Image from 'next/image';
import Nav from '../components/nav';
import Link from 'next/link';

const Home = ({ artists, error, genres }) => {

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  // console.log(artists)
  console.log(artists)
  // console.log(genres)
  // console.log("genre : " + JSON.stringify(genres.data[1].attributes.name))
  return (
    <>
    <section id="homepage">
      <h1>ELECTRONIC MUSIC ARTISTS PLAYLIST</h1>
      <Link href="/artists">Discover our artists here</Link>
    </section>
    </>

  );
};

export async function getStaticProps() {
  // Fetch data from first endpoint
  const response = await fetch(`${process.env.baseApiUrl}/artists?populate=artwork,image,genres`);
  const artists = await response.json();

  // Fetch data from second endpoint
  const res2 = await fetch(`${process.env.baseApiUrl}/genres`);
  const genres = await res2.json();

  // Return the data as props
  return {
    props: {
      artists,
      genres
    },
  }

//   const [data1, data2] = await Promise.all([
//     fetch('https://your-api.com/endpoint1').then(res => res.json()),
//     fetch('https://your-api.com/endpoint2').then(res => res.json())
// ])
}

export default Home;
