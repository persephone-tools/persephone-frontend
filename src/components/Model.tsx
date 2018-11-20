import * as React from 'react';

import { Button, Card, Dimmer, Form, Header, Icon, Loader, Modal, Segment } from 'semantic-ui-react';

import ErrorMessageComponent from './ErrorMessageComponent';

import { api } from '../API';

import { ErrorMessage, ModelGetRequest, ModelInformation, ModelPostRequest } from '../gen/api';

import CorpusDropdown from './CorpusDropdown';
import ModelCard from './ModelCard';

export interface IModelState {
    models: ModelInformation[];
    isLoading: boolean;
    formError?: ErrorMessage;
    formLoading: boolean;
    modalOpen: boolean;
    name?: string;
    beamWidth?: string;
    corpusID?: number;
    decodingMergeRepeated: boolean;
    earlyStoppingSteps?: string;
    hiddenSize?: string;
    numberLayers?: string;
    minimumEpochs?: string;
    maximumEpochs?: string;
    maximumTrainingLER?: string;
    maximumValidationLER?: string;
    error?: ErrorMessage;
}

export default class Model extends React.Component<{}, IModelState> {
    constructor(props: any) {
        super(props);
        this.state = {
            decodingMergeRepeated: false,
            formLoading: false,
            isLoading: true,
            modalOpen: false,
            models: [],
        };
        this.getData = this.getData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.modelGet({} as ModelGetRequest).then(models => {
            console.log(models)
            this.setState({
                isLoading: false,
                models,
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public clearForm() {
        this.setState({
            formError: undefined,
            formLoading: false
        })
    }

    public openModal() {
        this.clearForm();
        this.setState({
            modalOpen: true
        })
    }

    public closeModal() {
        this.clearForm();
        this.setState({
            modalOpen: false
        })
    }

    public submitForm() {
        this.setState({formLoading: true, error: undefined})
        const modelInfo: ModelInformation = {
            beamWidth: Number(this.state.beamWidth),
            corpusID: this.state.corpusID || -1,
            decodingMergeRepeated: this.state.decodingMergeRepeated,
            earlyStoppingSteps: Number(this.state.earlyStoppingSteps),
            hiddenSize: Number(this.state.hiddenSize),
            maximumEpochs: Number(this.state.maximumEpochs),
            maximumTrainingLER: Number(this.state.maximumTrainingLER),
            maximumValidationLER: Number(this.state.maximumValidationLER),
            minimumEpochs: Number(this.state.minimumEpochs),
            name: this.state.name || "",
            numberLayers: Number(this.state.numberLayers),
        }
        const requestData: ModelPostRequest = {
            modelInfo
        }
        api.modelPost(requestData).then(res => {
            this.setState({modalOpen: false});
            this.getData();
        }).catch(err => {
            this.setState({formLoading: false, error: err})
        });
    }

    toggleCheckbox = (field: string) => (event: any) => {
        this.setState({ [field]: !this.state[field] } as Pick<IModelState, any>);
    };

    handleChange = (field: string) => (event: any) => {
        this.setState({ [field]: event.target.value } as Pick<IModelState, any>);
    };

    public render() {
        return (
            <div>
                <Header as='h1'>All Models</Header>
                <Button primary={true} onClick={this.openModal}>
                    <Icon name='plus' />
                    Create new model
                </Button>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Card.Group>
                        {this.state.models.map((model) => (
                            <ModelCard key={model.id} model={model} />
                        ))}
                    </Card.Group>
                </Segment>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.closeModal}>
                    <Modal.Header>New model</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form loading={this.state.formLoading}>
                                <Header>Basic model information</Header>
                                <Form.Input label="The name of this model" type="text" name="name" placeholder="ExampleLang model 1" onChange={this.handleChange('name')} />
                                <Form.Input label="Beam width size" type="text" name="beamWidth" placeholder="1" onChange={this.handleChange('beamWidth')} />
                                <Form.Field>
                                    <label>The corpus to use for this model</label>
                                    <CorpusDropdown onChange={(selection: number) => this.setState({corpusID: selection} as Pick<IModelState, any>)} />
                                </Form.Field>
                                <Form.Checkbox label="Merge repeated characters when decoding" name="decodingMergeRepeated" checked={this.state.decodingMergeRepeated} onChange={this.toggleCheckbox('decodingMergeRepeated')} />
                                <Form.Input label=" Stop training after this number of steps if no LER improvement has been made" type="text" name="earlyStoppingSteps" placeholder="0" onChange={this.handleChange('earlyStoppingSteps')} />
                                <Form.Input label="Size of the hidden layers" type="text" name="hiddenSize" placeholder="0" onChange={this.handleChange('hiddenSize')} />
                                <Form.Input label="Number of layers in the network" type="text" name="numberLayers" placeholder="0" onChange={this.handleChange('numberLayers')} />
                                <Form.Input label="Minimum number of training epochs" type="text" name="minimumEpochs" placeholder="0" onChange={this.handleChange('minimumEpochs')} />
                                <Form.Input label="Maximum number of training epochs" type="text" name="maximumEpochs" placeholder="0" onChange={this.handleChange('maximumEpochs')} />
                                <Form.Input label="Maximum Label Error Rate (LER) on training data" type="text" name="maximumTrainingLER" placeholder="0" onChange={this.handleChange('maximumTrainingLER')} />
                                <Form.Input label="Maximum Label Error Rate (LER) on validation data" type="text" name="maximumValidationLER" placeholder="0" onChange={this.handleChange('maximumValidationLER')} />
                                <ErrorMessageComponent error={this.state.formError} />
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary={true} onClick={this.submitForm}>
                            <Icon name='plus' />
                            Create
                        </Button>
                        <Button negative={true} onClick={this.closeModal}>
                            <Icon name='remove' />
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}