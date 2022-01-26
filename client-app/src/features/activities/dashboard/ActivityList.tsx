import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
// import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

// interface Props {
//     activities: Activity[];
//     // selectActivity: (id: string) => void;
//     deleteActivity: (id: string) => void;
//     submitting: boolean;
// }

export default observer(function ActivityList() {

    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;
    // const { activitiesByDate } = activityStore;

    // commented out in lecture 93

    // const [target, setTarget] = useState('');

    // pass the clink event so that only the button that has the id of the activity being deleted will be updated

    // function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>, id: string){
    //     setTarget(e.currentTarget.name);
    //     deleteActivity(id);
    // }

    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>

                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}

                </Fragment>
            ))}
        </>

        // commented out in lecture 94

        // <Segment>
        //     <Item.Group divided>
        //         {activitiesByDate.map(activity => (
        //             <ActivityListItem key={activity.id} activity={activity} />
        //         ))}
        //     </Item.Group>
        // </Segment>

    )
})