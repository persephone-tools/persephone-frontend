import * as React from 'react';

import Moment from 'react-moment';

import * as moment from 'moment';

export interface ITimeProps {
    time?: string | Date;
}

export class Time extends React.Component<ITimeProps, {}> {
    public render() {
        return (
            <Moment date={this.props.time} format={moment.localeData().longDateFormat('lll')} fromNow={true} fromNowDuring={300000} />
        )
    }
}

export default Time;