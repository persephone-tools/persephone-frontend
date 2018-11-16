import * as React from 'react';

import { Dimmer, Header, List, Loader, Segment } from 'semantic-ui-react';

import { api } from '../API';

import { TranscriptionInformation, TranscriptionTranscriptionIDGetRequest } from '../gen/api';

import Time from './Time';

export interface ITranscriptionDetailState {
    transcription?: TranscriptionInformation;
    isLoading: boolean;
}

export default class Transcription extends React.Component<any, ITranscriptionDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        const requestData: TranscriptionTranscriptionIDGetRequest = {
            transcriptionID: this.props.match.params.transcriptionId
        }
        api.transcriptionTranscriptionIDGet(requestData).then(transcription => {
            console.log(transcription)
            this.setState({
                isLoading: false,
                transcription,
            })
        }).catch(console.error);
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <div>
                <Header as='h1'>Transcription Details</Header>
                <Segment basic={true}>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    {this.state.transcription &&
                        <React.Fragment>
                            <Header as='h2'>{this.state.transcription.fileInfo!.name} (id: {this.state.transcription.id})</Header>
                            <Header.Subheader>Transcription</Header.Subheader>
                            <List>
                                <List.Item>
                                    <List.Header>Transcription ID</List.Header>
                                    {this.state.transcription.id}
                                </List.Item>
                                <List.Item>
                                    <List.Header>File ID</List.Header>
                                    {this.state.transcription.fileInfo!.id}
                                </List.Item>
                                <List.Item>
                                    <List.Header>File name</List.Header>
                                    {this.state.transcription.fileInfo!.name}
                                </List.Item>
                                <List.Item>
                                    <List.Header>File created at</List.Header>
                                    <Time time={this.state.transcription.fileInfo!.createdAt} />
                                </List.Item>
                            </List>
                        </React.Fragment>
                    }
                </Segment>
            </div>
        )
    }
}