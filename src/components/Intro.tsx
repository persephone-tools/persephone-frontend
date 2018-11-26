import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Header, Icon, List, Step } from 'semantic-ui-react'

class Intro extends React.Component<RouteComponentProps<any>, React.Props<any>> {
    public render() {
        return (
            <div>
                <Header as='h1'>Getting started with Persephone</Header>
                <p>Persephone (/pərˈsɛfəni/) is an automatic phoneme transcription tool. Traditional speech recognition tools require a large pronunciation lexicon (describing how words are pronounced) and much training data so that the system can learn to output orthographic transcriptions. In contrast, Persephone is designed for situations where training data is limited, perhaps as little as an hour of transcribed speech. Such limitations on data are common in the documentation of low-resource languages. It is possible to use such small amounts of data to train a transcription model that can help aid transcription, yet such technology has not been widely adopted.</p>
                <Header as='h2'>Data types</Header>
                <p>Data in persephone is divided into the following categories:</p>
                <List>
                    <List.Item>
                        <List.Icon name='box' />
                        <List.Content>Models</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='book' />
                        <List.Content>Corpora</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='music' />
                        <List.Content>Audio</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='pencil alternate' />
                        <List.Content>Transcriptions</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='talk' />
                        <List.Content>Utterances</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='tag' />
                        <List.Content>Labels</List.Content>
                    </List.Item>
                </List>
                <p>You can access the data from the left hand menu, by clicking on the appropriate link.</p>

                <Header as='h3'>Audio, transcriptions, and utterances</Header>
                <p>
                    Audio files are the wave files that contain the audio we wish to transcribe.
                    Transcriptions are textual representations of some audio which contain sequences of labels.
                    Utterances are groupings of an audio file along with an associated transcription.
                </p>
                <Header as='h3'>Models and corpora</Header>
                <p>
                    In order to construct a phonetic transcription model we have to define various parameters
                    then provide a corpus of training data to train the model.
                </p>
                <Header as='h3'>Labels</Header>
                <p>
                    Labels form the atomic unit of a transcription file.
                    The system will train a model that generates these sequences of labels from data input from Audio files.
                    There are two main types of labels supported by the system, you can define phonemes only or a combination
                    of phonemes with tones.
                    Note that labels can be used to represent non speech events too, for example you may wish to make a label for
                    a particular background noise present in a set of recordings in order to isolate that in the results.
                </p>
                <Header as='h2'>Basic workflow</Header>
                <Header as='h3'>Introduction</Header>
                <Step.Group widths={5}>
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>...</p>
                <Header as='h3'>Model creation</Header>
                <Step.Group size="mini">
                    <Step active={true}>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>Explain here.</p>
                <Header as='h3'>Data upload</Header>
                <Step.Group size="mini">
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>Explain here.</p>
                <Header as='h3'>Preprocessing</Header>
                <Step.Group size="mini">
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>Explain here.</p>
                <Header as='h3'>Training</Header>
                <Step.Group size="mini">
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>Explain here.</p>
                <Header as='h3'>Transcription</Header>
                <Step.Group size="mini">
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>Explain here.</p>
            </div>
        )
    }
}

export default withRouter(Intro);