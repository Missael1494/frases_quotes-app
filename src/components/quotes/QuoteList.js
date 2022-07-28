import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    /*console.log('quoteA', String(quoteA.id).charCodeAt(0));
    console.log('quoteB', String(quoteB.id).charCodeAt(0));
    /*const numbers = [5, 2, 100, 4];

    const sortednumbers = numbers.sort((a, b) => {
      
      console.log(numbers);
      console.log('A', a);
      console.log('B', b);

      if(a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    })
    console.log(sortednumbers); 

    console.log('quotes', quotes);
    console.log('quoteA', quoteA);
    console.log('quoteB', quoteB);*/

    if (ascending) {
      console.log(quoteA.id > quoteB.id);
      return quoteA.id > quoteB.id ? 1 : -1; 
    } else {
      console.log(quoteA.id < quoteB.id);
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  console.log('location', location);
  console.log('History', history);


  const queryParams = new URLSearchParams(location.search);
  console.log('queryParams', queryParams);

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending)
  console.log('PROP-QUOTES', props.quotes)
 
  console.log( 'isSortingAscending', isSortingAscending);

  const changeSortingHandler = () => {
    //history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'));
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    });


    //history.push(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}`);

  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
