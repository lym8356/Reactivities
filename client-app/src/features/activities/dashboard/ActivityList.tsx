import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({ activities, selectActivity, deleteActivity, submitting }: Props) {

    const [target, setTarget] = useState('');


    // pass the clink event so that only the button that has the id of the activity being deleted will be updated
    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            {/* form a link  */}
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                {/* wrap in error function so it does not execute immediately */}
                                <Button onClick={() => selectActivity(activity.id)} floated="right" content="View" color="blue" />
                                <Button
                                    name={activity.id}
                                    loading={submitting && target === activity.id}
                                    // onClick={(e) => deleteActivity(activity.id)}
                                    onClick={(e) => handleActivityDelete(e, activity.id)}
                                    floated="right" content="Delete" color="red"
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}