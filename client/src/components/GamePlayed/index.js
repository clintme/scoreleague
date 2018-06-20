import React from 'react';
import { Row, Col } from 'antd';
import './index.css';

const GamePlayed = (params) => {
  const { props: { matchList, isCreating } } = params;

  if (isCreating) {
    return <div></div>;
  }

  return (
  <div id="game-played">
    <Row>
      <Col span={11}>
        <div className="host">
          <div className="title">Sample</div>
          <div className="score">20</div>
        </div>
        <div className="action">
          <button>Score</button>
          <button>Time Out</button>
        </div>
      </Col>
      <Col span={11} offset={2}>
        <div className="guest">
          <div className="title">Sample</div>
          <div className="score">20</div>
        </div>
        <div className="action">
          <button>Score</button>
          <button>Time Out</button>
        </div>
      </Col>
    </Row>
  </div>
)};

export default GamePlayed;
