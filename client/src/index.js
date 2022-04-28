import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloProvider, ApolloClient,
  InMemoryCache
} from "@apollo/client";
import { createHttpLink } from '@apollo/client';
import { Provider } from 'react-redux';
import reduxStore from './Store';
import { ApolloLink } from '@apollo/client';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';


// const customFetch =  (uri,options)=>{
//   return axios(uri,{...options},{headers: ''})
// }
// 
const client = new ApolloClient({
  uri: process.env.NODE_ENV == "production" ? window.location.origin + "/api-graphql" : 'http://localhost:3610/api-graphql',
  cache: new InMemoryCache()
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={reduxStore}>
          <App />
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
