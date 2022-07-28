import React, {useEffect} from 'react'
import { Route, Link, useRouteMatch } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { Fragment } from 'react/cjs/react.production.min'
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';



/*const DUMMY_QUOTES = [
  { id: 'q1', author: 'Max', text: 'Learning React is fun!'},
  { id: 'q2', author: 'Maximilian', text: 'Learning React is great!'},
]*/

export const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();



    const { quoteId } = params;

    console.log('PARAMS',  params);

  console.log('quoteId_PARAMS', quoteId);



    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true );

    useEffect(() => {
      sendRequest(quoteId);

    }, [sendRequest, quoteId]);

    if (status === 'pending') {
      return <div className='centered'>
        <LoadingSpinner />
      </div>
    }

    if (error) {
      return <p className='centered'>{error}</p>
    }

    console.log(match);

    //const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

    if (!loadedQuote.text) {
      return <p>No quote found!</p>
    }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      
      <Route path={`${match.path}/comments`}>
          <Comments />
      </Route>
    </Fragment>
  )
}
