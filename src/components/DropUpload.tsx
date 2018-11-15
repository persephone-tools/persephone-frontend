import * as React from 'react';

import { Header, Icon, Placeholder, PlaceholderLine, Progress, Segment, Table } from 'semantic-ui-react';

import { withRouter } from 'react-router';

import { api } from '../API';

import { AudioFileInformation, AudioPostRequest, ErrorMessage, PersephoneApiApiEndpointsTranscriptionFromFileRequest, TranscriptionInformation } from '../gen/api';

import Dropzone from 'react-dropzone';

import { v4 } from 'uuid';

// QQQQ API doesn't specify this yet
export interface IAcceptedFileTypes {
    audio: string[];
    transcription: string[];
}

export enum FileType {
    UNKNOWN = "Unknown",
    AUDIO = "Audio",
    TRANSCRIPTION = "Transcription"
}

export enum UploadState {
    COMPLETE = "Complete",
    STARTED = "Started",
    NOT_STARTED = "Not started",
    FAILED = "Failed"
}

export interface IUploadedFile<T> {
    id: string;
    state: UploadState;
    name: string;
    extension: string;
    nonExtension: string;
    fileType: FileType;
    file: File,
    fileT?: T;
}

export interface IUtterance {
    audio: IUploadedFile<AudioFileInformation>;
    transcription: IUploadedFile<TranscriptionInformation>;
}

export interface ITranscriptionState {
    dragActive: boolean;
    utterances: IUtterance[];
    uploadedFiles: Array<IUploadedFile<AudioFileInformation> | IUploadedFile<TranscriptionInformation>>;
    formError?: ErrorMessage;
    formLoading: boolean;
    isLoading: boolean;
    uploadModalOpen: boolean;
    acceptedFileTypes: IAcceptedFileTypes;
}

