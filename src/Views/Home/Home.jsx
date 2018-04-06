import React from 'react';
import {Grid, Row, Col, PanelGroup, Panel} from 'react-bootstrap';

const Home = (props) => {
  return (
    <div>
      <Grid>
        <Row className="show-grid">
          <Col md={9}>
            <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="2">
              <Panel eventKey="1">
                <Panel.Heading>
                  <Panel.Title toggle>Channel Details</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Channel Details< data</Panel.Body>
              </Panel>
            </PanelGroup>
          </Col>
          <Col md={3}>
            <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="2">
              <Panel eventKey="1">
                <Panel.Heading>
                  <Panel.Title toggle>Channel Search Results</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Channel Search data</Panel.Body>
              </Panel>
            </PanelGroup>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={12}>
            <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="2">
              <Panel eventKey="1">
                <Panel.Heading>
                  <Panel.Title toggle>Video Stats</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible> Video Stats data</Panel.Body>
              </Panel>
            </PanelGroup>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={12}>
            <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="2">
              <Panel eventKey="1">
                <Panel.Heading>
                  <Panel.Title toggle>Video Stats Graph</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible> Video Stats Graph data</Panel.Body>
              </Panel>
            </PanelGroup>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};
export default Home;
