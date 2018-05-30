import React from 'react';
import { Route } from 'react-router-dom';

import Schedule from './Schedule';
import './index.css';

const Board = ({ match }) => (
  <div className="Dashboard">
    <header className="Dashboard-header">
      <h1 className="Dashboard-title">Dashboard</h1>
    </header>
    <p className="Dashboard-intro">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>

    <Route exact path={`${match.url}/schedule`} component={Schedule} />
  </div>
);

export default Board;
