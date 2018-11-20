import * as React from 'react';

import { Dimmer, Header, List, Loader, Segment, Table } from 'semantic-ui-react';

import { api } from '../API';

import { CorpusCorpusIDGetRequest, CorpusInformation } from '../gen/api';
import CorpusDetailLabelList from './CorpusDetailLabelList';
import CorpusDetailUtteranceRow from './CorpusDetailUtteranceRow';

export interface ICorpusDetailState {
    corpus?: CorpusInformation;
    isLoading: boolean;
}

export default class Corpus extends React.Component<any, ICorpusDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        const requestData: CorpusCorpusIDGetRequest = {
            corpusID: this.props.match.params.corpusId
        }
        api.corpusCorpusIDGet(requestData).then(corpus => {
            console.log(corpus)
            this.setState({
                corpus,
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
                <Header as='h1'>Corpus Details</Header>
                <Segment basic={true}>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    {this.state.corpus &&
                        <React.Fragment>
                            <Header as='h2'>{this.state.corpus!.name} (id: {this.state.corpus!.id})</Header>
                            <Header.Subheader>Corpus</Header.Subheader>
                            <List>
                                <List.Item>
                                    <List.Header>Feature type</List.Header>
                                    {this.state.corpus!.featureType}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Label type</List.Header>
                                    {this.state.corpus!.labelType}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Max samples</List.Header>
                                    {this.state.corpus!.maximumSamples || "N/A"}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Number of training utterances</List.Header>
                                    {this.state.corpus!.partition.training!.length}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Number of validation utterances</List.Header>
                                    {this.state.corpus!.partition.validation!.length}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Number of testing utterances</List.Header>
                                    {this.state.corpus!.partition.testing!.length}
                                </List.Item>
                            </List>
                            <Header as='h2'>Utterances in this corpus</Header>
                            <Table basic='very'>
                                <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>Audio</Table.HeaderCell>
                                    <Table.HeaderCell>Transcription</Table.HeaderCell>
                                    <Table.HeaderCell>Training</Table.HeaderCell>
                                    <Table.HeaderCell>Validation</Table.HeaderCell>
                                    <Table.HeaderCell>Testing</Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        this.state.corpus!.partition!.training!.length + this.state.corpus!.partition!.validation!.length + this.state.corpus!.partition!.testing!.length > 0 ?
                                        Array.from(new Set([...this.state.corpus!.partition!.training!, ...this.state.corpus!.partition!.validation!, ...this.state.corpus!.partition!.testing!]).values())
                                        .map(utterance => (
                                            <CorpusDetailUtteranceRow
                                                utteranceId={utterance}
                                                training={this.state.corpus!.partition!.training!.find(u => u === utterance)! === utterance}
                                                validation={this.state.corpus!.partition!.validation!.find(u => u === utterance)! === utterance}
                                                testing={this.state.corpus!.partition!.testing!.find(u => u === utterance)! === utterance} />
                                    )) :
                                        <Table.Row>
                                            <Table.Cell colSpan="6">This table is empty</Table.Cell>
                                        </Table.Row>
                                    }
                                </Table.Body>
                            </Table>
                            <Header as='h2'>Labels in this corpus</Header>
                            <CorpusDetailLabelList corpusId={this.state.corpus!.id!} />
                        </React.Fragment>
                    }
                </Segment>
            </div>
        )
    }
}