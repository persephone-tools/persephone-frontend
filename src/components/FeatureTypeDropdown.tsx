import * as React from 'react';

import { Dropdown } from 'semantic-ui-react';

import { api } from '../API';

import { FeatureTypeInformation } from '../gen/api';

export interface IFeatureTypeResult {
    featureType: FeatureTypeInformation;
    key: number;
    value: string;
    text: string;
}

export interface IFeatureTypeDropdownProps {
    onChange: (selection: string) => any
}

export interface IFeatureTypeDropdownState {
    selection?: string;
    featureTypeResults: IFeatureTypeResult[];
    isLoading: boolean;
}

export default class FeatureTypeDropdown extends React.Component<IFeatureTypeDropdownProps, IFeatureTypeDropdownState> {
    constructor(props: any) {
        super(props);
        this.state = {
            featureTypeResults: [],
            isLoading: true,
        };
        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public getData() {
        this.setState({isLoading: true});
        api.persephoneApiApiEndpointsBackendSupportedFeatures().then(featureTypes => {
            console.log(featureTypes)
            this.setState({
                featureTypeResults: featureTypes.map(featureType => {return {
                    featureType,
                    key: featureType.id!,
                    text: `${featureType.name} (${featureType.explanation})`,
                    value: featureType.name!,
                } as IFeatureTypeResult}),
                isLoading: false,
            })
        });
    }

    public componentDidMount() {
        this.getData();
    }

    public handleChange(event: any, result: any) {
        this.setState({selection: result.value} as Pick<IFeatureTypeDropdownState, any>)
        this.props.onChange(result.value)
    }

    public render() {
        return (
            <Dropdown loading={this.state.isLoading} placeholder='Select feature type' fluid={true} search={true} selection={true} options={this.state.featureTypeResults} value={this.state.selection} onChange={this.handleChange} />
        )
    }
}