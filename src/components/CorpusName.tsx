import * as React from 'react';

import { Placeholder } from 'semantic-ui-react';

import { api } from '../API';

import { CorpusCorpusIDGetRequest, CorpusInformation } from '../gen/api';

export interface ICorpusNameProps {
    corpusId: number;
}

export interface ICorpusNameState {
    corpus?: CorpusInformation;
    isLoading: boolean;
}

export default class CorpusName extends React.Component<ICorpusNameProps, ICorpusNameState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        const requestData: CorpusCorpusIDGetRequest = {
            corpusID: this.props.corpusId as number
        }
        api.corpusCorpusIDGet(requestData).then(corpus => {
            console.log(corpus)
            this.setState({
                corpus,
                isLoading: false,
            })
        }).catch(console.error);
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.isLoading && !this.state.corpus ?
                    <Placeholder>
                        <Placeholder.Line />
                    </Placeholder>
                :
                    this.state.corpus!.name
                }
            </React.Fragment>
        )
    }
}