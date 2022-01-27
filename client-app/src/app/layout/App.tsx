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
// import LoadingComponent from './LoadingComponent';
// import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';


function App() {


  // const {activityStore} = useStore();

  const location = useLocation();

  // type of activity array
  // model from model folder
  // const [activities, setActivities] = useState<Activity[]>([]);
  // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [submitting, setSubmitting] = useState(false);

  // Type safety to only return an array of Activity objects
  // useEffect(() => {
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

  //   activityStore.loadActivities();
  // }, [activityStore])

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

  // if(activityStore.loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Fragment>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              {/* added switch in lecture 111  */}
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route path="/errors" component={TestErrors} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

// making the entire app observerable
export default observer(App);
