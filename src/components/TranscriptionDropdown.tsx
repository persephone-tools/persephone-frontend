import * as React from 'react';

import { Dropdown } from 'semantic-ui-react';

import { api } from '../API';

import { TranscriptionInformation } from '../gen/api';

export interface ITranscriptionResult {
    transcription: TranscriptionInformation;
    key: number;
    value: number;
    text: string;
}

export interface ITranscriptionDropdownProps {
    onChange: (selection: number) => any
}

export interface ITranscriptionDropdownState {
    selection?: number;
    transcriptionResults: ITranscriptionResult[];
    isLoading: boolean;
}

export default class TranscriptionDropdown extends React.Component<ITranscriptionDropdownProps, ITranscriptionDropdownState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            transcriptionResults: [],
        };
        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.transcriptionGet().then(transcriptions => {
            console.log(transcriptions)
            this.setState({
                isLoading: false,
                transcriptionResults: transcriptions.map(transcription => {return {
                    key: transcription.id!,
                    text: `${transcription.name} (id: ${transcription.id})`,
                    transcription,
                    value: transcription.id!,
                } as ITranscriptionResult}),
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public handleChange(event: any, result: any) {
        this.setState({selection: result.value} as Pick<ITranscriptionDropdownState, any>)
        this.props.onChange(result.value)
    }

    public render() {
        return (
            <Dropdown placeholder='Select transcription' fluid={true} search={true} selection={true} options={this.state.transcriptionResults} value={this.state.selection} onChange={this.handleChange} />
        )
    }
}