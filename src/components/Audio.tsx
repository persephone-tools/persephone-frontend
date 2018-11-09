import * as React from 'react';

import { Button, Dimmer, Form, Header, Icon, Loader, Modal, Segment, Table } from 'semantic-ui-react';

import { withRouter } from 'react-router';

import { api } from '../API';

import { AudioFileInformation } from '../gen/api';

export interface IAudioState {
    audios: AudioFileInformation[];
    isLoading: boolean;
    uploadModalOpen: boolean;
}

class Audio extends React.Component<any, IAudioState> {
    constructor(props: any) {
        super(props);
        this.state = {
            audios: [],
            isLoading: true,
            uploadModalOpen: false
        };
        this.getData = this.getData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    public getData() {
        api.audioGet().then(audios => {
            this.setState({
                audios,
                isLoading: false,
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public openModal() {
        this.setState({
            uploadModalOpen: true
        })
    }

    public closeModal() {
        this.setState({
            uploadModalOpen: false
        })
    }

    public submitForm() {
        const fileButton: any = document.getElementById("fileUploadId");
        const file = fileButton ? fileButton.files[0] : null;
        api.audioPost(file).then(console.log);
    }

    public render() {
        return (
            <div>
                <Header as='h2'>Audio</Header>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Button primary={true} onClick={this.openModal}>
                        <Icon name='upload' />
                        Upload new audio file
                    </Button>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Created at</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {this.state.audios.map((audio) => (
                            <Table.Row key={audio.file_info!.id}>
                                <Table.Cell>{audio.file_info!.id}</Table.Cell>
                                <Table.Cell>{audio.file_info!.name}</Table.Cell>
                                <Table.Cell>{audio.file_info!.created_at}</Table.Cell>
                                <Table.Cell><Button circular={true} icon='angle right' onClick={() => this.props.history.push("/audio/" + audio.id)} /><Button circular={true} icon='download' onClick={() => { window.open(audio.file_info!.name, '_blank'); }} /></Table.Cell>
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
                            <Form>
                                <Form.Field>
                                    <label>File</label>
                                    <Form.Input type="file" name="File" id="fileUploadId" />
                                </Form.Field>
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