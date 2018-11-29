import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Header, Icon, Step } from 'semantic-ui-react'

class HowTo extends React.Component<RouteComponentProps<any>, React.Props<any>> {
    public render() {
        return (
            <div>
                <Header as='h1'>How do I?</Header>
                <Header as='h2'>Create a transcription model</Header>
                Here's how you can use this web frontend to define and train a transcription model.
                <Header as='h3'>Introduction</Header>
                <Step.Group widths={6}>
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Corpus creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Model Training</Step.Title>
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
                <Header as='h3'>Data upload</Header>
                <Step.Group size="mini">
                    <Step active={true}>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Corpus creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Model Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>
                    You will need to upload the audio files along with the associated transcription files you will need to train the model.
                    By convention transcriptions and audio files will have the same prefix in the filename.
                    For example "example.wav" and "example.phonemes" conventionally will refer to the same utterance.
                    If you drag and drop into the uploads both "example.wav" along with "example.phonemes" the frontend will automatically
                    create an utterance that contains these two files.
                </p>
                <Header as='h3'>Corpus creation</Header>
                <Step.Group size="mini">
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Corpus creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Model Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>
                    In order to create and train a model we have to provide a Corpus of data to it.
                    in this step you define the partition of this training corpus data into training, testing and validation sets.
                </p>
                <Header as='h3'>Preprocessing</Header>
                <Step.Group size="mini">
                    <Step>
                        <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Corpus creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Model Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>
                    In order to get your audio data into a format in which it can be consumed 
                    by the machine learning model it is necessary to preprocess the audio data.
                    Note that how the audio is preprocessed will depend on the settings you provide.
                    This step will automatically happen when the model is created.
                </p>
                <Header as='h3'>Model creation</Header>
                <Step.Group size="mini">
                <Step>
                    <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Corpus creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Model Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>
                    When you have a corpus prepared you are ready to create a model.
                    You will have to specify the parameters that will be given to the machine learning algorithm at this stage.
                </p>
                <Header as='h3'>Model training</Header>
                <Step.Group size="mini">
                    <Step>
                    <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Corpus creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Model Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>
                    Once you have specified a model you need to train it.
                    This is a computationally intensive task and will take a significant amount of time to complete.
                </p>
                <Header as='h3'>Transcribing</Header>
                <Step.Group size="mini">
                    <Step>
                    <Icon name='cloud upload' />
                        <Step.Content>
                            <Step.Title>Data upload</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Corpus creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='filter' />
                        <Step.Content>
                            <Step.Title>Preprocessing</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='plus' />
                        <Step.Content>
                            <Step.Title>Model creation</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step>
                        <Icon name='hourglass start' />
                        <Step.Content>
                            <Step.Title>Model Training</Step.Title>
                        </Step.Content>
                    </Step>
                    <Step active={true}>
                        <Icon name='translate' />
                        <Step.Content>
                            <Step.Title>Transcription</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
                <p>
                    When you have a fully trained model you will be able to upload audio to transcribe with this model.
                </p>

            <Header as='h2'>Use the API directly</Header>
            <p>
                This frontend uses the Persephone Web API in the backend to interact with the Persephone library.
                You can use this API service directly if you wish by sending queries directly to it.
                The API is provided by the Persephone Web API, the specification for this can be found at the <a href="https://github.com/persephone-tools/persephone-web-API/">Persephone web API repository.</a>
                The repository has <a href="https://github.com/persephone-tools/persephone-web-API/tree/master/examples">example code</a> that you may wish to use as a reference.
            </p>
            </div>
        )
    }
}

export default withRouter(HowTo);