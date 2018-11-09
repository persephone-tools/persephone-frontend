import * as React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Audio from './components/Audio';
import AudioDetail from './components/AudioDetail';
import Corpus from './components/Corpus';
import CorpusDetail from './components/CorpusDetail';
import Index from './components/Index';
import Utterance from './components/Utterance';
import UtteranceDetail from './components/UtteranceDetail';
import VersionBadge from './components/VersionBadge';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Persephone frontend</h1>
          <VersionBadge />
            <Switch>
              <Route exact={true} path="/audio/" component={Audio} />
              <Route exact={true} path="/audio/:audioId" component={AudioDetail} />
              <Route exact={true} path="/corpus/" component={Corpus} />
              <Route exact={true} path="/corpus/:corpusId" component={CorpusDetail} />
              <Route exact={true} path="/utterance/" component={Utterance} />
              <Route exact={true} path="/utterance/:utteranceId" component={UtteranceDetail} />
              <Route exact={true} path="/" component={Index} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
