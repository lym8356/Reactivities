import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, List } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
// import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
// import ActivityDetails from "../details/ActivityDetails";
// import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

// data passing between child compoents and parent compoents

// interface Props {
//     activities: Activity[];
    // selectedActivity: Activity | undefined;
    // functions below take string as parameter and returns nothing
    // selectActivity: (id: string) => void;
    // no parameter
    // cancelSelectActivity: () => void;
    // editMode: boolean;
    // openForm: (id: string) => void;
    // closeForm: () => void;
    // createOrEdit: (activity: Activity) => void;
//     deleteActivity: (id: string) => void;
//     submitting: boolean;
// }

export default observer( function ActivityDashboard() {

    const {activityStore} = useStore();
    // const {selectedActivity, editMode} = activityStore;
    const {loadActivities, activityRegistry} = activityStore;


    useEffect(() => {
        // commented out in lecture 90
        // activityStore.loadActivities();
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [activityRegistry.size, loadActivities])

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading...' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                    // activities={activities}
                    // selectActivity={selectActivity}
                    // deleteActivity={deleteActivity}
                    // submitting={submitting}
                     />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />

                {/* commented out in section 7 and lecture 85  */}

                {/* load only when activity object is available  */}
                {/* {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    /> */}
                {/* {editMode &&
                    <ActivityForm 
                    closeForm={closeForm} 
                    activity={selectedActivity}
                    createOrEdit={createOrEdit} 
                    submitting = {submitting}
                     />} */}

            </Grid.Column>
        </Grid>
    )
})