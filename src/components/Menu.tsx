import * as React from 'react';

import { Icon, Menu } from 'semantic-ui-react';

export default class MainMenu extends React.Component {
    public render() {
        return (
            <Menu vertical={true} secondary={true} pointing={true} fixed="left">
                <Menu.Item>
                    <Menu.Header>Introduction</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item>
                            <Icon name='home' />
                            Home
                    </Menu.Item>
                        <Menu.Item>
                            <Icon name='info' />
                            Introduction
                    </Menu.Item>
                        <Menu.Item>
                            <Icon name='help' />
                            How-to
                    </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Data</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item>
                            <Icon name='box' />
                            Models
                    </Menu.Item>
                        <Menu.Item>
                            <Icon name='book' />
                            Corpuses
                    </Menu.Item>
                        <Menu.Item>
                            <Icon name='music' />
                            Audio
                    </Menu.Item>
                        <Menu.Item>
                            <Icon name='pencil alternate' />
                            Transcriptions
                    </Menu.Item>
                        <Menu.Item>
                            <Icon name='talk' />
                            Utterances
                    </Menu.Item>
                        <Menu.Item>
                            <Icon name='tag' />
                            Labels
                    </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Operations</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item>
                            <Icon name='filter' />
                            Preprocess
                    </Menu.Item>
                        <Menu.Item>
                            <Icon name='hourglass start' />
                            Train
                    </Menu.Item>
                        <Menu.Item>
                            <Icon name='language' />
                            Transcribe
                    </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Community</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item href="https://lists.persephone-asr.org/postorius/lists/announce.lists.persephone-asr.org/" target='_blank'>
                            <Icon name='announcement' />
                            Announcements
                    </Menu.Item>
                        <Menu.Item href="https://lists.persephone-asr.org/postorius/lists/discuss.lists.persephone-asr.org/" target='_blank'>
                            <Icon name='discussions' />
                            Discussion
                    </Menu.Item>
                        <Menu.Item href="https://persephone-asr.org/" target='_blank'>
                            <Icon name='external' />
                            Website
                    </Menu.Item>
                        <Menu.Item href="https://github.com/persephone-tools/" target='_blank'>
                            <Icon name='github' />
                            GitHub
                    </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Support</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item href="https://lists.persephone-asr.org/" target='_blank'>
                            <Icon name='mail' />
                            Community mailing lists
                    </Menu.Item>
                        <Menu.Item href="https://persephone.readthedocs.io/en/latest/" target='_blank'>
                            <Icon name='book' />
                            Documentation
                    </Menu.Item>
                        <Menu.Item href="https://www.customprogrammingsolutions.com/" target='_blank'>
                            <Icon name='dollar' />
                            Enterprise support
                    </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        )
    }
}