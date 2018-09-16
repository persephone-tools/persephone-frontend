import * as React from 'react';

import { Button, Card, Container, List } from 'semantic-ui-react';

import ICorpus from '../interfaces/Corpus';

export interface ICorpusCardProps {
    corpus: ICorpus
}


export default class CorpusCard extends React.Component<ICorpusCardProps, {}> {
    public render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.corpus.name} ({this.props.corpus.id})</Card.Header>
                    <Card.Meta>{this.props.corpus.filesystem_path}</Card.Meta>
                    <Card.Description>
                        <List>
                            <List.Item>
                                <List.Header>Feature type</List.Header>
                                {this.props.corpus.feature_type}
                            </List.Item>
                            <List.Item>
                                <List.Header>Label type</List.Header>
                                {this.props.corpus.label_type}
                            </List.Item>
                            <List.Item>
                                <List.Header>Max samples</List.Header>
                                {this.props.corpus.max_samples || "N/A"}
                            </List.Item>
                            <List.Item>
                                <List.Header>Preprocessed</List.Header>
                                {this.props.corpus.preprocessed ? "Yes" : "No"}
                            </List.Item>
                            <List.Item>
                                <List.Header>Number of testing utterances</List.Header>
                                {this.props.corpus.testing.length}
                            </List.Item>
                            <List.Item>
                                <List.Header>Number of training utterances</List.Header>
                                {this.props.corpus.training.length}
                            </List.Item>
                            <List.Item>
                                <List.Header>Number of validation utterances</List.Header>
                                {this.props.corpus.validation.length}
                            </List.Item>
                        </List>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra={true}>
                    <Container textAlign='right'><Button centered="true" circular={true} primary={true} icon='angle right' onClick={() => console.log("pressed me!")} /></Container>
                </Card.Content>
            </Card>
        )
    }
}