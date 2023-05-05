import * as React from 'react';
import IArticle from '../../models/IArticle';
import "./Article.css"
import { connect, useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { ArticleState, actionCreators } from '../../store/Articles';

interface IProps {
  canUpdate?: boolean;
}

export const Article = (props: IProps) => {
  const dispatch = useDispatch();
  const articles = useSelector<ApplicationState, IArticle[]>(store => store.article.articles);

  const viewArticles = articles.map((a, index) => {
    return(
      <div key={index} className='articleStyle'>
          <div className='relativePos'>
            <img className='image' src={a.image}/>
            {props.canUpdate && <button className='btnDelete' onClick={() => dispatch(actionCreators.remove(index))}>delete</button>}
            {props.canUpdate && <button className='btnPin' onClick={() => dispatch(actionCreators.pin(index))}>Pin</button>}

          </div>

          <div className="title" > 
            {a.title}
          </div>

          <div className="author" >
            {a.author}
          </div>

          <div className="desc">
            {a.description}
          </div>
      </div>
    )
  })

  return(
    <div className='rowStyle '>
      {viewArticles}
    </div>
    
  )
}

connect(
  (state: ApplicationState) => state.article,
  actionCreators
)(Article);