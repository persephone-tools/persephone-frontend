import * as React from 'react';
import '../App.css';

import { Header, Icon, /*Placeholder, PlaceholderLine,*/ Progress, Segment, /*Table*/ } from 'semantic-ui-react';

import { AutoSizer, Column, Table as VTable } from 'react-virtualized';

import 'react-virtualized/styles.css';

import { withRouter } from 'react-router';

import { api } from '../API';

import { AudioFileInformation, AudioPostRequest, ErrorMessage, PersephoneApiApiEndpointsTranscriptionFromFileRequest, TranscriptionInformation, UtteranceInfo, UtterancePostRequest } from '../gen/api';

import Dropzone from 'react-dropzone';

import { v4 } from 'uuid';

import Time from './Time';

export interface IAcceptedFileTypes {
    audio: string[];
    transcription: string[];
}

export enum FileType {
    UNKNOWN = "Unknown",
    AUDIO = "Audio",
    TRANSCRIPTION = "Transcription"
}

export enum RequestState {
    COMPLETE = "Complete",
    STARTED = "Started",
    NOT_STARTED = "Not started",
    FAILED = "Failed"
}

export interface IUploadedFile<T> {
    id: string;
    state: RequestState;
    name: string;
    extension: string;
    nonExtension: string;
    fileType: FileType;
    file: File;
    fileT?: T;
    matched: boolean;
}

export interface IUtteranceMatch {
    id: string;
    name: string;
    state: RequestState;
    audio: IUploadedFile<AudioFileInformation>;
    transcription: IUploadedFile<TranscriptionInformation>;
}

export interface IDropUploadState {
    dragActive: boolean;
    matches: ReadonlyArray<Readonly<IUtteranceMatch>>;
    uploadedFiles: ReadonlyArray<IUploadedFile<AudioFileInformation> | IUploadedFile<TranscriptionInformation>>;
    formError?: ErrorMessage;
    formLoading: boolean;
    isLoading: boolean;
    uploadModalOpen: boolean;
    acceptedFileTypes: IAcceptedFileTypes;
}

// tslint:disable-next-line:max-classes-per-file
class DropUpload extends React.Component<any, IDropUploadState> {
    constructor(props: any) {
        super(props);
        this.state = {
            acceptedFileTypes: { audio: [], transcription: [] } as IAcceptedFileTypes,
            dragActive: false,
            formLoading: false,
            isLoading: true,
            matches: [],
            uploadModalOpen: false,
            uploadedFiles: []
        };
        this.getData = this.getData.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.match = this.match.bind(this);
        this.updateFile = this.updateFile.bind(this);
        this.noRowsRenderer = this.noRowsRenderer.bind(this);
    }

    public getData() {
        this.setState({ isLoading: true });
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
        this.setState({ dragActive: true })
    }

    public match() {
        // const oldUtterances = this.state.utterances;
        const newMatches: IUtteranceMatch[] = [];
        const matchedIds: string[] = [];
        const audio = this.state.uploadedFiles.filter(f => !f.matched && f.fileType === FileType.AUDIO && f.state === RequestState.COMPLETE);
        const transcriptions = this.state.uploadedFiles.filter(f => !f.matched && f.fileType === FileType.TRANSCRIPTION && f.state === RequestState.COMPLETE);
        // QQQQ do something smarter
        for (const audioFile of audio) {
            const transcriptionFile = transcriptions.find(t => t.nonExtension === audioFile.nonExtension);
            if (transcriptionFile) {
                const id = v4();
                newMatches.push({
                    audio: audioFile,
                    id,
                    name: audioFile.nonExtension,
                    state: RequestState.STARTED,
                    transcription: transcriptionFile
                } as IUtteranceMatch)
                transcriptions.splice(transcriptions.indexOf(transcriptionFile), 1);
                matchedIds.push(audioFile.id);
                matchedIds.push(transcriptionFile.id);
                const utteranceInfo: UtteranceInfo = {
                    audioId: audioFile.fileT!.id as number,
                    transcriptionId: transcriptionFile.fileT!.id as number,
                }
                const requestData: UtterancePostRequest = {
                    utteranceInfo
                }
                api.utterancePost(requestData).then(res => {
                    this.setState({ matches: this.state.matches.map(m => m.id === id ? { ...m, state: RequestState.COMPLETE } : m) })
                }).catch(err => {
                    this.setState({ matches: this.state.matches.map(m => m.id === id ? { ...m, state: RequestState.FAILED } : m) })
                });
            }
        }
        this.setState({
            matches: this.state.matches.concat(newMatches),
            uploadedFiles: this.state.uploadedFiles.map(f => ({ ...f, matched: f.matched || matchedIds.indexOf(f.id) > -1 }))
        })
    }

