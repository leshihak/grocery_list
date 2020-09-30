import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Page404 from './components/Page404/Page404';
import GroceryList from './containers/GroceryList/GroceryList';

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path='/grocerylist' component={GroceryList} />
                    <Route path='' component={Page404} />
                    <Route path='*' component={Page404} />
                    <Route component={Page404} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
