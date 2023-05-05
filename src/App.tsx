import * as React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import './custom.css'
import GlobalArticles from './components/GlobalArticles';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/global' component={GlobalArticles} />
    </Layout>
);
