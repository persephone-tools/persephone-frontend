import * as React from 'react';

import { Dimmer, Header, List, Loader, Segment } from 'semantic-ui-react';

import ICorpus from '../interfaces/Corpus';

export interface ICorpusDetailState {
    corpus: ICorpus;
    isLoading: boolean;
}

export default class Corpus extends React.Component<any, ICorpusDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            corpus: {
                feature_type: "",
                filesystem_path: "",
                id: -1,
                label_type: "",
                max_samples: -1,
                name: "",
                preprocessed: false,
                testing: [],
                training: [],
                validation: [],
            },
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        console.log(this.props)
        fetch(`http://127.0.0.1:8080/v0.1/corpus/${this.props.match.params.corpusId}`)
            .then(res => res.json())
            .then(corpus => {
                this.setState({
                    corpus,
                    isLoading: false
                })
            });
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
                    <Header as='h2'>{this.state.corpus.name} (id: {this.state.corpus.id})</Header>
                    <Header.Subheader>{this.state.corpus.filesystem_path}</Header.Subheader>
                    <List>
                        <List.Item>
                            <List.Header>Feature type</List.Header>
                            {this.state.corpus.feature_type}
                        </List.Item>
                        <List.Item>
                            <List.Header>Label type</List.Header>
                            {this.state.corpus.label_type}
                        </List.Item>
                        <List.Item>
                            <List.Header>Max samples</List.Header>
                            {this.state.corpus.max_samples || "N/A"}
                        </List.Item>
                        <List.Item>
                            <List.Header>Preprocessed</List.Header>
                            {this.state.corpus.preprocessed ? "Yes" : "No"}
                        </List.Item>
                        <List.Item>
                            <List.Header>Number of testing utterances</List.Header>
                            {this.state.corpus.testing.length}
                        </List.Item>
                        <List.Item>
                            <List.Header>Number of training utterances</List.Header>
                            {this.state.corpus.training.length}
                        </List.Item>
                        <List.Item>
                            <List.Header>Number of validation utterances</List.Header>
                            {this.state.corpus.validation.length}
                        </List.Item>
                    </List>
                </Segment>
            </div>
        )
    }
}