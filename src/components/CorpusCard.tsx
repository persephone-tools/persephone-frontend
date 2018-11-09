import * as React from 'react';

import { Button, Card, Container, List } from 'semantic-ui-react';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import { CorpusInformation } from '../gen/api';

export interface ICorpusCardProps extends RouteComponentProps {
    corpus: CorpusInformation
}

class CorpusCard extends React.Component<ICorpusCardProps, {}> {
    public render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.corpus.name} (id: {this.props.corpus.id})</Card.Header>
                    <Card.Meta>Corpus</Card.Meta>
                    <Card.Description>
                        <List>
                            <List.Item>
                                <List.Header>Feature type</List.Header>
                                {this.props.corpus.featureType}
                            </List.Item>
                            <List.Item>
                                <List.Header>Label type</List.Header>
                                {this.props.corpus.labelType}
                            </List.Item>
                            <List.Item>
                                <List.Header>Max samples</List.Header>
                                {this.props.corpus.maxSamples || "N/A"}
                            </List.Item>
                            <List.Item>
                                <List.Header>Number of testing utterances</List.Header>
                                {this.props.corpus.partition.testing!.length}
                            </List.Item>
                            <List.Item>
                                <List.Header>Number of training utterances</List.Header>
                                {this.props.corpus.partition.training!.length}
                            </List.Item>
                            <List.Item>
                                <List.Header>Number of validation utterances</List.Header>
                                {this.props.corpus.partition.validation!.length}
                            </List.Item>
                        </List>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra={true}>
                    <Container textAlign='right'><Button circular={true} primary={true} icon='angle right' onClick={() => this.props.history.push("/corpus/" + this.props.corpus.id)} /></Container>
                </Card.Content>
            </Card>
        )
    }
}

export default withRouter(CorpusCard);