import {useHttp} from "../hooks/http.hook";

const MarvelService = () => {

    const {loading, request, error} = useHttp();
    // const _baseOffset = 210;
    const _baseOffset = Math.floor(Math.random() * (1300 - 4)) + 4;;
    // const _baseOffsetComics = 8;
    const _baseOffsetComics = Math.floor(Math.random() * (200 - 4)) + 4;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?limit=6&offset=${_baseOffset}&apikey=1fd8ade1e96af8446fb8bdaba6ce867d`);
        return res.data.results;
    }


    const getCharacter = async (id) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?&apikey=1fd8ade1e96af8446fb8bdaba6ce867d`);
        return _transformCharacter(res);
        // return res;
    }

    const getAllComics = async () => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${_baseOffsetComics}&apikey=1fd8ade1e96af8446fb8bdaba6ce867d`);
        return res.data.results;
    }



    const _transformCharacter = (res) => {
        return {
            name: res.data.results[0].name,
            description: res.data.results[0].description.length === 0 ? "Character description not available" : res.data.results[0].description,
            thumbnail: res.data.results[0].thumbnail.path + "." + res.data.results[0].thumbnail.extension,
            homepage: res.data.results[0].urls[0].url,
            wiki: res.data.results[0].urls[1].url,
            style: res.data.results[0].thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ? true : false,
            comics: res.data.results[0].comics.items.splice(10)
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics}
}

export default MarvelService;