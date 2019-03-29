import * as React from 'react';

import { Header, Icon, /*Placeholder, PlaceholderLine,*/ Progress, Segment, /*Table*/ } from 'semantic-ui-react';

import { withRouter } from 'react-router';

import { api } from '../API';

import { AudioFileInformation, /*AudioPostRequest,*/ ErrorMessage, PersephoneApiApiEndpointsBulkDataUtterancesRequest, /*PersephoneApiApiEndpointsTranscriptionFromFileRequest,*/ TranscriptionInformation, /*UtteranceInfo, UtterancePostRequest*/ } from '../gen/api';

import Dropzone from 'react-dropzone';

// import { v4 } from 'uuid';

// import Time from './Time';

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
/*
interface IUnmatchedFileRowProps {
    file: IUploadedFile<any>
}

class UnmatchedFileRow extends React.PureComponent<IUnmatchedFileRowProps> {
    render() {
      const { file } = this.props
      return (
        <Table.Row >
            <Table.Cell><Icon name='question'/ ></Table.Cell>
            <Table.Cell>{file.fileType}</Table.Cell>
            <Table.Cell>{file.state}</Table.Cell>
            <Table.Cell>{file.name}</Table.Cell>
            <Table.Cell>{file.fileT ? file.fileT.id : (file.state === RequestState.STARTED && <Placeholder><PlaceholderLine /></Placeholder>)}</Table.Cell>
            <Table.Cell>{file.fileT ? file.fileT.fileInfo!.id : (file.state === RequestState.STARTED && <Placeholder><PlaceholderLine /></Placeholder>)}</Table.Cell>
            <Table.Cell>{file.fileT ? <Time time={file.fileT.fileInfo!.createdAt} /> : (file.state === RequestState.STARTED && <Placeholder><PlaceholderLine /></Placeholder>)}</Table.Cell>
        </Table.Row>
        )
    }
}

interface IMatchedFileRowsProps {
  match: Readonly<IUtteranceMatch>
}

// tslint:disable-next-line:max-classes-per-file
class MatchedFileRows extends React.PureComponent<IMatchedFileRowsProps> {
    render () {
        const { match } = this.props
        return (
        <React.Fragment key={match.audio.id}>
            <Table.Row key={match.audio.id}>
                <Table.Cell rowSpan="2">
                    {match.state === RequestState.FAILED ?
                        <Icon name="times" />
                    :
                        match.state === RequestState.COMPLETE ?
                            <Icon name="check" />
                        :
                            <Icon name="circle notch" loading={true} />
                    }
                </Table.Cell>
                <Table.Cell>{match.audio.fileType}</Table.Cell>
                <Table.Cell>{match.audio.state}</Table.Cell>
                <Table.Cell>{match.audio.name}</Table.Cell>
                <Table.Cell>{match.audio.fileT ? match.audio.fileT.id : (match.audio.state === RequestState.STARTED && <Placeholder><PlaceholderLine /></Placeholder>)}</Table.Cell>
                <Table.Cell>{match.audio.fileT ? match.audio.fileT.fileInfo!.id : (match.audio.state === RequestState.STARTED && <Placeholder><PlaceholderLine /></Placeholder>)}</Table.Cell>
                <Table.Cell>{match.audio.fileT ? <Time time={match.audio.fileT.fileInfo!.createdAt} /> : (match.audio.state === RequestState.STARTED && <Placeholder><PlaceholderLine /></Placeholder>)}</Table.Cell>
            </Table.Row>
            <Table.Row key={match.transcription.id}>
                <Table.Cell>{match.transcription.fileType}</Table.Cell>
                <Table.Cell>{match.transcription.state}</Table.Cell>
                <Table.Cell>{match.transcription.name}</Table.Cell>
                <Table.Cell>{match.transcription.fileT ? match.transcription.fileT.id : (match.transcription.state === RequestState.STARTED && <Placeholder><PlaceholderLine /></Placeholder>)}</Table.Cell>
                <Table.Cell>{match.transcription.fileT ? match.transcription.fileT.fileInfo!.id : (match.transcription.state === RequestState.STARTED && <Placeholder><PlaceholderLine /></Placeholder>)}</Table.Cell>
                <Table.Cell>{match.transcription.fileT ? <Time time={match.transcription.fileT.fileInfo!.createdAt} /> : (match.transcription.state === RequestState.STARTED && <Placeholder><PlaceholderLine /></Placeholder>)}</Table.Cell>
            </Table.Row>
        </React.Fragment>
        )
    }
}
*/

