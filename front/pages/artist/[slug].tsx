import { useRouter } from 'next/router';
import Image from 'next/image';

const Artist = ({ artist }) => {
    const router = useRouter();

    const detectUrl = (url) => {
        const longYoutubeUrl = JSON.parse(artist.attributes.oembed).url.replace(
          "watch?v=",
          "embed/"
        );
    
        const shortYoutubeUrl = JSON.parse(artist.attributes.oembed).url.replace(
          "youtu.be/",
          "youtube.com/embed/"
        );
    
        if (url.includes("watch?v=")) {
          return longYoutubeUrl;
        } else return shortYoutubeUrl;
      };

    console.log("artist :" + artist)
    return (
        <>
        <section>
            <div>
            <h1>{artist.attributes.name}</h1>
            <h2>{artist.attributes.genres.data?.attributes.name}</h2>
            <p>{artist.attributes.description}</p>
            
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

<div>
              {artist.attributes.oembed && (
                <iframe
                  src={detectUrl(JSON.parse(artist.attributes.oembed).url)}
                ></iframe>
              )}
            </div>
              
            </div>
        </section>
        </>
    )
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.baseApiUrl}/artists`);
  const artists = await res.json();

  const paths = artists.data.map((artist) => {
      return {
          params: { slug: artist.attributes.slug }
      }
  })

  return {
      paths,
      fallback: false
  }
}

export async function getStaticProps({params}) {
  const res = await fetch(`${process.env.baseApiUrl}/artists?filter[slug]=${params.slug}&populate=artwork,image,genres`);
  if(res.ok) {
      const artist = await res.json();
      const res2 = await fetch(`${process.env.baseApiUrl}/genres`);
      if(res2.ok) {
          const genres = await res2.json();
          return {
              props: {
                  artist: artist.data[0],
                  genres: genres.data
              }
          }
      }else {
          // handle error
      }
  }else {
      // handle error
  }
}




// export async function getServerSideProps({query}) {
//     const res = await fetch(`${process.env.baseApiUrl}/artists/${query.id}?populate=artwork,image,genres`);
//     if(res.ok) {
//         const artist = await res.json();
//         const res2 = await fetch(`${process.env.baseApiUrl}/genres`);
//         if(res2.ok) {
//             const genres = await res2.json();
//             return {
//                 props: {
//                     artist: artist.data,
//                     genres: genres.data
//                 }
//             }
//         }else {
//             // handle error
//         }
//     }else {
//         // handle error
//     }
// }

export default Artist;