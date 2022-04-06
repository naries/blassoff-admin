/** @format */
import React from 'react';
import { Popover } from 'react-bootstrap';

const PasswordGuide = (prop) => {
    return (
        <Popover id='popover-basic' className='reg-overlay border-none'>
            <Popover.Content>
                <div style={{ width: 200 }}>
                    {prop}
                </div>
            </Popover.Content>
        </Popover>
    );
};

export default PasswordGuide;