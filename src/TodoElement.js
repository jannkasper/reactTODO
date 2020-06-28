import React from 'react'
import { Button, TextField, Grid } from '@material-ui/core';


const todoElement = (props) => {

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.changeMode();
        }
    };

    if (!props.edit) {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                    <div><p style={{width: '200px', textAlign: "left", textDecoration: props.textDecoration ? 'line-through' : ''}} onClick={props.changeTextDecoration}>{props.task}</p> </div>
                    <Button onClick={props.changeMode}>Edit</Button>
                    <Button color="secondary" onClick={props.onDelete}>Delete</Button>
                <br></br>
            </Grid>
        )
    } else {
        let input = React.createRef();
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <TextField style={{width: '200px'}} value={props.task} onChange={event => props.onEdit(event, props.index)} onKeyDown={handleKeyDown}/>
                <Button onClick={props.changeMode}>Save</Button>
                <br></br>
            </Grid>
        )
    }

};

export default todoElement;
