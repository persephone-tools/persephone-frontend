import * as React from 'react';

import { Button, Dimmer, Form, Header, Icon, Loader, Message, Modal, Segment, Table } from 'semantic-ui-react';

import { api } from '../API';

import { CorpusInformation, PersephoneApiApiEndpointsCorpusPreprocessRequest } from '../gen/api';

export interface IPreprocessState {
    corpuses: CorpusInformation[];
    isLoading: boolean;
    formErrorMessage: string;
    formFailed: boolean;
    formLoading: boolean;
    modalOpen: boolean;
    selectedCorpus: number;
}

export default class Preprocess extends React.Component<{}, IPreprocessState> {
    constructor(props: any) {
        super(props);
        this.state = {
            corpuses: [],
            formErrorMessage: "No error.",
            formFailed: false,
            formLoading: false,
            isLoading: true,
            modalOpen: false,
            selectedCorpus: -1,
        };
        this.getData = this.getData.bind(this);
        this.clickPreprocessCorpus = this.clickPreprocessCorpus.bind(this);
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

    public closeModal() {
        this.setState({
            modalOpen: false,
            selectedCorpus: -1,
        })
    }

    clickPreprocessCorpus = (corpusId: number) => (event: any) => {
        this.setState({
            formErrorMessage: "No error.",
            formFailed: false,
            formLoading: false,
            modalOpen: true,
            selectedCorpus: corpusId,
        } as Pick<IPreprocessState, any>)
    };

    public submitForm() {
        this.setState({formLoading: true})
        const requestData: PersephoneApiApiEndpointsCorpusPreprocessRequest = {
            corpusID: this.state.selectedCorpus
        }
        api.persephoneApiApiEndpointsCorpusPreprocess(requestData).then(res => {
            this.setState({modalOpen: false});
        }).catch(res => res.text()).then(err => {
            console.error(err);
            this.setState({formLoading: false, formFailed: true, formErrorMessage: "The error message is: " + err});
        });
    }

    public render() {
        return (
            <div>
                <Header as='h1'>Preprocess a Corpus</Header>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {this.state.corpuses.map((corpus) => (
                            <Table.Row key={corpus.id}>
                                <Table.Cell>{corpus.id}</Table.Cell>
                                <Table.Cell>{corpus.name}</Table.Cell>
                                <Table.Cell>
                                    <Button primary={true} onClick={this.clickPreprocessCorpus(corpus.id!)}>
                                        <Icon name='filter' />
                                        Preprocess this corpus
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </Segment>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.closeModal}>
                    <Modal.Header>Confirm operation</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form loading={this.state.formLoading} error={this.state.formFailed}>
                                <Header>Are you sure you want to preprocess this corpus?</Header>
                                {this.state.corpuses && this.state.selectedCorpus !== -1 &&
                                    <React.Fragment>
                                        <Form.Input label="ID" type="text" name="id" value={this.state.corpuses!.find(corpus => corpus!.id === this.state!.selectedCorpus)!.id} readOnly={true} />
                                        <Form.Input label="Name" type="text" name="name" value={this.state.corpuses!.find(corpus => corpus!.id === this.state!.selectedCorpus)!.name} readOnly={true} />
                                    </React.Fragment>
                                }
                                <Message error={true} header='Corpus preprocessing failed' content={this.state.formErrorMessage} />
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary={true} onClick={this.submitForm}>
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