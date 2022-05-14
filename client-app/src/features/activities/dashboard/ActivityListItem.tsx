import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
// import { useStore } from "../../../app/stores/store";
import {format} from 'date-fns';


interface Props {
    activity: Activity;
}


export default function ActivityListItem({ activity }: Props) {


    // commented out in lecture 99
    // const { activityStore } = useStore();

    // const { deleteActivity, loading } = activityStore;

    // const [target, setTarget] = useState('');


    // pass the clink event so that only the button that has the id of the activity being deleted will be updated
    // function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    //     setTarget(e.currentTarget.name);
    //     deleteActivity(id);
    // }

    return (

        // commented out in lecture 95

        // <Item key={activity.id}>
        //     <Item.Content>
        //         {/* form a link  */}
        //         <Item.Header as='a'>{activity.title}</Item.Header>
        //         <Item.Meta>{activity.date}</Item.Meta>
        //         <Item.Description>
        //             <div>{activity.description}</div>
        //             <div>{activity.city}, {activity.venue}</div>
        //         </Item.Description>
        //         <Item.Extra>
        //             {/* wrap in error function so it does not execute immediately */}
        //             {/* <Button onClick={() => activityStore.selectActivity(activity.id)} 
        //         floated="right" content="View" color="blue" /> */}
        //             <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
        //             <Button
        //                 name={activity.id}
        //                 loading={loading && target === activity.id}
        //                 // onClick={(e) => deleteActivity(activity.id)}
        //                 onClick={(e) => handleActivityDelete(e, activity.id)}
        //                 floated="right" content="Delete" color="red"
        //             />
        //             <Label basic content={activity.category} />
        //         </Item.Extra>
        //     </Item.Content>
        // </Item>
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item.Image size="tiny" circular src='/assets/user.png' />
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${activity.id}`}>
                            {activity.title}
                        </Item.Header>
                        <Item.Description>Hosted by Bob</Item.Description>
                    </Item.Content>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    {/* commented out in lecture 125 */}
                    {/* date-fns */}
                    {/* <Icon name="clock" /> {activity.date} */}
                    <Icon name="clock" /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name="marker" /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color="teal"
                    floated="right"
                    content="View"
                />
            </Segment>
        </Segment.Group>
    )
}