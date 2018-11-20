import * as React from 'react';

import { Button, Dimmer, Form, Header, Icon, Loader, Modal, Segment, Table } from 'semantic-ui-react';

import ErrorMessageComponent from './ErrorMessageComponent';

import { withRouter } from 'react-router';

import { api } from '../API';

import { AudioFileInformation, AudioPostRequest, ErrorMessage } from '../gen/api';

import Time from './Time';

export interface IAudioState {
    audios: AudioFileInformation[];
    formError?: ErrorMessage;
    formLoading: boolean;
    isLoading: boolean;
    uploadModalOpen: boolean;
}

class Audio extends React.Component<any, IAudioState> {
    constructor(props: any) {
        super(props);
        this.state = {
            audios: [],
            formLoading: false,
            isLoading: true,
            uploadModalOpen: false
        };
        this.getData = this.getData.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.audioGet().then(audios => {
            console.log(audios)
            this.setState({
                audios,
                isLoading: false,
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
            uploadModalOpen: true
        })
    }

    public closeModal() {
        this.clearForm();
        this.setState({
            uploadModalOpen: false
        })
    }

    public submitForm() {
        this.setState({formLoading: true})
        const fileButton: any = document.getElementById("fileUploadId");
        const file = fileButton ? fileButton.files[0] : null;
        console.log(file)
        const requestData: AudioPostRequest = {
            audioFile: file
        }
        api.audioPost(requestData).then(res => {
            this.closeModal();
            this.getData();
        }).catch(err => {
            this.setState({formLoading: false, formError: err})
        });
    }

    public render() {
        return (
            <div>
                <Header as='h1'>All Audio</Header>
                <Button primary={true} onClick={this.openModal}>
                    <Icon name='upload' />
                    Upload new audio file
                </Button>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Audio ID</Table.HeaderCell>
                            <Table.HeaderCell>File ID</Table.HeaderCell>
                            <Table.HeaderCell>File name</Table.HeaderCell>
                            <Table.HeaderCell>File created at</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {this.state.audios.map((audio) => (
                            <Table.Row key={audio.id as number}>
                                <Table.Cell>{audio.id}</Table.Cell>
                                <Table.Cell>{audio.fileInfo!.id}</Table.Cell>
                                <Table.Cell>{audio.fileInfo!.name}</Table.Cell>
                                <Table.Cell><Time time={audio.fileInfo!.createdAt} /></Table.Cell>
                                <Table.Cell><Button circular={true} icon='angle right' onClick={() => this.props.history.push("/audio/" + audio.id)} /><Button circular={true} icon='download' onClick={() => { window.open(audio.fileInfo!.name, '_blank'); }} /></Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </Segment>
                <Modal
                    open={this.state.uploadModalOpen}
                    onClose={this.closeModal}>
                    <Modal.Header>Upload audio</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>Choose file to upload</Header>
                            <Form loading={this.state.formLoading}>
                                <Form.Field>
                                    <label>File</label>
                                    <Form.Input type="file" name="File" id="fileUploadId" />
                                </Form.Field>
                                <ErrorMessageComponent error={this.state.formError} />
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

export default withRouter(Audio);