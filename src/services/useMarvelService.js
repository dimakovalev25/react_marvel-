import {useHttp} from "../hooks/http.hook";


const UseMarvelService = () => {

    const {loading, request, error} = useHttp();

    // const getResource = async (url) => {
    //     let res = await fetch(url);
    //     if (!res.ok) {
    //         throw new Error(`not fetch ${url}, status ${res.status}`);
    //     }
    //     return await res.json();
    // }

    const _baseOffsetComics = Math.floor(Math.random() * (200 - 4)) + 4;

    const getAllCharacters = async () => {
        let offset = Math.floor(Math.random() * (1000 + 1) - 1)
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=1fd8ade1e96af8446fb8bdaba6ce867d`);
        return res.data.results;
    }

    const getCharacter = async (id) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=1fd8ade1e96af8446fb8bdaba6ce867d`);

        return _transformCharacter(res);
    }


    const getAllComics = async () => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${_baseOffsetComics}&apikey=1fd8ade1e96af8446fb8bdaba6ce867d`);
        return res.data.results;
    }

    const _transformCharacter = (res) => {
        return {
            name: res.data.results[0].name,
            description: res.data.results[0].description,
            thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
            homepage: res.data.results[0].urls[0].url,
            wiki: res.data.results[0].urls[1].url,
            comics: res.data.results[0].comics.items.splice(0, 10),
        }
    }

    return {loading,error, getCharacter, getAllCharacters, getAllComics};

}

export default UseMarvelService;














