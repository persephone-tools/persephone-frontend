import * as React from 'react';

import { Header, Icon, Progress, Segment, Table } from 'semantic-ui-react';

import { withRouter } from 'react-router';

import { api } from '../API';

import { AudioFileInformation, AudioPostRequest, ErrorMessage, PersephoneApiApiEndpointsTranscriptionFromFileRequest, TranscriptionInformation } from '../gen/api';

import Dropzone from 'react-dropzone';

// QQQQ API doesn't specify this yet
export interface IAcceptedFileTypes {
    audio: string[];
    transcription: string[];
}

export interface ITranscriptionState {
    dragActive: boolean;
    audio: AudioFileInformation[];
    transcriptions: TranscriptionInformation[];
    formError?: ErrorMessage;
    formLoading: boolean;
    isLoading: boolean;
    uploadModalOpen: boolean;
    acceptedFileTypes: IAcceptedFileTypes;
    uploadsInProgress: number;
    uploadsFailed: number;
    uploadsSucceeded: number;
}

class Transcription extends React.Component<any, ITranscriptionState> {
    constructor(props: any) {
        super(props);
        this.state = {
            acceptedFileTypes: {audio: [], transcription: []} as IAcceptedFileTypes,
            audio: [],
            dragActive: false,
            formLoading: false,
            isLoading: true,
            transcriptions: [],
            uploadModalOpen: false,
            uploadsFailed: 0,
            uploadsInProgress: 0,
            uploadsSucceeded: 0
        };
        this.getData = this.getData.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.persephoneApiApiEndpointsBackendAcceptedFiletypes().then(res => res.json()).then(json => {
            this.setState({
                acceptedFileTypes: json as IAcceptedFileTypes,
                isLoading: false
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public onDragEnter() {
        this.setState({dragActive: true})
    }

    public onDrop(accepted: File[], rejected: File[], event: React.DragEvent<HTMLDivElement>) {
        this.setState({
            dragActive: false,
            uploadsFailed: this.state.uploadsFailed + rejected.length,
            uploadsInProgress: this.state.uploadsInProgress + accepted.length
        })
        for (const file of accepted) {
            // QQQQ This is very much not the right way...
            const splits = file.name.split('.');
            const extension = splits[splits.length - 1];
            if (this.state.acceptedFileTypes.audio.indexOf(extension) > -1) {
                const requestData: AudioPostRequest = {
                    audioFile: file
                }
                api.audioPost(requestData).then(res => {
                    this.setState({
                        audio: this.state.audio.concat([res]),
                        uploadsInProgress: this.state.uploadsInProgress - 1,
                        uploadsSucceeded: this.state.uploadsSucceeded + 1
                    })
                    console.log("succesfully uploaded", file)
                }).catch(err => {
                    this.setState({
                        uploadsFailed: this.state.uploadsFailed + 1,
                        uploadsInProgress: this.state.uploadsInProgress - 1
                    })
                });
            } else if (this.state.acceptedFileTypes.transcription.indexOf(extension) > -1) {
                const requestData: PersephoneApiApiEndpointsTranscriptionFromFileRequest = {
                    transcriptionFile: file
                }
                api.persephoneApiApiEndpointsTranscriptionFromFile(requestData).then(res => {
                    this.setState({
                        transcriptions: this.state.transcriptions.concat([res]),
                        uploadsInProgress: this.state.uploadsInProgress - 1,
                        uploadsSucceeded: this.state.uploadsSucceeded + 1
                    })
                    console.log("succesfully uploaded", file)
                }).catch(err => {
                    this.setState({
                        uploadsFailed: this.state.uploadsFailed + 1,
                        uploadsInProgress: this.state.uploadsInProgress - 1
                    })
                });
            } else {
                console.log("unkown filetype, not uploaded")
                this.setState({
                    uploadsFailed: this.state.uploadsFailed + 1,
                    uploadsInProgress: this.state.uploadsInProgress - 1
                })
            }
        }
    }

    public onDragLeave() {
        this.setState({dragActive: false})
    }

    public render() {
        return (
            <div>
                <Header as='h1'>Drag 'n' drop upload</Header>
                <Dropzone style={{position: "relative"}} onDrop={this.onDrop} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave}>
                    <Segment placeholder={true} tertiary={this.state.dragActive} loading={this.state.isLoading}>
                        <Header icon={true}>
                            <Icon name='cloud upload' />
                            Drop audio and transcription files here to upload and sort into utterances.
                        </Header>
                        {this.state.uploadsFailed + this.state.uploadsSucceeded + this.state.uploadsInProgress > 0 &&
                            <Progress attached="bottom" value={this.state.uploadsFailed + this.state.uploadsSucceeded} total={this.state.uploadsFailed + this.state.uploadsSucceeded + this.state.uploadsInProgress} color="green" />}
                    </Segment>
                </Dropzone>
                <Header as='h2'>Uploaded files</Header>
                <Table basic='very'>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>File ID</Table.HeaderCell>
                        <Table.HeaderCell>File name</Table.HeaderCell>
                        <Table.HeaderCell>File created at</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.audio.length + this.state.transcriptions.length > 0 ? 
                            Array.from(new Set([...this.state.audio, ...this.state.transcriptions]).values())
                                .sort((one, two) => {
                                    if (one.fileInfo!.name === two.fileInfo!.name) {
                                        return 0;
                                    } else {
                                        return one.fileInfo!.name! < two.fileInfo!.name! ? -1 : 1;
                                    }
                                }).map(file => (
                                    <Table.Row key={file.fileInfo!.id as number}>
                                        <Table.Cell>{this.state.audio.indexOf(file) > -1 ? "Audio" : "Transcription"}</Table.Cell>
                                        <Table.Cell>{file.id}</Table.Cell>
                                        <Table.Cell>{file.fileInfo!.id}</Table.Cell>
                                        <Table.Cell>{file.fileInfo!.name}</Table.Cell>
                                        <Table.Cell>{file.fileInfo!.createdAt}</Table.Cell>
                                    </Table.Row>
                                ))
                        :
                            <Table.Row>
                                <Table.Cell colSpan="5">This table is empty</Table.Cell>
                            </Table.Row>
                        }
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default withRouter(Transcription);