// tslint:disable-next-line:max-classes-per-file
class BulkDropUpload extends React.Component<any, IDropUploadState> {
    constructor(props: any) {
        super(props);
        this.state = {
            acceptedFileTypes: {audio: [], transcription: []} as IAcceptedFileTypes,
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
        // this.match = this.match.bind(this);
        // this.updateFile = this.updateFile.bind(this);
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

    /*
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
                    this.setState({matches: this.state.matches.map(m => m.id === id ? {...m, state: RequestState.COMPLETE} : m)})
                }).catch(err => {
                    this.setState({matches: this.state.matches.map(m => m.id === id ? {...m, state: RequestState.FAILED} : m)})
                });
            }
        }
        this.setState({
            matches: this.state.matches.concat(newMatches),
            uploadedFiles: this.state.uploadedFiles.map(f => ({...f, matched: f.matched || matchedIds.indexOf(f.id) > -1}))
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
    */

    public onDrop(accepted: File[], rejected: File[], event: React.DragEvent<HTMLDivElement>) {
        this.setState({
            dragActive: false
        })
        // Dropzone accept parameter is ".zip" only, will place all .zip extension in the accepted files array
        console.log("accepted: ", accepted, "rejected: ", rejected);
        // const uploadedFiles: Array<IUploadedFile<AudioFileInformation | TranscriptionInformation | undefined>> = [];

        if (rejected.length > 0){
            console.log(rejected, "cannot be uploaded, must be a valid zip file");
        }
        for (const file of accepted) {
            const requestData: PersephoneApiApiEndpointsBulkDataUtterancesRequest = {
                utterancesFile: file
            }
            api.persephoneApiApiEndpointsBulkDataUtterances(requestData).then(res => {                   
                console.log("uploading valid zip file: ", file)
            }).catch(err => {
                console.log("unsuccessful");
            });
        }
            // QQQQ This is very much not the right way...
            /*
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
                        this.updateFile(id, {state: RequestState.COMPLETE, fileT: res})
                        console.log("successfully uploaded", file)
                    }).catch(err => {
                        this.updateFile(id, {state: RequestState.FAILED})
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
                        this.updateFile(id, {state: RequestState.COMPLETE, fileT: res})
                        console.log("successfully uploaded", file)
                    }).catch(err => {
                        this.updateFile(id, {state: RequestState.FAILED})
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
        this.setState({uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)}) 
        */
    }

    public onDragLeave() {
        this.setState({dragActive: false})
    }

    public render() {
        return (
            <div>
                <Header as='h1'>Bulk zip file upload</Header>
                <Dropzone style={{position: "relative"}} onDrop={this.onDrop} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} accept=".zip">
                    <Segment placeholder={true} tertiary={this.state.dragActive} loading={this.state.isLoading}>
                        <Header icon={true}>
                            <Icon name='cloud upload' />
                            Drop a zip file containing pairs of audio and transcription files here to upload and sort into utterances.
                        </Header>
                        {this.state.uploadedFiles.length > 0 &&
                            <Progress attached="bottom" value={this.state.uploadedFiles.filter(f => f.state !== RequestState.STARTED).length} total={this.state.uploadedFiles.length} color="green" />}
                    </Segment>
                </Dropzone>
                <Header as='h2'>Uploaded zip file</Header>
                {/* add in feedback on what got uploaded (not with every file on the table) */}
                {/*<Table basic='very'>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Match</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Upload state</Table.HeaderCell>
                        <Table.HeaderCell>File name</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>File ID</Table.HeaderCell>
                        <Table.HeaderCell>File created at</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.uploadedFiles.length > 0 ?
                            <React.Fragment>
                                {[...this.state.matches]
                                    .sort((one, two) => (one.name === two.name) ? 0 : (one.name < two.name ? -1 : 1))
                                    .map(m => (
                                        <MatchedFileRows key={m.transcription.id} match={m} />
                                ))}
                                {this.state.uploadedFiles
                                    .filter(f => !f.matched)
                                    .sort((one, two) => {
                                        const stateRank = [RequestState.COMPLETE, RequestState.STARTED, RequestState.NOT_STARTED, RequestState.FAILED];
                                        return (one.state !== two.state) ? stateRank.indexOf(one.state) - stateRank.indexOf(two.state) : (one.name < two.name ? -1 : 1);})
                                        .map(file => (
                                            <UnmatchedFileRow key={file.id} file={file} />
                                ))}
                            </React.Fragment>
                        :
                            <Table.Row>
                                <Table.Cell colSpan="5">This table is empty</Table.Cell>
                            </Table.Row>
                        }
                    </Table.Body>
                </Table>*/}
            </div>
        )
    }
}

export default withRouter(BulkDropUpload);