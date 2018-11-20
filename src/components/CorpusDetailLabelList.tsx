import * as React from 'react';

import { Dimmer, Loader, Segment, Table } from 'semantic-ui-react';

import { api } from '../API';

import { Label, LabelGetRequest, PersephoneApiApiEndpointsCorpusGetLabelSetRequest } from '../gen/api';

export interface ICorpusDetailLabelListProps {
    corpusId: number;
}

export interface ICorpusDetailLabelListState {
    labels: Label[];
    isLoading: boolean;
}

export default class CorpusDetailLabelList extends React.Component<ICorpusDetailLabelListProps, ICorpusDetailLabelListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            labels: [],
        };
        this.getData = this.getData.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        const requestData: PersephoneApiApiEndpointsCorpusGetLabelSetRequest = {
            corpusID: this.props.corpusId
        }
        api.persephoneApiApiEndpointsCorpusGetLabelSet(requestData).then(res => {
            console.log(res)
            this.setState({
                isLoading: false,
                labels: res.labels!,
            })
        }).catch(console.error);
        this.setState({isLoading: true});
        api.labelGet({} as LabelGetRequest).then(labels => {
            console.log(labels)
            this.setState({
                isLoading: false,
                labels
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <React.Fragment>
                <Segment>
                    <Dimmer active={this.state.isLoading}>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Table basic='very'>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Phonetic label</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {this.state.labels.map((label) => (
                            <Table.Row key={label.id!.toString()}>
                                <Table.Cell>{label.id}</Table.Cell>
                                <Table.Cell>{label.label}</Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>
                </Segment>
            </React.Fragment>
        )
    }
}