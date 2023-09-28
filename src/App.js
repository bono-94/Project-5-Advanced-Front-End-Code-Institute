import "./api/axiosDefaults";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./App.module.css";

import { Route, Switch } from "react-router-dom";

import ContainerCreateForm from "./pages/containers/ContainerCreateForm";
import ContainerPage from "./pages/containers/ContainerPage";
import ContainerEditForm from "./pages/containers/ContainerEditForm";
import ContainersPublic from "./pages/containers/ContainersPublic";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostEditForm from "./pages/posts/PostEditForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Support from "./pages/support/Support";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";

import { useCurrentUser } from "./contexts/CurrentUserContext";


import NotFound from "./components/NotFound";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";



// import ContentAPI from "./components/ContentAPI";
// import ContentAPIHooks from "./components/ContentAPIHooks";
// import ConditionalRenderingClass from './components/ConditionalRenderingClass';
// import ConditionalRenderingFunctional from './components/ConditionalRenderingFunctional';

// import SearchBar from "./components/SearchBar";
// import RenderingLists from './components/RenderingLists';
// import EventsClass from './components/EventsClass';
// import EventsFunctional from './components/EventsFunctional';
// import EventsBinding from './components/EventsBinding';

// import ControlledFormHooks from "./components/ControlledFormHooks";
// import ControlledForm from "./components/ControlledForm";

// import UseStateWithArrays from "./components/UseStateWithArrays";
// import UseStateWithObjects from "./components/UseStateWithObjects";
// import UseEffectCounter from "./components/UseEffectCounter";
// import UseEffectCounterContainer from "./components/UseEffectCounter";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";



function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className="styles.App">
      
      {/* Knowledge */}
      {/* <ContentAPIHooks />
      <ContentAPI /> */}
      {/* <ConditionalRenderingClass />
      <ConditionalRenderingFunctional connected={true} /> */}

      {/* Components */}
      {/* <SearchBar /> 
      <RenderingLists /> */}
      {/* <EventsClass />
      <EventsFunctional />
      <EventsBinding />

      {/* Support */}
      {/* <ControlledForm /> */}
      {/* <ControlledFormHooks /> */}

      {/* Extra */}
      {/* <UseStateWithObjects />
      <UseStateWithArrays />
      <UseEffectCounterContainer />
      <UseEffectCounter /> */}

      <NavBar />


      
      <Container className={styles.Main} fluid>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/favourited"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or favourite a post."
                filter={`favourites__owner__profile=${profile_id}&ordering=-favourites__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/container/create" render={() => <ContainerCreateForm />} />
          <Route exact path="/container/:id" render={() => <ContainerPage />} />
          <Route exact path="/container/edit/:id" render={() => <ContainerEditForm />} />
          <Route exact path="/containers/public" render={() => <ContainersPublic message="No results found. Adjust the search keyword." />} />
          <Route exact path="/knowledge/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/support" render={() => <Support />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />

          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
      
      <Footer></Footer>

      {/* <Button variant="primary">Primary</Button>
      <Button variant="dark">Primary</Button> */}

      {/* FOOTER
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn how to use React
        </a> */}
        {/* <FunctionalGreetingWithProps greeting="Nice to meet you!" name="Mike" age="32"/>
        <FunctionalGreeting/> */}
        
      {/* </header> */}
    </div>
  );
}

export default App;
