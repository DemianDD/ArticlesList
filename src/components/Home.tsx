import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Article } from './article/Article';
import IArticle from '../models/IArticle';
import { useEffect } from 'react';
import { Search } from './search/Search';
import { AddArticle } from './article/AddArticle';
import { actionCreators } from '../store/Articles';
import { ApplicationState } from '../store';

interface ISearchState {
  filteredArray: IArticle[];
  searchQuerry: string;
}

export const Home = () => {
  const [article, setArticle] = React.useState<(IArticle)[]>([]);
  const [windowAddArticle, setWindowAddArticle] = React.useState(false);

  const openArticlePanel = () =>{
    setWindowAddArticle(!windowAddArticle);
  }

  const hideArticlePanel = () =>{
    setWindowAddArticle(false);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCreators.clear());
  }, []);

  return(
    <div className='centered'>
      <div className='rowStyle'>
        <button onClick={openArticlePanel}>Add Article</button>
        <Search/>
      </div>
      <Article canUpdate={true} />
      {windowAddArticle && <AddArticle hideArticlePanel={hideArticlePanel} />}
    </div>
  )
};
;
export default connect(
  (state: ApplicationState) => state.article,
  actionCreators
)(Home);