class Transcription extends React.Component<any, ITranscriptionState> {
    constructor(props: any) {
        super(props);
        this.state = {
            acceptedFileTypes: {audio: [], transcription: []} as IAcceptedFileTypes,
            dragActive: false,
            formLoading: false,
            isLoading: true,
            uploadModalOpen: false,
            uploadedFiles: [],
            utterances: []
        };
        this.getData = this.getData.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.match = this.match.bind(this);
        this.updateFile = this.updateFile.bind(this);
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

    public match() {
        // const oldUtterances = this.state.utterances;
        const newUtterances: IUtterance[] = [];
        // QQQQ do something smarter
        for (const file of this.state.uploadedFiles.filter(f => f.fileType === FileType.AUDIO && f.state === UploadState.COMPLETE)) {
            const splits = file.fileT!.fileInfo!.name!.split('.');
            const notExtension  = splits.slice(0, splits.length - 1);

            for (const oFile of this.state.uploadedFiles.filter(f => f.fileType === FileType.TRANSCRIPTION && f.state === UploadState.COMPLETE)) {
                const oSplits = oFile.fileT!.fileInfo!.name!.split('.');
                const oNotExtension  = oSplits.slice(0, oSplits.length - 1);
                if (notExtension === oNotExtension) {
                    newUtterances.push({
                        audio: file,
                        transcription: oFile
                    } as IUtterance)
                }
            }
        }
        console.log(newUtterances);
        this.setState({utterances: newUtterances})
    }

    public updateFile<T, S extends keyof IUploadedFile<T>>(id: string, file: Pick<IUploadedFile<T>, S>) {
        console.log(this.state.uploadedFiles)
        // QQQQ this hurts me deep inside
        const files = this.state.uploadedFiles;
        const val = files.find(f => f.id === id);
        if (val) {
            const index = files.indexOf(val);
            console.log("a", index)
            for (const key in file) {
                if (file.hasOwnProperty(key)) {
                    files[index][key] = file[key];
                }
            }
            this.setState({uploadedFiles: files})
        }
    }

    public onDrop(accepted: File[], rejected: File[], event: React.DragEvent<HTMLDivElement>) {
        this.setState({
            dragActive: false
        })
        const uploadedFiles: Array<IUploadedFile<AudioFileInformation | TranscriptionInformation | undefined>> = [];
        for (const file of accepted) {
            // QQQQ This is very much not the right way...
            const splits = file.name.split('.');
            const extension = splits[splits.length - 1];
            const nonExtension = splits.slice(0, splits.length - 1).join(".");
            const id = v4();
            try {
                if (this.state.acceptedFileTypes.audio.indexOf(extension) > -1) {
                    uploadedFiles.push({
                        extension,
                        file,
                        fileType: FileType.AUDIO,
                        id,
                        name: file.name,
                        nonExtension,
                        state: UploadState.STARTED,
                    })
                    const requestData: AudioPostRequest = {
                        audioFile: file
                    }
                    api.audioPost(requestData).then(res => {
                        this.updateFile(id, {state: UploadState.COMPLETE, fileT: res})
                        console.log("succesfully uploaded", file)
                    }).catch(err => {
                        this.updateFile(id, {state: UploadState.FAILED})
                    });
                } else if (this.state.acceptedFileTypes.transcription.indexOf(extension) > -1) {
                    uploadedFiles.push({
                        extension,
                        file,
                        fileType: FileType.TRANSCRIPTION,
                        id,
                        name: file.name,
                        nonExtension,
                        state: UploadState.STARTED,
                    })
                    const requestData: PersephoneApiApiEndpointsTranscriptionFromFileRequest = {
                        transcriptionFile: file
                    }
                    api.persephoneApiApiEndpointsTranscriptionFromFile(requestData).then(res => {
                        this.updateFile(id, {state: UploadState.COMPLETE, fileT: res})
                        console.log("succesfully uploaded", file)
                    }).catch(err => {
                        this.updateFile(id, {state: UploadState.FAILED})
                    });
                } else {
                    console.log("unkown filetype, not uploaded")
                    throw Error("Unknown file type")
                }
            } catch {
                uploadedFiles.push({
                    extension,
                    file,
                    fileType: FileType.UNKNOWN,
                    id,
                    name: file.name,
                    nonExtension,
                    state: UploadState.FAILED,
                })
            }
        }
        this.setState({uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)})
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
                        {this.state.uploadedFiles.length > 0 &&
                            <Progress attached="bottom" value={this.state.uploadedFiles.filter(f => f.state !== UploadState.STARTED).length} total={this.state.uploadedFiles.length} color="green" />}
                    </Segment>
                </Dropzone>
                <Header as='h2'>Uploaded files</Header>
                <Table basic='very'>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Upload state</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>File ID</Table.HeaderCell>
                        <Table.HeaderCell>File name</Table.HeaderCell>
                        <Table.HeaderCell>File created at</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.uploadedFiles.length > 0 ? 
                            this.state.uploadedFiles
                                .sort((one, two) => {
                                    if (one.state === two.state && one.name === two.name) {
                                        return 0;
                                    } else {
                                        return one.name! < two.name! ? -1 : 1;
                                    }
                                }).map(file => {
                                    console.log("key", file.id)
                                    return (
                                    <Table.Row key={file.id}>
                                        <Table.Cell>{file.fileType}</Table.Cell>
                                        <Table.Cell>{file.state}</Table.Cell>
                                        <Table.Cell>{file.fileT ? file.fileT.id : <Placeholder><PlaceholderLine /></Placeholder>}</Table.Cell>
                                        <Table.Cell>{file.fileT ? file.fileT.fileInfo!.id : <Placeholder><PlaceholderLine /></Placeholder>}</Table.Cell>
                                        <Table.Cell>{file.fileT ? file.fileT.fileInfo!.name : <Placeholder><PlaceholderLine /></Placeholder>}</Table.Cell>
                                        <Table.Cell>{file.fileT ? file.fileT.fileInfo!.createdAt : <Placeholder><PlaceholderLine /></Placeholder>}</Table.Cell>
                                    </Table.Row>
                                )})
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