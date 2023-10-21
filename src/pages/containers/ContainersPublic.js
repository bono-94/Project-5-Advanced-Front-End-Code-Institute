import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal"; 

import Asset from "../../components/Asset";
import Sidebar from "../../components/Sidebar";

import appStyles from "../../App.module.css";
// import styles from "../../styles/ContainersPublic.module.css";
import styles from "../../styles/PostsPage.module.css";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

const sortingOptions = [
  { field: "owner__username", label: "Sort by Owner (Ascending)" },
  { field: "-owner__username", label: "Sort by Owner (Descending)" },
  { field: "container_name", label: "Sort by Container Name (Ascending)" },
  { field: "-container_name", label: "Sort by Container Name (Descending)" },
  { field: "created_at", label: "Sort by Date Created (Ascending)" },
  { field: "-created_at", label: "Sort by Date Created (Descending)" },
];

function ContainersPublic({ message, filter = "" }) {
  const [containers, setContainers] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const [showSortingOptions, setShowSortingOptions] = useState(false);
  const [ordering, setOrdering] = useState(""); 

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  window.scrollTo(0, 0);

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const { data } = await axiosReq.get(`/containers/public/?${filter}search=${query}&ordering=${ordering}`);
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
  }, [filter, query, ordering, pathname, currentUser]);

  return (
    <div className={`p-0 ${styles.ScrollableContainer}`} fluid>
      <Container className={`p-0 ${styles.PostsPage}`} fluid>
        <Row fluid>
          <Col lg={3} xl={3} className="d-none d-lg-block ps-0 ms-0">
            <Sidebar />
          </Col>
          <Col lg={9} xl={9} xxl={10}>
            <Row fluid className="justify-content-between">
              <div className={`p-0 ${styles.TopNav}`}>
                <button
                  className={`d-lg-none p-0 ${styles.SortIcon} ${styles.MobileNavIcon}`}
                  onClick={handleShowModal}
                >
                  <i className="fas fa-compass fa-3x" />
                </button>
              </div>
              <Col className={`ps-1 ${styles.ContainerList}`} lg={8}>
                <div className="ms-sm-0 me-sm-0">
                  <PopularProfiles mobile />
                </div>
                <div className={`mt-0 mb-0 ${styles.SearchBarContainer}`}>
                  <Row fluid className={`mt-0 mb-0 ${styles.SortRow}`}>
                    <h4 className="mt-1 mt-lg-0 pt-1">Public Containers</h4>
                    <i
                      className={`fas fa-sort mb-0 ${styles.SortIcon}`}
                      onClick={() => setShowSortingOptions(!showSortingOptions)}
                    />
                  </Row>
                  <Row className={`mb-0 mt-0 ${styles.SearchRow}`} fluid>
                    <Col className="p-0">
                    {/* <Col className={`py-2 p-0 p-lg-2 ${styles.ContainerList}`} sm={4} lg={8}> */}
                      {/* sm=4 */}
                      <i className={`fas fa-search ${styles.SearchIcon}`} />
                      <Form
                        className={styles.SearchBar}
                        onSubmit={(event) => event.preventDefault()}
                      >
                        <Form.Control
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          type="text"
                          // className="mr-sm-2"
                          placeholder="Search containers..."
                        />
                      </Form>
                    </Col>
                  </Row>
                </div>
                {/* End of search bar */}
                {/* Sorting options */}
                <div>
                  <Col className={`py-2 p-0 p-lg-2 ${styles.ContainerList}`} lg={8}>
                    {/* Dropdown for sorting options */}
                    {showSortingOptions && (
                      <ListGroup className={`bg-dark ${styles.SortingDropdown}`}>
                        {sortingOptions.map((option) => (
                          <ListGroup.Item
                            key={option.field}
                            className={ordering === option.field ? styles.ActiveSortOption : styles.SortOption}
                            onClick={() => {
                              setOrdering(ordering === option.field ? `-${option.field}` : option.field); // Toggle sorting order
                              setShowSortingOptions(false); // Close dropdown
                            }}
                          >
                            <i className={`fas fa-sort-${ordering === option.field ? 'down' : 'up'}`} />
                            {option.label}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                    {/* End of dropdown */}
                  </Col>
                </div>
                {/* End of sorting options */}
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
              <Col lg={4} className="d-none d-lg-block p-0 mt-lg-4">
                <PopularProfiles />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {/* Modal for Mobile Navigation */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Explore Content</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
        <Sidebar />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ContainersPublic;