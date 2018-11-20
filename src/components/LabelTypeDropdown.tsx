import * as React from 'react';

import { Dropdown } from 'semantic-ui-react';

import { api } from '../API';

import { LabelTypeInformation } from '../gen/api';

export interface ILabelTypeResult {
    labelType: LabelTypeInformation;
    key: number;
    value: string;
    text: string;
}

export interface ILabelTypeDropdownProps {
    onChange: (selection: string) => any
}

export interface ILabelTypeDropdownState {
    selection?: string;
    labelTypeResults: ILabelTypeResult[];
    isLoading: boolean;
}

export default class LabelTypeDropdown extends React.Component<ILabelTypeDropdownProps, ILabelTypeDropdownState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            labelTypeResults: [],
        };
        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.persephoneApiApiEndpointsBackendSupportedLabels().then(labelTypes => {
            console.log(labelTypes)
            this.setState({
                isLoading: false,
                labelTypeResults: labelTypes.map(labelType => {return {
                    key: labelType.id!,
                    labelType,
                    text: `${labelType.name} (${labelType.explanation})`,
                    value: labelType.name!,
                } as ILabelTypeResult}),
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public handleChange(event: any, result: any) {
        this.setState({selection: result.value} as Pick<ILabelTypeDropdownState, any>)
        this.props.onChange(result.value)
    }

    public render() {
        return (
            <Dropdown loading={this.state.isLoading} placeholder='Select label type' fluid={true} search={true} selection={true} options={this.state.labelTypeResults} value={this.state.selection} onChange={this.handleChange} />
        )
    }
}