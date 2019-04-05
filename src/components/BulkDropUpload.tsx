import * as React from 'react';

import { Dimmer, Header, Icon, Loader, Progress, Segment, } from 'semantic-ui-react';

import { withRouter } from 'react-router';

import { api } from '../API';

import { AudioFileInformation, ErrorMessage, PersephoneApiApiEndpointsBulkDataUtterancesRequest, TranscriptionInformation, } from '../gen/api';

import Dropzone from 'react-dropzone';

import { v4 } from 'uuid';

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

export interface IRejectedFiles {
    id: string;
    name: string;
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
    rejectedFiles: ReadonlyArray<IRejectedFiles>;
    uploadedFiles: ReadonlyArray<IUploadedFile<AudioFileInformation> | IUploadedFile<TranscriptionInformation>>;
    formError?: ErrorMessage;
    formLoading: boolean;
    isLoading: boolean;
    uploadModalOpen: boolean;
    uploading: boolean;
    acceptedFileTypes: IAcceptedFileTypes;
    zipName: string;
}

class BulkDropUpload extends React.Component<any, IDropUploadState> {
    constructor(props: any) {
        super(props);
        this.state = {
            acceptedFileTypes: {audio: [], transcription: []} as IAcceptedFileTypes,
            dragActive: false,
            formLoading: false,
            isLoading: true,
            matches: [],
            rejectedFiles: [],
            uploadModalOpen: false,
            uploadedFiles: [],
            uploading: false,
            zipName: '',
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
            uploading: true
        })
        console.log(this.state.uploading);
        const rejectedFiles: IRejectedFiles[] = [];
        if (rejected.length > 0) {
            for (const file of rejected) {
                const id = v4();
                rejectedFiles.push({
                    id,
                    name: file.name,
                }) 
            }
        }
        for (const file of accepted) {
            try {
                const requestData: PersephoneApiApiEndpointsBulkDataUtterancesRequest = {
                    utterancesFile: file
                }
                api.persephoneApiApiEndpointsBulkDataUtterances(requestData).then(res => {                                  
                    console.log("uploading valid zip file: ", file);
                    console.log("result: ", res);
                    this.setState({
                        zipName: file.name,
                    })
                    Object.keys(res).forEach((item) => {
                        console.log(item);
                        console.log(res[item]);
                    })          
                })
            } catch {
                console.log("unsuccessful");
            }
        }    
        this.setState({
            rejectedFiles: this.state.rejectedFiles.concat(rejectedFiles),
            uploading: false
        })
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
                        <Dimmer active={this.state.uploading}>
                            <Loader size='huge'>Uploading File</Loader>
                        </Dimmer>
                        <Header icon={true}>
                            <Icon name='cloud upload' />
                            Drop a zip file containing pairs of audio and transcription files here to upload and sort into utterances.
                        </Header>
                        {this.state.uploadedFiles.length > 0 &&
                            <Progress attached="bottom" value={this.state.uploadedFiles.filter(f => f.state !== RequestState.STARTED).length} total={this.state.uploadedFiles.length} color="green" />}
                    </Segment>
                </Dropzone>
                <Header as='h2'>Uploaded zip file</Header>
                {this.state.zipName.length > 0 &&
                    <p>{this.state.zipName} has successfully uploaded</p>}
                {this.state.rejectedFiles.length > 0 &&
                    <div style={{color: "red"}}>{this.state.rejectedFiles.map((rejectedFiles) => (
                        <li key={rejectedFiles.id}>
                            {rejectedFiles.name} has not been uploaded, must be a valid zip file
                        </li>
                    ))}</div>}
            </div>
        )
    }
}

export default withRouter(BulkDropUpload);