    public updateFile(id: string, file: Partial<IUploadedFile<any>>) {
        const prevFiles = this.state.uploadedFiles

        // Find the file in current array of files.
        const fileIndex = prevFiles.findIndex(f => f.id === id);

        // It should always exist...
        if (fileIndex === -1) {
            // tslint:disable-next-line:no-console
            console.error(`Could not find file with id ${id}`);
            return;
        }

        // Duplicate the array, and replace the old instance of the file, with
        // a new instance having updated attributes.
        const nextFiles = [...prevFiles];
        nextFiles[fileIndex] = { ...nextFiles[fileIndex], ...file };

        // Now update the state so we can re-render with the new array.
        this.setState({ uploadedFiles: nextFiles }, this.match);
    }

    public onDrop(accepted: File[], rejected: File[], event: React.DragEvent<HTMLDivElement>) {
        this.setState({
            dragActive: false,
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
                        matched: false,
                        name: file.name,
                        nonExtension,
                        state: RequestState.STARTED,
                    })
                    const requestData: AudioPostRequest = {
                        audioFile: file
                    }
                    api.audioPost(requestData).then(res => {
                        this.updateFile(id, { state: RequestState.COMPLETE, fileT: res })
                    }).catch(err => {
                        this.updateFile(id, { state: RequestState.FAILED })
                    });
                } else if (this.state.acceptedFileTypes.transcription.indexOf(extension) > -1) {
                    uploadedFiles.push({
                        extension,
                        file,
                        fileType: FileType.TRANSCRIPTION,
                        id,
                        matched: false,
                        name: file.name,
                        nonExtension,
                        state: RequestState.STARTED,
                    })
                    const requestData: PersephoneApiApiEndpointsTranscriptionFromFileRequest = {
                        transcriptionFile: file
                    }
                    api.persephoneApiApiEndpointsTranscriptionFromFile(requestData).then(res => {
                        this.updateFile(id, { state: RequestState.COMPLETE, fileT: res })
                    }).catch(err => {
                        this.updateFile(id, { state: RequestState.FAILED })
                    });
                } else {
                    console.log("unknown filetype, not uploaded")
                    throw Error("Unknown file type")
                }
            } catch {
                uploadedFiles.push({
                    extension,
                    file,
                    fileType: FileType.UNKNOWN,
                    id,
                    matched: false,
                    name: file.name,
                    nonExtension,
                    state: RequestState.FAILED,
                })
            }
        }
        this.setState({
            uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
        })
    }

    public onDragLeave() {
        this.setState({ dragActive: false })
    }

    noRowsRenderer() {
        return (
            <div>
                No uploaded files
          </div>
        )
    }

    public render() {
        return (
            <div>
                <Header as='h1'>Drag 'n' drop upload</Header>
                <Dropzone style={{ position: "relative" }} onDrop={this.onDrop} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave}>
                    <Segment placeholder={true} tertiary={this.state.dragActive} loading={this.state.isLoading}>
                        <Header icon={true}>
                            <Icon name='cloud upload' />
                            Drop audio and transcription files here to upload and sort into utterances.
                        </Header>
                        {this.state.uploadedFiles.length > 0 &&
                            <Progress attached="bottom" value={this.state.uploadedFiles.filter(f => f.state !== RequestState.STARTED).length} total={this.state.uploadedFiles.length} color="green" />}
                    </Segment>
                </Dropzone>
                <Header as='h2'>Uploaded files</Header>
                {this.state.uploadedFiles.length > 0 &&
                    <p>{this.state.uploadedFiles.filter(f => f.fileType === 'Audio').length} audios found, {this.state.uploadedFiles.filter(f => f.fileType === 'Transcription').length} transcriptions found, {this.state.uploadedFiles.filter(f => f.matched === true).length / 2} matches found, {this.state.uploadedFiles.filter(f => f.fileType === 'Unknown').length} unknown files have not been uploaded</p>}
                <Header as='h3'>Matched files</Header>
                <AutoSizer disableHeight={true}>
                    {({ width }) => (
                        <VTable
                            headerHeight={30}
                            height={200}
                            noRowsRenderer={this.noRowsRenderer}
                            rowCount={this.state.matches.length}
                            rowGetter={({ index }) => this.state.matches[index]}
                            rowHeight={50}
                            width={width} >
                            <Column
                                label='Match'
                                dataKey='state'
                                width={100}
                                cellRenderer={({ rowData }) => (
                                    rowData.audio.state && rowData.transcription.state === RequestState.FAILED ?
                                        <Icon name="times" />
                                        : rowData.audio.state && rowData.transcription.state === RequestState.COMPLETE ?
                                            <Icon name="check" />
                                            : <Icon name="circle notch" loading={true} />
                                )} />
                            <Column
                                label='Type'
                                dataKey='audio && transcription'
                                width={100}
                                cellRenderer={({ rowData }) => (
                                    rowData.audio || rowData.transcription ? rowData.audio.fileType + '\n' + rowData.transcription.fileType : 'finding filetype'
                                )} />
                            <Column
                                label='Upload state'
                                dataKey='state'
                                width={100} />
                            <Column
                                label='File name'
                                dataKey='audio && transcription'
                                width={300}
                                cellRenderer={({ rowData }) => (
                                    rowData.audio.fileT || rowData.transcription.fileT ? rowData.audio.name + '\n' + rowData.transcription.name : 'finding filename'
                                )} />
                            <Column
                                label='ID'
                                dataKey='audio && transcription'
                                width={100}
                                cellRenderer={({ rowData }) => (
                                    rowData.audio.fileT || rowData.transcription.fileT ? rowData.audio.fileT.id + '\n' + rowData.transcription.fileT.id : 'finding id'
                                )} />
                            <Column
                                label='File ID'
                                dataKey='audio && transcription'
                                width={100}
                                cellRenderer={({ rowData }) => (
                                    rowData.audio.fileT || rowData.transcription.fileT ? rowData.audio.fileT.fileInfo.id + '\n' + rowData.transcription.fileT.fileInfo.id : 'finding fileid'
                                )} />
                            <Column
                                label='File created at'
                                dataKey='audio && transcription'
                                width={200}
                                cellRenderer={({ rowData }) => (
                                    rowData.audio.fileT || rowData.transcription.fileT ? <>
                                        <Time time={rowData.audio.fileT.fileInfo.createdAt} /><br />
                                        <Time time={rowData.transcription.fileT.fileInfo.createdAt} />
                                    </> : 'finding date'
                                )} />
                        </VTable>
                    )}
                </AutoSizer>
                <Header as='h3'>All files</Header>
                <AutoSizer disableHeight={true}>
                    {({ width }) => (
                        <VTable
                            headerHeight={30}
                            height={200}
                            noRowsRenderer={this.noRowsRenderer}
                            rowCount={this.state.uploadedFiles.length}
                            rowGetter={({ index }) => this.state.uploadedFiles[index]}
                            rowHeight={30}
                            width={width} >
                            <Column
                                label='Match'
                                dataKey='matched'
                                width={100}
                                cellRenderer={({ rowData }) => (
                                    rowData ? <Icon name="check" />
                                        : <Icon name="question" />
                                )} />
                            <Column
                                label='Type'
                                dataKey='fileType'
                                width={100} />
                            <Column
                                label='Upload state'
                                dataKey='state'
                                width={100} />
                            <Column
                                label='File name'
                                dataKey='name'
                                width={300} />
                            <Column
                                label='ID'
                                dataKey='id'
                                width={100} />
                            <Column
                                label='File ID'
                                dataKey='id'
                                width={100} />
                            <Column
                                label='File created at'
                                dataKey='file'
                                width={200}
                                cellRenderer={({ rowData }) => (
                                    <Time time={rowData.createdAt} />
                                )} />
                        </VTable>
                    )}
                </AutoSizer>
            </div>
        )
    }
}
export default withRouter(DropUpload);