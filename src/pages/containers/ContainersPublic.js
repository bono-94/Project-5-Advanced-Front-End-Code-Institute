import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Asset from "../../components/Asset";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import appStyles from "../../App.module.css";
import styles from "../../styles/Container.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router";

function ContainersPublic({ message, filter = "" }) {
  const [containers, setContainers] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const { data } = await axiosReq.get(`/containers/public/?${filter}search=${query}`);
        console.log('API Response:', data);
        setContainers(data);
        setHasLoaded(true);
        
      } catch (err) {
        // Handle errors if necessary
        console.error(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchContainers();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <div className={styles.ScrollableContainer} fluid>
      <Container className={styles.ContainersPublic} fluid>
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col xs={8}>
            <Row className="h-100">
              <Col className={`py-2 p-0 p-lg-2 ${styles.ContainerList}`} lg={8}>
                <PopularProfiles mobile />
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form
                  className={styles.SearchBar}
                  onSubmit={(event) => event.preventDefault()}
                >
                  <Form.Control
                    value={query}
                    onChange={(event) => setQuery(event.target.value)} // Handle search input change
                    type="text"
                    className="mr-sm-2"
                    placeholder="Search containers..."
                  />
                </Form>

                {hasLoaded ? (
                  <>
                    {containers.results.length ? (
                      <InfiniteScroll
                      children={containers.results.map((container) => (
                        <Container key={container.id} {...container} setContainers={setContainers} />
                      ))}
                        dataLength={containers.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!containers.next}
                        next={() => fetchMoreData(containers, setContainers)}
                      >
                        {containers.results.map((container) => (
                          <Link
                            key={container.id}
                            to={`/container/${container.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <ListGroup.Item action className={styles.ContainerItem}>
                            <div className={styles.ContainerHeader}>
                              <h4>{container.container_name}</h4>

                       
                              <span className={styles.ContainerOwner}>
                                {container.owner ? `Owner: ${container.owner}` : 'Owner: Unknown'}
                                {container.is_owner ? (
                                  <i className="fas fa-user" title="Owner"></i>
                                ) : (
                                  <i className="fas fa-globe" title="Public"></i>
                                )}
                              </span>
                            </div>
                              <p>{container.description}</p>
                              <div className={styles.ContainerFooter}>
                                <span className={styles.ContainerInfo}>{container.container_info}</span>
                                <span className={styles.ContainerCreatedAt}>
                                  <i className="far fa-clock" title="Created At"></i>
                                  {new Date(container.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </ListGroup.Item>
                          </Link>
                        ))}
                      </InfiniteScroll>
                    ) : (
                      <Container className={appStyles.Content}>
                        <Asset src={NoResults} message={message} />
                      </Container>
                    )}
                  </>
                ) : (
                  <Container className={appStyles.Content}>
                    <Asset spinner />
                  </Container>
                )}
              </Col>
              <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContainersPublic;