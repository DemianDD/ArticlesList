import * as React from 'react';
import IArticle from '../../models/IArticle';
import "./Article.css"
import { useState } from 'react';
import { ApplicationState } from '../../store';
import { actionCreators } from '../../store/Articles';
import { connect, useDispatch } from 'react-redux';

interface IProps {
    hideArticlePanel: () => void;
}

export const AddArticle = (props: IProps) => {

    const[imgUrl, setImgUrl] = useState("");
    const[title, setTitle] = useState("");
    const[author, setAuthor] = useState("");
    const[desc, setDesc] = useState("");
    const dispatch = useDispatch();

    const confirmAddingArticle = () => {
        dispatch(actionCreators.add({
            image: imgUrl,
            author: author,
            description: desc,
            title: title
        }));
      };

    return(
        <div className='addArticleStyle'>
            <div className='relativePos'>
                <input type="url" 
                value={imgUrl} 
                placeholder="Enter any image url" 
                className='image'
                onChange={(event) => setImgUrl(event.target.value)}/>
            </div>
            <div className="title" > 
                <input type="text" 
                placeholder="Enter Title"
                onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div className="author" >
                <input type="text" 
                placeholder="Enter Author"
                onChange={(event) => setAuthor(event.target.value)}/>
            </div>
            <div className="desc">
                <input type="text" 
                placeholder="Enter Description"
                onChange={(event) => setDesc(event.target.value)}/>
            </div>
            <div className='rowStyle'>
                <button className='flexStyle' onClick={confirmAddingArticle}>Add</button>
                <button className='flexStyle'onClick={props.hideArticlePanel}>Cancel</button>
            </div>
        </div>
    )
}


connect(
    (state: ApplicationState) => state.article,
    actionCreators
)(AddArticle);