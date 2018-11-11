import * as React from 'react';

import { Button, Dimmer, Form, Header, Icon, Loader, Message, Modal, Segment, Table } from 'semantic-ui-react';

import { withRouter } from 'react-router';

import { api } from '../API';

import { UtteranceInfo, UtteranceInformation, UtterancePostRequest } from '../gen/api';

import AudioDropdown from './AudioDropdown';
import AudioName from './AudioName';
import TranscriptionDropdown from './TranscriptionDropdown';
import TranscriptionName from './TranscriptionName';

export interface IUtteranceState {
    utterances: UtteranceInformation[];
    formErrorMessage: string;
    formFailed: boolean;
    formLoading: boolean;
    isLoading: boolean;
    uploadModalOpen: boolean;
    audio?: string;
    transcription?: string;
}

class Utterance extends React.Component<any, IUtteranceState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formErrorMessage: "No error.",
            formFailed: false,
            formLoading: false,
            isLoading: true,
            uploadModalOpen: false,
            utterances: []
        };
        this.getData = this.getData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.utteranceGet().then(utterances => {
            console.log(utterances)
            this.setState({
                isLoading: false,
                utterances
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
            formLoading: false,
            uploadModalOpen: true
        })
    }

    public closeModal() {
        this.setState({
            uploadModalOpen: false
        })
    }

    handleChange = (field: string) => (event: any) => {
        this.setState({ [field]: event.target.value } as Pick<IUtteranceState, any>);
    };

    public submitForm() {
        this.setState({formLoading: true})
        const utteranceInfo: UtteranceInfo = {
            audioId: Number.parseInt(this.state.audio || "-1", 10) || -1,
            transcriptionId: Number.parseInt(this.state.transcription || "-1", 10) || -1,
        }
        const requestData: UtterancePostRequest = {
            utteranceInfo
        }
        api.utterancePost(requestData).then(res => {
            this.setState({uploadModalOpen: false});
            this.getData();
        }).catch(res => res.text()).then(err => {
            console.error(err);
            this.setState({formLoading: false, formFailed: true, formErrorMessage: "The error message is: " + err});
        });
    }

    public render() {
        return (
            <div>
                <Header as='h1'>All Utterances</Header>
                <Button primary={true} onClick={this.openModal}>
                    <Icon name='plus' />
                    Create new utterance
                </Button>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Audio</Table.HeaderCell>
                            <Table.HeaderCell>Transcription</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {this.state.utterances.map((utterance) => (
                            <Table.Row key={utterance.id!.toString()}>
                                <Table.Cell>{utterance.id}</Table.Cell>
                                <Table.Cell><AudioName audioId={utterance.audio} /> (id: {utterance.audio})</Table.Cell>
                                <Table.Cell><TranscriptionName transcriptionId={utterance.transcription} />(id: {utterance.transcription})</Table.Cell>
                                <Table.Cell><Button circular={true} icon='angle right' onClick={() => this.props.history.push("/utterance/" + utterance.id)} /><Button circular={true} icon='download' onClick={() => { window.open(utterance.id!.toString(), '_blank'); }} /></Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </Segment>
                <Modal
                    open={this.state.uploadModalOpen}
                    onClose={this.closeModal}>
                    <Modal.Header>Create utterance</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form loading={this.state.formLoading} error={this.state.formFailed}>
                                <Header>Utterance details</Header>
                                <Form.Field>
                                    <label>Audio</label>
                                    <AudioDropdown onChange={(selection: number) => this.setState({audio: selection} as Pick<IUtteranceState, any>)} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Transcription</label>
                                    <TranscriptionDropdown onChange={(selection: number) => this.setState({transcription: selection} as Pick<IUtteranceState, any>)} />
                                </Form.Field>
                                <Message error={true} header='Utterance creation failed' content={this.state.formErrorMessage} />
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

export default withRouter(Utterance);