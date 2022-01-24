import React, { Fragment, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import axios from 'axios';
import { Button, Container, Header, List } from 'semantic-ui-react';
// import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
// import { v4 as uuid } from 'uuid';
// import agent from '../API/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {


  const {activityStore} = useStore();

  // type of activity array
  // model from model folder
  // const [activities, setActivities] = useState<Activity[]>([]);
  // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [submitting, setSubmitting] = useState(false);

  // Type safety to only return an array of Activity objects
  useEffect(() => {
    // axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
    //   // console.log(response);
    //   setActivities(response.data);
    // })
    // agent.Activities.list().then(response => {
    //   let activities: Activity[] = [];
    //   response.forEach(activity => {
    //     activity.date = activity.date.split('T')[0];
    //     activities.push(activity);
    //   })
    //   // setActivities(response);
    //   setActivities(activities);
    //   setLoading(false);
    // })

    activityStore.loadActivities();
  }, [activityStore])

  // function handleSelectActivity(id: string) {
  //   setSelectedActivity(activities.find(x => x.id === id))
  // }

  // function handleCancelSelectActivity() {
  //   setSelectedActivity(undefined);
  // }

  // function handleFormOpen(id?: string) {
  //   id ? handleSelectActivity(id) : handleCancelSelectActivity();
  //   setEditMode(true);
  // }

  // function handleFormClose() {
  //   setEditMode(false);
  // }

  // function handleCreateOrEditActivity(activity: Activity) {
  //   setSubmitting(true);
  //   if(activity.id){
  //     agent.Activities.update(activity).then(() => {
  //       setActivities([...activities.filter(x => x.id !== activity.id), activity])
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //   } else {
  //     activity.id = uuid();
  //     agent.Activities.create(activity).then(() => {
  //       setActivities([...activities, activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //   }


    // activity.id
    //   ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    //   : setActivities([...activities, {...activity, id: uuid()}]);
    // setEditMode(false);
    // setSelectedActivity(activity);
  // }

  // function handleDeleteActivity(id: string){
  //   setSubmitting(true);
  //   agent.Activities.delete(id).then(() => {
  //     setActivities([...activities.filter(x=> x.id !== id)]);
  //     setSubmitting(false);
  //   })
    // setActivities([...activities.filter(x=> x.id !== id)]);
  // }

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    // can only return a single element 
    // use fragments
    <Fragment>
      {/* <Header as = 'h2' icon = 'users' content = 'Reactivities'/> */}
      {/* <NavBar openForm={handleFormOpen} /> */}

      <NavBar />
      <Container style={{ marginTop: '7em' }}>

        {/* <h2>{activityStore.title}</h2> */}
        {/* <Button content='Add exclamation!' positive onClick={activityStore.setTitle} /> */}

        <ActivityDashboard
          // activities={activityStore.activities}
          // selectedActivity={selectedActivity}
          // selectActivity={handleSelectActivity}
          // cancelSelectActivity={handleCancelSelectActivity}
          // editMode={editMode}
          // openForm={handleFormOpen}
          // closeForm={handleFormClose}
          // createOrEdit={handleCreateOrEditActivity}
          // deleteActivity={handleDeleteActivity}
          // submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

// making the entire app observerable
export default observer (App);
