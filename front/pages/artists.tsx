import Image from 'next/image';
import Nav from '../components/nav';
import Link from 'next/link';

const Artists = ({ artists, error, genres }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }



  console.log(artists)

  // console.log(artists)
  // console.log(artists)
  // console.log(genres)
  // console.log("genre : " + JSON.stringify(genres.data[1].attributes.name))
  return (
    <>
    <ul>
      {artists.data.map(artist => (
        <li key={artist.id}>
          <Link href={`/artist/${artist.attributes.slug}`}>
          <h2>{artist.attributes.name}</h2>
          </Link>
          <h3>{artist.attributes.description}</h3>
          <h4>{artist.attributes.genres.data?.attributes.name}</h4>
            <Image 
                src={`${process.env.baseUrl}` + artist.attributes.image.data?.attributes.url}
                alt="artist image"
                width={500} 
                height={500}
            />
            <Image 
                src={`${process.env.baseUrl}` + artist.attributes.artwork.data?.attributes.url}
                alt="artwork image"
                width={500}
                height={500}
            />
        </li>
      ))}
    </ul>
    </>

  );
};

export async function getStaticProps() {
  // Fetch data from first endpoint
  const response = await fetch(`${process.env.baseApiUrl}/artists?populate=*`);
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

export default Artists;
