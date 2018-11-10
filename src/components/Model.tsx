import * as React from 'react';

import { Button, Card, Dimmer, Form, Header, Icon, Loader, Message, Modal, Segment } from 'semantic-ui-react';

import { api } from '../API';

import { ModelInformation } from '../gen/api';

import ModelCard from './ModelCard';

export interface IModelState {
    models: ModelInformation[];
    isLoading: boolean;
    formErrorMessage: string;
    formFailed: boolean;
    formLoading: boolean;
    modalOpen: boolean;
}

export default class Model extends React.Component<{}, IModelState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formErrorMessage: "No error.",
            formFailed: false,
            formLoading: false,
            isLoading: true,
            modalOpen: false,
            models: []
        };
        this.getData = this.getData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.modelGet().then(models => {
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

    public openModal() {
        this.setState({
            formErrorMessage: "No error.",
            formFailed: false,
            formLoading: true,
            modalOpen: true
        })
        api.utteranceGet().then(utterances => {
            console.log(utterances);
        })
    }

    public closeModal() {
        this.setState({
            modalOpen: false
        })
    }

    public submitForm() {
        console.log("you pressed the magic button")
        this.setState({formLoading: true})
        /*api.audioPost().then(res => {
            this.setState({modalOpen: false});
            this.getData();
        }).catch(res => res.text()).then(err => {
            console.error(err);
            this.setState({formLoading: false, formFailed: true, formErrorMessage: "The error message is: " + err});
        });*/
    }

    public render() {
        return (
            <div>
                <Header as='h2'>Models</Header>
                <Button primary={true} onClick={this.openModal}>
                    <Icon name='upload' />
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
                            <Form loading={this.state.formLoading} error={this.state.formFailed}>
                                <Header>Basic model information</Header>
                                <Form.Field>
                                    <Form.Input label="The name of this model" type="text" name="name" placeholder="Example Model" />
                                    <Form.Input label="The type of the labels" type="text" name="label_type" placeholder="phonemes" />
                                    <Form.Input label="The type of the features" type="text" name="feature_type" placeholder="fbank" />
                                </Form.Field>
                                <Header>Choose utterances into training, validation, and testing groups</Header>
                                <Message id="errormessage" error={true} header='Model creation failed' content={this.state.formErrorMessage} />
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