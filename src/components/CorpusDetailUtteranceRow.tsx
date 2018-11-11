import * as React from 'react';

import { Icon, Placeholder, Table } from 'semantic-ui-react';

import { api } from '../API';

import { UtteranceInformation, UtteranceURI, UtteranceUtteranceIDGetRequest } from '../gen/api';
import AudioName from './AudioName';
import TranscriptionName from './TranscriptionName';

export interface ICorpusDetailUtteranceRowProps {
    utteranceId: UtteranceURI;
    training?: boolean;
    validation?: boolean;
    testing?: boolean;
}

export interface ICorpusDetailUtteranceRowState {
    utterance?: UtteranceInformation;
    isLoading: boolean;
}

export default class CorpusDetailUtteranceRow extends React.Component<ICorpusDetailUtteranceRowProps, ICorpusDetailUtteranceRowState> {
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
            utteranceID: this.props.utteranceId as number
        }
        api.utteranceUtteranceIDGet(requestData).then(utterance => {
            console.log(utterance)
            this.setState({
                isLoading: false,
                utterance,
            })
        }).catch(console.error);
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.isLoading && !this.state.utterance ?
                    <Placeholder>
                        <Placeholder.Line />
                    </Placeholder>
                :
                    <Table.Row key={this.state.utterance!.id!.toString()}>
                        <Table.Cell>{this.state.utterance!.id}</Table.Cell>
                        <Table.Cell><AudioName audioId={this.state.utterance!.audio} /> (id: {this.state.utterance!.audio})</Table.Cell>
                        <Table.Cell><TranscriptionName transcriptionId={this.state.utterance!.transcription} /> (id: {this.state.utterance!.transcription})</Table.Cell>
                        <Table.Cell>{this.props.training ? <Icon name='check' /> : ""}</Table.Cell>
                        <Table.Cell>{this.props.validation ? <Icon name='check' /> : ""}</Table.Cell>
                        <Table.Cell>{this.props.testing ? <Icon name='check' /> : ""}</Table.Cell>
                    </Table.Row>
                }
            </React.Fragment>
        )
    }
}