import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import QuoteForm from '../components/quotes/QuoteForm'

import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

export const NewQuote = () => {
    const { sendRequest, status } = useHttp(addQuote);
    console.log('ADD-QUOTE', addQuote);
    console.log('status', status);
    const history = useHistory();

    useEffect(() => {
      if (status === 'completed') {
        console.log('status', status);
        history.push('/quotes');

      }
      console.log('useEffect en NewQuote');
    
      
    }, [status, history])
    

    const addQuoteHandler = quoteData => {
      console.log('QUOTE-DATA_newQuote.js', quoteData);
      sendRequest(quoteData)

        //history.push('/quotes');
    }

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
  )
}
