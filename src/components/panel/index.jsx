import React from 'react';
import {Button, Row} from 'antd';
import 'antd/lib/style/index.css';

export default function Panel(props) {
    const {className, style} = props;
    return (
        <div className={className} style={style}>
            <Row>
                <Button type={'link'}>
                    <i className={'iconfont icon-Ball'} />
                </Button>
                <Button>
                    <i className={'iconfont icon-arrow-left'} />
                </Button>
            </Row>
        </div>
    );
}
