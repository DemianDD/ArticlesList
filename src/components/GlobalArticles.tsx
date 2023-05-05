import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import IArticle from '../models/IArticle';
import { Article } from './article/Article';
import { useEffect } from 'react';
import { ApplicationState } from '../store';
import { actionCreators } from '../store/Articles';


const apiKey = "fd84bb01da3446d5955d577e16ceab99";

const getArticles = async (): Promise<IArticle[]> => {
    const data = await fetch(`https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=${apiKey}`).then(a => a.json());
    return data.articles;
}

export const GlobalArticles = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionCreators.clear());
    }, []);

    const get = () => {
        getArticles().then(ar => {
            const toAdd = ar.sort(() => Math.random() - 0.5).filter((value, index, array) => array.indexOf(value) === index).splice(0, 10);
            dispatch(actionCreators.add(...toAdd));
        })
    }
    
    return(
        <div>
            <button onClick={get}>show more</button>
            <Article />
        </div>
    )
};

export default connect(
    (state: ApplicationState) => state.article,
    actionCreators
)(GlobalArticles);