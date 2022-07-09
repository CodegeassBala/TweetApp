import React from 'react'
import App from './App'
import {ApolloClient,InMemoryCache,createHttpLink,ApolloProvider} from '@apollo/client'
import {setContext} from 'apollo-link-context';

//This file consists the code which connects our client side componnts to the serverSide which is our Apollo in our case.

const httpLink = createHttpLink({
    uri:'http://localhost:5000'
});

const authLink = setContext(()=>{
    const token = localStorage.getItem('token');//this is to be done so that we can access it  any time
    return{
        headers:{
            Authorization:token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache:new InMemoryCache()
});



export default (
    <ApolloProvider client={client}>
    <App/>
    </ApolloProvider>
)