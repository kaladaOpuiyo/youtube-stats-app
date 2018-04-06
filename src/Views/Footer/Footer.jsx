import React from 'react';
import {Navbar} from 'react-bootstrap';

const Footer = (props) => {

  return (
    <div>
      <Navbar fixedBottom="true" >
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text pullRight>
            Copyright Kalada Opuiyo 2018 | <Navbar.Link href="#">Contact Me</Navbar.Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Footer;
