import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className={`ml-auto ${styles.CenteredDropdown}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto ${styles.CenteredDropdown}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className={`${styles.DropdownLeft} ${styles.DropdownItem}`}>
        <Dropdown.Item
          onClick={() => history.push(`/profile/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit"/>
          <span>Edit Profile</span> 
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profile/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          <span>Change Username</span> 
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profile/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />
          <span className="text-black text-decoration-none">Change Password</span> 
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};