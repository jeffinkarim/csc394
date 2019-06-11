import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register.jsx';
import Signin from './Signin.jsx';
import SSignedin from './SSignedin.jsx';
import PSignedin from './PSignedin.jsx';
import { HashRouter, Route, Switch } from 'react-router-dom';

const NoMatch = () =><p>The information you provide is wrong</p>;
const RoutedApp = () => (
	<HashRouter>
	   <Switch>
	    <Route exact path="/" component={Signin} />
		<Route exact path="/Register" component={Register} />
		<Route exact path="/SSignedin" component={SSignedin} />
		<Route exact path="/PSignedin" component={PSignedin} />
		<Route path="/404" component={NoMatch} />
       </Switch>
	</HashRouter>
);

ReactDOM.render(<RoutedApp />, document.getElementById('contents'));