import React, { useEffect, useState } from "react";
import styles from "../../styles/Container.module.css";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";

const Container = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    containers,
    container_name,
    container_info,
    created_at,
    updated_at,
    is_public
    /* Add other props specific to Container model here */
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [containerNames, setContainerNames] = useState([]);
  const [knowledgeItems, setKnowledgeItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    history.push(`/container/${id}/edit/`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/container/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };


  // Fetch container names based on the container IDs
  useEffect(() => {
    const fetchContainerNames = async () => {
      try {
        const containerNamePromises = containers.map(async (containerId) => {
          const response = await axiosRes.get(`/container/${containerId}/`);
          return response.data.container_name;
        });

        const containerNameResults = await Promise.all(containerNamePromises);
        setContainerNames(containerNameResults);
      } catch (err) {
        // Handle errors if necessary
        console.error(err);
      }
    };

    // Call the function to fetch container names
    fetchContainerNames();
  }, [containers]);


  return (
    <Card className={styles.Container}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profile/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}            
          </Link>
          <div>
            <span>Created: {created_at}</span>
            <span>Updated: {updated_at}</span>
          </div>
          {/* Add Container Icon */}
          <i className="fas fa-box-open"></i>
        </Media>
      </Card.Body>
      {/* Container Name */}
      <Card.Title>NAme:{container_name}</Card.Title>
      {/* Container Description */}
      <Card.Text>Info:{container_info}</Card.Text>
      <Card.Footer>
        {/* Privacy or Global Icon based on is_public */}
        {is_public ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>This container is public.</Tooltip>}
          >
            <i className="fas fa-globe"></i>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>This container is private.</Tooltip>}
          >
            <i className="fas fa-lock"></i>
          </OverlayTrigger>
        )}

        <ListGroup>
          <ListGroup.Item variant="light" disabled>
            Knowledge
          </ListGroup.Item>
          {knowledgeItems.map((knowledgeItem) => (
            <ListGroup.Item key={knowledgeItem.id}>
              {/* Display knowledge item details here */}
              <Link to={`/knowledge/${knowledgeItem.id}`}>
                {knowledgeItem.title}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="d-flex align-items-center">
            
            {is_owner && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
      </Card.Footer>
    </Card>
  );
};

export default Container;