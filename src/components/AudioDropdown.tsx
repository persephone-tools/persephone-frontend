import * as React from 'react';

import { Dropdown } from 'semantic-ui-react';

import { api } from '../API';

import { AudioFileInformation, AudioGetRequest } from '../gen/api';

export interface IAudioResult {
    audio: AudioFileInformation;
    key: number;
    value: number;
    text: string;
}

export interface IAudioDropdownProps {
    onChange: (selection: number) => any
}

export interface IAudioDropdownState {
    selection?: number;
    audioResults: IAudioResult[];
    isLoading: boolean;
}

export default class AudioDropdown extends React.Component<IAudioDropdownProps, IAudioDropdownState> {
    constructor(props: any) {
        super(props);
        this.state = {
            audioResults: [],
            isLoading: true,
        };
        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.audioGet({} as AudioGetRequest).then(audio => {
            console.log(audio)
            this.setState({
                audioResults: audio.map(ao => {return {
                    audio: ao,
                    key: ao.id!,
                    text: `${ao.fileInfo!.name} (id: ${ao.id})`,
                    value: ao.id!,
                } as IAudioResult}),
                isLoading: false,
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public handleChange(event: any, result: any) {
        this.setState({selection: result.value} as Pick<IAudioDropdownState, any>)
        this.props.onChange(result.value)
    }

    public render() {
        return (
            <Dropdown loading={this.state.isLoading} placeholder='Select audio' fluid={true} search={true} selection={true} options={this.state.audioResults} value={this.state.selection} onChange={this.handleChange} />
        )
    }
}