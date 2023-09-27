import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Asset from "../../components/Asset";
import Sidebar from "../../components/Sidebar";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ContainersPublic({ message }) {
  const [containers, setContainers] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const { data } = await axiosReq.get(`/containers/?is_public=true&search=${query}`);
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
  }, [query, currentUser]);

  return (
    <div className={styles.ScrollableContainer} fluid>
      <Container className={styles.PostsPage} fluid>
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col xs={8}>
            <Row className="h-100">
              <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form
                  className={styles.SearchBar}
                  onSubmit={(event) => event.preventDefault()}
                >
                  <Form.Control
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
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
                          <ListGroup.Item key={container.id}>
                            <Container {...container} />
                          </ListGroup.Item>
                        ))}
                        dataLength={containers.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!containers.next}
                        next={() => fetchMoreData(containers, setContainers)}
                      />
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
