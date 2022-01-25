import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";


// interface Props {
//     activity: Activity | undefined;
//     closeForm: () => void;
//     createOrEdit: (activity: Activity) => void;
//     submitting: boolean;
// }

export default observer( function ActivityForm(){

    const {activityStore} = useStore();
    const history = useHistory();
    const {selectedActivity, createActivity, updateActivity, 
        loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id:string}>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    // execute once when id changes
    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    // commented out in lecture 86
    // const initialState = selectedActivity ?? {
    //     id: '',
    //     title: '',
    //     category: '',
    //     description: '',
    //     date: '',
    //     city: '',
    //     venue: ''
    // }

    // commented out in lecture 86
    // const [activity, setActivity] = useState(initialState);

    function handleSubmit(){
        // console.log(activity);
        // createOrEdit(activity);
        
        // commented out in lecture 88
        // activity.id ? updateActivity(activity) : createActivity(activity);
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content="Loading..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' 
                onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' 
                onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' 
                onChange={handleInputChange} />
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' 
                onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' 
                onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' 
                onChange={handleInputChange} />
                <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
                {/* commented in lecture 84 */}
                {/* <Button onClick={closeForm} floated="right" type="button" content="Cancel" /> */}
            </Form>
        </Segment>
    )
})