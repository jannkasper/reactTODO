import React from 'react'
import { Button, Input } from '@material-ui/core';

const todoInsert = (props) => {

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.onSubmit(event.target.value);
        }
    };
    return (
        <div>
            <Input placeholder="Your next task" type="text" value={props.value} onChange={event => props.onChange(event)} onKeyDown={handleKeyDown}/>
            <Button color="primary" onClick={() => props.onSubmit()}>INSERT</Button>
            <Button color="primary" onClick={() => props.onInsertExamples()} disabled={props.sizeList != 0} >(EXAMPLES)</Button>
        </div>
    )
};

export default todoInsert;
