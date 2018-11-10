import * as React from 'react';

import { Button, Card, Dimmer, Form, Header, Icon, Loader, Message, Modal, Segment } from 'semantic-ui-react';

import { api } from '../API';

import { CorpusInformation } from '../gen/api';

import CorpusCard from './CorpusCard';

export interface ICorpusState {
    corpuses: CorpusInformation[];
    isLoading: boolean;
    formErrorMessage: string;
    formFailed: boolean;
    formLoading: boolean;
    modalOpen: boolean;
}

export default class Corpus extends React.Component<{}, ICorpusState> {
    constructor(props: any) {
        super(props);
        this.state = {
            corpuses: [],
            formErrorMessage: "No error.",
            formFailed: false,
            formLoading: false,
            isLoading: true,
            modalOpen: false
        };
        this.getData = this.getData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.corpusGet().then(corpuses => {
            console.log(corpuses)
            this.setState({
                corpuses,
                isLoading: false,
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
                <Header as='h1'>Corpuses</Header>
                <Button primary={true} onClick={this.openModal}>
                    <Icon name='upload' />
                    Create new corpus
                </Button>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Card.Group>
                        {this.state.corpuses.map((corpus) => (
                            <CorpusCard key={corpus.id} corpus={corpus} />
                        ))}
                    </Card.Group>
                </Segment>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.closeModal}>
                    <Modal.Header>New corpus</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form loading={this.state.formLoading} error={this.state.formFailed}>
                                <Header>Basic corpus information</Header>
                                <Form.Field>
                                    <Form.Input label="The name of this corpus" type="text" name="name" placeholder="Example Corpus" />
                                    <Form.Input label="The type of the labels" type="text" name="label_type" placeholder="phonemes" />
                                    <Form.Input label="The type of the features" type="text" name="feature_type" placeholder="fbank" />
                                </Form.Field>
                                <Header>Choose utterances into training, validation, and testing groups</Header>
                                <Message id="errormessage" error={true} header='Corpus creation failed' content={this.state.formErrorMessage} />
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