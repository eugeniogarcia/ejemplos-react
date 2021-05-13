import React from "react";
import { FixedSizeList } from "react-window";
import { Route, Link,Switch} from "react-router-dom";
import faker from "faker";
import List from "./Lista"
import GitHubUser from "./GitHubUser"
import UserRepositories from "./RepositoriosUsuario"
import GitHubUserRepo from "./GitHubUserRepo"

const bigList = [...Array(5000)].map(() => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar()
}));

export default function App() {
  const renderRow = ({ index, style }) => (
    <div style={{ ...style, ...{ display: "flex" } }}>
      <img
        src={bigList[index].avatar}
        alt={bigList[index].name}
        width={50}
      />
      <p>
        {bigList[index].name} - {bigList[index].email}
      </p>
    </div>
  );

  return (
        <div>
          <nav>
            <Link to="/">Home</Link>
            {"  "}
            <Link to="/lista">Lista Normal</Link>
            {"  "}
            <Link to="/virtual">Lista Virtual</Link>
            {"  "}
            <Link to="/usuario">Usuario Github</Link>
            {"  "}
            <Link to="/repos">Repositorios</Link>
            {"  "}
            <Link to="/userrepos">Usuario Github y Repositorios</Link>
          </nav>
        <Switch>
          <Route exact path="/" render={() => <h1>Hola!</h1>}/>
          <Route path="/lista"
              render={() => <List
                          data={bigList}
                          renderEmpty={<p>This list is empty</p>}
                          renderItem={item => (
                            <div style={{ display: "flex" }}>
                              <img src={item.avatar} alt={item.name} width={50} />
                              <p>
                                {item.name} - {item.email}
                              </p>
                            </div>)} />}/>
          <Route path="/virtual"
              render={() => <FixedSizeList
                          height={window.innerHeight}
                          width={window.innerWidth - 20}
                          itemCount={bigList.length}
                          itemSize={50}>
                          {renderRow}</FixedSizeList>} />
          <Route path="/usuario"
              render={() => <GitHubUser login="eugeniogarcia" />} />
          <Route path="/repos"
              render={() => <UserRepositories login="eugeniogarcia" />} />
          <Route path="/userrepos"
              render={() => <GitHubUserRepo login="eugeniogarcia" />} />
        </Switch>
    </div>);
}

