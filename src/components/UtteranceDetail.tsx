import * as React from 'react';

import { Dimmer, Header, List, Loader, Segment } from 'semantic-ui-react';

import { api } from '../API';

import { UtteranceInformation, UtteranceUtteranceIDGetRequest } from '../gen/api';

export interface IUtteranceDetailState {
    utterance?: UtteranceInformation;
    isLoading: boolean;
}

export default class Utterance extends React.Component<any, IUtteranceDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        const requestData: UtteranceUtteranceIDGetRequest = {
            utteranceID: this.props.match.params.utteranceId
        }
        api.utteranceUtteranceIDGet(requestData).then(utterance => {
            console.log(utterance)
            this.setState({
                isLoading: false,
                utterance
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
                    {this.state.utterance &&
                        <React.Fragment>
                            <Header as='h1'>Utterance {this.state.utterance.id}</Header>
                            <Header.Subheader>Utterance</Header.Subheader>
                            <List>
                                <List.Item>
                                    <List.Header>ID</List.Header>
                                    {this.state.utterance.id}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Audio</List.Header>
                                    {this.state.utterance.audio}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Transcription</List.Header>
                                    {this.state.utterance.transcription}
                                </List.Item>
                            </List>
                        </React.Fragment>
                    }
                </Segment>
            </div>
        )
    }
}