import * as React from 'react';

import { Dimmer, Header, Icon, List, Loader, Segment } from 'semantic-ui-react';

import { api } from '../API';

import { ModelInformation, ModelModelIDGetRequest } from '../gen/api';
import CorpusName from './CorpusName';

export interface IModelDetailState {
    model?: ModelInformation;
    isLoading: boolean;
}

export default class Model extends React.Component<any, IModelDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        const requestData: ModelModelIDGetRequest = {
            modelID: this.props.match.params.modelId
        }
        api.modelModelIDGet(requestData).then(model => {
            console.log(model)
            this.setState({
                isLoading: false,
                model,
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
                    {this.state.model &&
                        <React.Fragment>
                            <Header as='h1'>{this.state.model!.name} (id: {this.state.model!.id})</Header>
                            <Header.Subheader>Model</Header.Subheader>
                            <List>
                                <List.Item>
                                    <List.Header>Name</List.Header>
                                    {this.state.model!.name}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Beam width size</List.Header>
                                    {this.state.model!.beamWidth}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Corpus for this model</List.Header>
                                    <CorpusName corpusId={this.state.model!.corpusID} /> (id: {this.state.model!.corpusID})
                                </List.Item>
                                <List.Item>
                                    <List.Header>Merge repeated characters when decoding</List.Header>
                                    {this.state.model!.decodingMergeRepeated !== undefined &&
                                        (this.state.model!.decodingMergeRepeated ? <Icon name='check' /> : <Icon name='times' />)
                                    }
                                </List.Item>
                                <List.Item>
                                    <List.Header>Stop training after this number of steps if no LER improvement has been made</List.Header>
                                    {this.state.model!.earlyStoppingSteps}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Size of the hidden layers</List.Header>
                                    {this.state.model!.hiddenSize}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Number of layers in the network</List.Header>
                                    {this.state.model!.numberLayers}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Minimum number of training epochs</List.Header>
                                    {this.state.model!.minimumEpochs}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Maximum number of training epochs</List.Header>
                                    {this.state.model!.maximumEpochs}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Maximum Label Error Rate (LER) on training data</List.Header>
                                    {this.state.model!.maximumTrainingLER}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Maximum Label Error Rate (LER) on validation data</List.Header>
                                    {this.state.model!.maximumValidationLER}
                                </List.Item>
                            </List>
                        </React.Fragment>
                    }
                </Segment>
            </div>
        )
    }
}