import React from 'react';
import {Navbar, Button, FormGroup, FormControl} from 'react-bootstrap';

const Header = (props) => {

  return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Youtube Channel Statisics</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight inline>
            <FormGroup >
              <FormControl type="text" placeholder="Search here..." />
            </FormGroup>{' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );

};

export default Header;

