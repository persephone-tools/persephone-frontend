import * as React from 'react';

import { Message } from 'semantic-ui-react';

import { ErrorMessage } from '../gen/api';

export interface IModelProps {
    error?: ErrorMessage;
}

export default class ErrorMessageComponent extends React.Component<IModelProps, {}> {
    public render() {
        return this.props.error ? (<Message negative={true} header={this.props.error.title} content={this.props.error.detail} />) : (<></>);
    }
}