import * as React from 'react';

import { Placeholder } from 'semantic-ui-react';

import { api } from '../API';

import { TranscriptionInformation, TranscriptionTranscriptionIDGetRequest, TranscriptionURI } from '../gen/api';

export interface ITranscriptionNameProps {
    transcriptionId: TranscriptionURI;
}

export interface ITranscriptionNameState {
    transcription?: TranscriptionInformation;
    isLoading: boolean;
}

export default class TranscriptionName extends React.Component<ITranscriptionNameProps, ITranscriptionNameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        const requestData: TranscriptionTranscriptionIDGetRequest = {
            transcriptionID: this.props.transcriptionId as number
        }
        api.transcriptionTranscriptionIDGet(requestData).then(transcription => {
            console.log(transcription)
            this.setState({
                isLoading: false,
                transcription,
            })
        }).catch(console.error);
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.isLoading && !this.state.transcription ?
                    <Placeholder>
                        <Placeholder.Line />
                    </Placeholder>
                :
                    this.state.transcription!.name
                }
            </React.Fragment>
        )
    }
}