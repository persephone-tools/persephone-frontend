import * as React from 'react';

import { Dimmer, Header, List, Loader, Segment } from 'semantic-ui-react';

import { api } from '../API';

import { AudioAudioIDGetRequest, AudioFileInformation } from '../gen/api';

export interface IAudioDetailState {
    audio?: AudioFileInformation;
    isLoading: boolean;
}

export default class Audio extends React.Component<any, IAudioDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        const requestData: AudioAudioIDGetRequest = {
            audioID: this.props.match.params.audioId
        }
        api.audioAudioIDGet(requestData).then(audio => {
            console.log(audio)
            this.setState({
                audio,
                isLoading: false,
            })
        }).catch(console.error);
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <div>
                <Segment basic={true}>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    {this.state.audio &&
                        <React.Fragment>
                            <Header as='h1'>{this.state.audio.fileInfo!.name} (id: {this.state.audio.fileInfo!.id})</Header>
                            <Header.Subheader>Audio</Header.Subheader>
                            <List>
                                <List.Item>
                                    <List.Header>ID</List.Header>
                                    {this.state.audio.fileInfo!.id}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Name</List.Header>
                                    {this.state.audio.fileInfo!.name}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Created at</List.Header>
                                    {this.state.audio.fileInfo!.createdAt}
                                </List.Item>
                            </List>
                        </React.Fragment>
                    }
                </Segment>
            </div>
        )
    }
}