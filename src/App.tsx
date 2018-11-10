import * as React from 'react';
import './App.css';

import { Container } from 'semantic-ui-react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Audio from './components/Audio';
import AudioDetail from './components/AudioDetail';
import Corpus from './components/Corpus';
import CorpusDetail from './components/CorpusDetail';
import Index from './components/Index';
import LabelList from './components/LabelList';
import Model from './components/Model';
import ModelDetail from './components/ModelDetail';
import Transcription from './components/Transcription';
import TranscriptionDetail from './components/TranscriptionDetail';
import Utterance from './components/Utterance';
import UtteranceDetail from './components/UtteranceDetail';

import MainMenu from './components/Menu';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainMenu />
          <Container>
            <h1>Persephone frontend</h1>
            <Switch>
              <Route exact={true} path="/audio/" component={Audio} />
              <Route exact={true} path="/audio/:audioId" component={AudioDetail} />
              <Route exact={true} path="/corpus/" component={Corpus} />
              <Route exact={true} path="/corpus/:corpusId" component={CorpusDetail} />
              <Route exact={true} path="/utterance/" component={Utterance} />
              <Route exact={true} path="/utterance/:utteranceId" component={UtteranceDetail} />
              <Route exact={true} path="/label/" component={LabelList} />
              <Route exact={true} path="/model/" component={Model} />
              <Route exact={true} path="/model/:modelId" component={ModelDetail} />
              <Route exact={true} path="/transcription/" component={Transcription} />
              <Route exact={true} path="/transcription/:transcriptionId" component={TranscriptionDetail} />
              <Route exact={true} path="/" component={Index} />
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
