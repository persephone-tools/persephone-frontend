import * as React from 'react';

import { Dimmer, Header, List, Loader, Segment } from 'semantic-ui-react';

import { api } from '../API';

import { CorpusCorpusIDGetRequest, CorpusInformation } from '../gen/api';

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
                <Segment basic={true}>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    {this.state.corpus &&
                        <React.Fragment>
                            <Header as='h1'>{this.state.corpus!.name} (id: {this.state.corpus!.id})</Header>
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
                                    {this.state.corpus!.maxSamples || "N/A"}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Number of testing utterances</List.Header>
                                    {this.state.corpus!.partition.testing!.length}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Number of training utterances</List.Header>
                                    {this.state.corpus!.partition.training!.length}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Number of validation utterances</List.Header>
                                    {this.state.corpus!.partition.validation!.length}
                                </List.Item>
                            </List>
                        </React.Fragment>
                    }
                </Segment>
            </div>
        )
    }
}