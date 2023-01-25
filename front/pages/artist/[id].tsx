import { useRouter } from 'next/router';
import Image from 'next/image';

const Artist = ({ artist }) => {
    const router = useRouter();

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
                {/* <h1>{artist.data.attributes.name}</h1> */}
                {/* <h2>{artist.attributes.genres.data?.attributes.name}</h2> */}
                {/* <h3>{artist.data.attributes.description}</h3> */}
                {/* <Image 
                src={`${process.env.baseUrl}` + artist.attributes.artwork.data?.attributes.url}
                alt="artist image"
                width={500} 
                height={500}
            /> */}
            {/* <Image 
                src={`${process.env.baseUrl}` + artist.attributes.artwork.data?.attributes.url}
                alt="artwork image"
                width={500}
                height={500}
            /> */}
            </div>
        </section>
        </>
    )
}

export async function getServerSideProps({query}) {
    const res = await fetch(`${process.env.baseApiUrl}/artists/${query.id}?populate=artwork,image,genres`);
    if(res.ok) {
        const artist = await res.json();
        const res2 = await fetch(`${process.env.baseApiUrl}/genres`);
        if(res2.ok) {
            const genres = await res2.json();
            return {
                props: {
                    artist: artist.data,
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

export default Artist;