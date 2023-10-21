import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

import { useParams, Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import ContainerComponent from "./Container";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PopularProfiles from "../profiles/PopularProfiles";

import styles from "../../styles/Container.module.css";

function ContainerPage() {
  const { id } = useParams();
  const [container, setContainer] = useState({});
  const [posts, setPosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  window.scrollTo(0, 0);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: container }, { data: posts }] = await Promise.all([
          axiosReq.get(`/container/${id}`),
          axiosReq.get(`/posts/?containers=${id}`), // Include containers parameter
        ]);
        setContainer(container);
        setPosts(posts);
      } catch (err) {
        console.error(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100 justify-content-between">
      <Col className="py-2 p-0 p-lg-2" lg={7} xxl={4}>
        <PopularProfiles mobile />
        <Col className="mt-5">
          <ContainerComponent {...container} setContainer={setContainer} />
        </Col>
      </Col>
      <Col lg={3} className="d-none d-lg-block p-0 p-lg-2 mt-5 mr-lg-3 mr-xl-5">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ContainerPage;
