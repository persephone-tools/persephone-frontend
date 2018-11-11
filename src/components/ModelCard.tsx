import * as React from 'react';

import { Button, Card, Container, Icon, List } from 'semantic-ui-react';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import { ModelInformation } from '../gen/api';
import CorpusName from './CorpusName';

export interface IModelCardProps extends RouteComponentProps {
    model: ModelInformation
}

class ModelCard extends React.Component<IModelCardProps, {}> {
    public render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.model.name} (id: {this.props.model.id})</Card.Header>
                    <Card.Meta>Model</Card.Meta>
                    <Card.Description>
                        <List>
                            <List.Item>
                                <List.Header>Name</List.Header>
                                {this.props.model.name}
                            </List.Item>
                            <List.Item>
                                <List.Header>Beam width size</List.Header>
                                {this.props.model.beamWidth}
                            </List.Item>
                            <List.Item>
                                <List.Header>Corpus for this model</List.Header>
                                <CorpusName corpusId={this.props.model.corpusID} /> (id: {this.props.model.corpusID})
                            </List.Item>
                            <List.Item>
                                <List.Header>Merge repeated characters when decoding</List.Header>
                                {this.props.model.decodingMergeRepeated !== undefined &&
                                    (this.props.model.decodingMergeRepeated ? <Icon name='check' /> : <Icon name='times' />)
                                }
                            </List.Item>
                            <List.Item>
                                <List.Header>Stop training after this number of steps if no LER improvement has been made</List.Header>
                                {this.props.model.earlyStoppingSteps}
                            </List.Item>
                            <List.Item>
                                <List.Header>Size of the hidden layers</List.Header>
                                {this.props.model.hiddenSize}
                            </List.Item>
                            <List.Item>
                                <List.Header>Number of layers in the network</List.Header>
                                {this.props.model.numberLayers}
                            </List.Item>
                            <List.Item>
                                <List.Header>Minimum number of training epochs</List.Header>
                                {this.props.model.minimumEpochs}
                            </List.Item>
                            <List.Item>
                                <List.Header>Maximum number of training epochs</List.Header>
                                {this.props.model.maximumEpochs}
                            </List.Item>
                            <List.Item>
                                <List.Header>Maximum Label Error Rate (LER) on training data</List.Header>
                                {this.props.model.maximumTrainingLER}
                            </List.Item>
                            <List.Item>
                                <List.Header>Maximum Label Error Rate (LER) on validation data</List.Header>
                                {this.props.model.maximumValidationLER}
                            </List.Item>
                        </List>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra={true}>
                    <Container textAlign='right'><Button circular={true} primary={true} icon='angle right' onClick={() => this.props.history.push("/model/" + this.props.model.id)} /></Container>
                </Card.Content>
            </Card>
        )
    }
}

export default withRouter(ModelCard);