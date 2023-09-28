import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams, Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import ContainerComponent from "./Container"; // Replace with your Container component
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

import styles from "../../styles/Container.module.css";


function ContainerPage() {
  const { id } = useParams();
  const [container, setContainer] = useState({});
  const [posts, setPosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: container }, { data: posts }] = await Promise.all([
          axiosReq.get(`/container/${id}`),
          axiosReq.get(`/posts/?containers=${id}`),
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
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <ContainerComponent {...container} setContainer={setContainer} />
        <Container className={appStyles.Content}>
          <h1>{container.container_name}</h1>
          {posts.results.length ? (
            <div className="mb-3">
              {posts.results.length} {posts.results.length === 1 ? "Post" : "Posts"}
            </div>
          ) : null}
          {posts.results.length ? (
            <ul>
              {posts.results.map((post) => (
                <li key={post.id}>
                  <Link to={`/posts/${post.id}`}>
                    <strong>{post.title}</strong> by {post.owner}
                  </Link>
                </li>
              ))}
            </ul>
          ) : currentUser ? (
            <span>Loading...</span>
          ) : (
            <span>No posts... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ContainerPage;