import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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

import { logOut } from "../../redux/actions/authActions";

const ItNavbar = ({ auth, logOut }) => {
  const [state, setState] = useState({
    isOpen: false,
    showPrivateNavItems: false,
  });

  const toggleNav = () =>
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
    }));

  const handleLogout = (e) => {
    e.preventDefault();

    logOut();
  };

  useEffect(() => {
    if (auth.isAuthenticated !== undefined && auth.isAuthenticated === true) {
      setState((state) => ({
        ...state,
        showPrivateNavItems: true,
      }));
    }
  }, [auth]);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            iTask
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {state.showPrivateNavItems ? (
              <Link
                onClick={handleLogout}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                logout
              </Link>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                login
              </Link>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

ItNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(ItNavbar);
