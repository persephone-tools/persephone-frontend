import * as React from 'react';

import { Button, Dimmer, Form, Header, Icon, Loader, Message, Modal, Segment, Table } from 'semantic-ui-react';

import { withRouter } from 'react-router';

import { api } from '../API';

import { PersephoneApiApiEndpointsTranscriptionFromFileRequest, TranscriptionInformation } from '../gen/api';

export interface ITranscriptionState {
    transcriptions: TranscriptionInformation[];
    formErrorMessage: string;
    formFailed: boolean;
    formLoading: boolean;
    isLoading: boolean;
    uploadModalOpen: boolean;
}

class Transcription extends React.Component<any, ITranscriptionState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formErrorMessage: "No error.",
            formFailed: false,
            formLoading: false,
            isLoading: true,
            transcriptions: [],
            uploadModalOpen: false
        };
        this.getData = this.getData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.transcriptionGet().then(transcriptions => {
            console.log(transcriptions)
            this.setState({
                isLoading: false,
                transcriptions,
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

    public submitForm() {
        this.setState({formLoading: true})
        const fileButton: any = document.getElementById("fileUploadId");
        const file = fileButton ? fileButton.files[0] : null;
        console.log(file)
        const requestData: PersephoneApiApiEndpointsTranscriptionFromFileRequest = {
            transcriptionFile: file
        }
        api.persephoneApiApiEndpointsTranscriptionFromFile(requestData).then(res => {
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
                <Header as='h1'>All Transcriptions</Header>
                <Button primary={true} onClick={this.openModal}>
                    <Icon name='upload' />
                    Create new transcription from file
                </Button>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Manually generated</Table.HeaderCell>
                            <Table.HeaderCell>Created at</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {this.state.transcriptions.map((transcription) => (
                            <Table.Row key={transcription.fileInfo!.id}>
                                <Table.Cell>{transcription.fileInfo!.id}</Table.Cell>
                                <Table.Cell>{transcription.fileInfo!.name}</Table.Cell>
                                <Table.Cell>{transcription.manuallyGenerated !== undefined &&
                                    (transcription.manuallyGenerated ? <Icon name='check' /> : <Icon name='times' />)
                                }</Table.Cell>
                                <Table.Cell>{transcription.fileInfo!.createdAt}</Table.Cell>
                                <Table.Cell><Button circular={true} icon='angle right' onClick={() => this.props.history.push("/transcription/" + transcription.id)} /><Button circular={true} icon='download' onClick={() => { window.open(transcription.fileInfo!.name, '_blank'); }} /></Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </Segment>
                <Modal
                    open={this.state.uploadModalOpen}
                    onClose={this.closeModal}>
                    <Modal.Header>Upload transcription</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>Choose file to upload</Header>
                            <Form loading={this.state.formLoading} error={this.state.formFailed}>
                                <Form.Field>
                                    <label>File</label>
                                    <Form.Input type="file" name="File" id="fileUploadId" />
                                </Form.Field>
                                <Message error={true} header='File upload failed' content={this.state.formErrorMessage} />
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary={true} onClick={this.submitForm}>
                            <Icon name='upload' />
                            Upload
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

export default withRouter(Transcription);