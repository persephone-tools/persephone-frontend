import * as React from 'react';

import { Header, Icon, Progress, Segment, } from 'semantic-ui-react';

import { withRouter } from 'react-router';

import { api } from '../API';

import { AudioFileInformation, ErrorMessage, PersephoneApiApiEndpointsBulkDataUtterancesRequest, TranscriptionInformation, } from '../gen/api';

import Dropzone from 'react-dropzone';

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
            dragActive: false
        })
        console.log("accepted: ", accepted, "rejected: ", rejected);

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
             </div>
        )
    }
}

export default withRouter(BulkDropUpload);