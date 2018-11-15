import * as React from 'react';
import './App.css';

import { Container } from 'semantic-ui-react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Audio from './components/Audio';
import AudioDetail from './components/AudioDetail';
import Corpus from './components/Corpus';
import CorpusDetail from './components/CorpusDetail';
import Index from './components/Index';
import Intro from './components/Intro';
import LabelList from './components/LabelList';
import Model from './components/Model';
import ModelDetail from './components/ModelDetail';
import Preprocess from './components/Preprocess';
import Train from './components/Train';
import Transcribe from './components/Transcribe';
import Transcription from './components/Transcription';
import TranscriptionDetail from './components/TranscriptionDetail';
import Utterance from './components/Utterance';
import UtteranceDetail from './components/UtteranceDetail';

import MainMenu from './components/Menu';

import DropUpload from './components/DropUpload';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact={true} path="*" component={MainMenu} />
          <Container>
            <Switch>
              <Route exact={true} path="/" component={Index} />
              <Route exact={true} path="/intro" component={Intro} />
              <Route exact={true} path="/audio/" component={Audio} />
              <Route exact={true} path="/audio/:audioId" component={AudioDetail} />
              <Route exact={true} path="/upload/" component={DropUpload} />
              <Route exact={true} path="/corpus/" component={Corpus} />
              <Route exact={true} path="/corpus/:corpusId" component={CorpusDetail} />
              <Route exact={true} path="/utterance/" component={Utterance} />
              <Route exact={true} path="/utterance/:utteranceId" component={UtteranceDetail} />
              <Route exact={true} path="/label/" component={LabelList} />
              <Route exact={true} path="/model/" component={Model} />
              <Route exact={true} path="/model/:modelId" component={ModelDetail} />
              <Route exact={true} path="/preprocess/" component={Preprocess} />
              <Route exact={true} path="/train/" component={Train} />
              <Route exact={true} path="/transcribe/" component={Transcribe} />
              <Route exact={true} path="/transcription/" component={Transcription} />
              <Route exact={true} path="/transcription/:transcriptionId" component={TranscriptionDetail} />
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
