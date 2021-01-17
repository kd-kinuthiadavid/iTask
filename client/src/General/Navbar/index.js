import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const ItNavbar = () => {
  const [state, setState] = useState({
    isOpen: false,
  });

  const toggleNav = () =>
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
    }));
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">iTask</NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>login</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default ItNavbar;
