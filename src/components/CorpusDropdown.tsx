import * as React from 'react';

import { Dropdown } from 'semantic-ui-react';

import { api } from '../API';

import { CorpusInformation } from '../gen/api';

export interface ICorpusResult {
    corpus: CorpusInformation;
    key: number;
    value: number;
    text: string;
}

export interface ICorpusDropdownProps {
    onChange: (selection: number) => any
}

export interface ICorpusDropdownState {
    selection?: number;
    corpusResults: ICorpusResult[];
    isLoading: boolean;
}

export default class CorpusDropdown extends React.Component<ICorpusDropdownProps, ICorpusDropdownState> {
    constructor(props: any) {
        super(props);
        this.state = {
            corpusResults: [],
            isLoading: true,
        };
        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.corpusGet().then(corpuses => {
            console.log(corpuses)
            this.setState({
                corpusResults: corpuses.map(corpus => {return {
                    corpus,
                    key: corpus.id!,
                    text: `${corpus.name} (id: ${corpus.id})`,
                    value: corpus.id!,
                } as ICorpusResult}),
                isLoading: false,
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public handleChange(event: any, result: any) {
        this.setState({selection: result.value} as Pick<ICorpusDropdownState, any>)
        this.props.onChange(result.value)
    }

    public render() {
        return (
            <Dropdown placeholder='Select corpus' fluid={true} search={true} selection={true} options={this.state.corpusResults} value={this.state.selection} onChange={this.handleChange} />
        )
    }
}