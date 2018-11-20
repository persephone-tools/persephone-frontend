import * as React from 'react';

import { Button, Dimmer, Form, Header, Icon, Loader, Modal, Segment, Table } from 'semantic-ui-react';

import ErrorMessageComponent from './ErrorMessageComponent';

import { api } from '../API';

import { ErrorMessage, ModelGetRequest, ModelInformation, PersephoneApiApiEndpointsModelTrainRequest } from '../gen/api';

export interface ITrainState {
    models: ModelInformation[];
    isLoading: boolean;
    formError?: ErrorMessage;
    formLoading: boolean;
    modalOpen: boolean;
    selectedModel: number;
}

export default class Train extends React.Component<{}, ITrainState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formLoading: false,
            isLoading: true,
            modalOpen: false,
            models: [],
            selectedModel: -1,
        };
        this.getData = this.getData.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.clickTrainModel = this.clickTrainModel.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
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

    public closeModal() {
        this.clearForm();
        this.setState({
            modalOpen: false,
            selectedModel: -1,
        })
    }

    clickTrainModel = (modelId: number) => (event: any) => {
        this.setState({
            formLoading: false,
            modalOpen: true,
            selectedModel: modelId,
        } as Pick<ITrainState, any>)
    };

    public submitForm() {
        this.setState({formLoading: true})
        const requestData: PersephoneApiApiEndpointsModelTrainRequest = {
            modelID: this.state.selectedModel
        }
        api.persephoneApiApiEndpointsModelTrain(requestData).then(res => {
            this.setState({modalOpen: false, selectedModel: -1});
            this.getData()
        }).catch(err => {
            console.error(err)
            this.setState({formLoading: false, formError: err})
        });
    }

    public render() {
        return (
            <div>
                <Header as='h1'>Train a Model</Header>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Corpus ID</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {this.state.models.length > 0 ? this.state.models.map((model) => (
                            <Table.Row key={model.id}>
                                <Table.Cell>{model.id}</Table.Cell>
                                <Table.Cell>{model.name}</Table.Cell>
                                <Table.Cell>{model.corpusID}</Table.Cell>
                                <Table.Cell>
                                    <Button primary={true} onClick={this.clickTrainModel(model.id!)}>
                                        <Icon name='hourglass start' />
                                        Train this model
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        )) :
                            <Table.Row>
                                <Table.Cell colSpan="4">This table is empty</Table.Cell>
                            </Table.Row>
                        }
                        </Table.Body>
                    </Table>
                </Segment>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.closeModal}>
                    <Modal.Header>Confirm operation</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form loading={this.state.formLoading}>
                                <Header>Are you sure you want to train this model?</Header>
                                {this.state.models && this.state.selectedModel !== -1 &&
                                    <React.Fragment>
                                        <Form.Input label="ID" type="text" name="id" value={this.state.models!.find(model => model!.id === this.state!.selectedModel)!.id} readOnly={true} />
                                        <Form.Input label="Name" type="text" name="name" value={this.state.models!.find(model => model!.id === this.state!.selectedModel)!.name} readOnly={true} />
                                    </React.Fragment>
                                }
                                <ErrorMessageComponent error={this.state.formError} />
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary={true} onClick={this.submitForm} loading={this.state.formLoading}>
                            <Icon name='check' />
                            Confirm
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