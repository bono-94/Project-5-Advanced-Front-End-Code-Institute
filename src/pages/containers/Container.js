import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import ContainerPosts from "./ContainerPosts";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "../../styles/Container.module.css";


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
    is_public,
    is_owner,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner_user = currentUser?.username === owner;
  const history = useHistory();
  const [containerNames, setContainerNames] = useState([]);
  const [knowledgeItems, setKnowledgeItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  window.scrollTo(0, 0);

  const handleEdit = () => {
    history.push(`/container/${id}/edit/`);
    window.scrollTo(0, 0);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/container/${id}/`);
      history.push(history.push("/", { successMessage: "Successfully deleted your container!" }));
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Container}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profile/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            <div className={`d-block d-sm-inline ${styles.Owner}`}>
              {owner}
            </div>     
          </Link>
          <i className={`fas fa-box-open fa-3x ${styles.BoxIcon}`}></i>
        </Media>
      </Card.Body>
      <Card.Title className={`ms-sm-5 text-center ${styles.Underline}`}>
        {container_name}
      </Card.Title>
      <Card.Text  className={styles.SubTitle}>
        {container_info}
      </Card.Text>
      <Card.Footer className="m-sm-1">
        <div className="d-flex align-items-center justify-content-between mb-3">
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
        {is_owner_user && (
            <MoreDropdown
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
        <ListGroup>
          <ListGroup.Item variant="light" disabled>
            <ContainerPosts />
          </ListGroup.Item>
          {knowledgeItems.map((knowledgeItem) => (
            <ListGroup.Item key={knowledgeItem.id}>
              <Link to={`/knowledge/${knowledgeItem.id}`}>
                {knowledgeItem.title}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Footer>
      <div className={styles.Created}>
        <span className=" ms-1 ms-sm-3">Created: {created_at}</span>
      </div>
    </Card>
  );
};

export default Container;