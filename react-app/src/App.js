import "./api/axiosDefaults";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';

import FunctionalGreetingWithProps from './components/FunctionalGreetingWithProps';
import Sidebar from './components/Sidebar';

import ContentAPI from "./components/ContentAPI";
import ContentAPIHooks from "./components/ContentAPIHooks";
import ConditionalRenderingClass from './components/ConditionalRenderingClass';
import ConditionalRenderingFunctional from './components/ConditionalRenderingFunctional';

import SearchBar from "./components/SearchBar";
import RenderingLists from './components/RenderingLists';
import EventsClass from './components/EventsClass';
import EventsFunctional from './components/EventsFunctional';
import EventsBinding from './components/EventsBinding';

import ControlledFormHooks from "./components/ControlledFormHooks";
import ControlledForm from "./components/ControlledForm";

import UseStateWithArrays from "./components/UseStateWithArrays";
import UseStateWithObjects from "./components/UseStateWithObjects";
import UseEffectCounter from "./components/UseEffectCounter";
import UseEffectCounterContainer from "./components/UseEffectCounter";

import Button from "react-bootstrap/Button";





import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";


function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className="styles.App">
      <Sidebar />




      
    
      
      
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
      <Container className={styles.Main}>
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
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
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
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />

          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
      
      <Button variant="primary">Primary</Button>
      <Button variant="dark">Primary</Button>
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
        </a>
        <FunctionalGreetingWithProps greeting="Nice to meet you!" name="Mike" age="32"/>
        
      </header>
    </div>
  );
}

export default App;
