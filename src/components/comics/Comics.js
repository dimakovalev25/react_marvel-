import './Comics.scss'
import {Link} from "react-router-dom";
import avengers from '../../resources/img/Avengers.png'
import avengersLogo from '../../resources/img/Avengers_logo.png'
import {useState, useRef, useEffect} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import SpinnerBigComics from "../spinner/SpinnerBigComics";

const Comics = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(1);

    const {loading, error, getAllComics} = MarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllComics(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemsLoading(NewItemsLoading => false);
        setOffset(offset => offset + 8)
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    const comicsItem = comicsList.map((item, i) => {
        return (
            <Link to={`/comics/${item.id}`}>
                <div className='randomComics__activ'
                     key={item.id}
                     ref={el => itemRefs.current[i] = el}
                     onClick={() => {
                         focusOnItem(i)
                     }}

                >
                    <img className="randomComics__active__img"
                         src={item.thumbnail.path + '.' + item.thumbnail.extension}
                         alt={item.name}/>
                    <div className="randomComics__active__img__info">
                        <p>{item.title}</p>
                        <p className="randomComics__active__img__price">Price: Not found</p>
                    </div>

                </div>


            </Link>
        )
    })

    const spinner = loading && !newItemsLoading ? <SpinnerBigComics/> : null;

    return (
        <div className="randomComics">
            <div className="randomComics__static">
                <p className="randomComics__title">New comics every week! <br/>
                    Stay tuned!</p>
                <img src={avengers} alt="avengers" className="randomComics__decoration"/>
                <img src={avengersLogo} alt="avengersLogo" className="randomComics__decoration__logo"/>
            </div>

            <div className='randomComics__active'>
                {spinner}
                {comicsItem}

            </div>

            <button
                className="button button__main button__long"
                // disabled={newItemsLoading}
                onClick={() => onRequest()}

            >
                <div className="inner button__comics">load more</div>
            </button>
        </div>
    )
}

export default Comics;