import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {

    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    loadActivities = async () => {
        // mutable 
        // this.setLoadingInitial(true);
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                // commented in lecture 84
                // activity.date = activity.date.split('T')[0];


                // this.activities.push(activity);

                
                // commented in lecture 84
                // this.activityRegistry.set(activity.id, activity);
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);

        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity = activity;
            return activity;
        }else{
            this.loadingInitial = true;
            try{
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity : Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // commented in lecture 84

    // selectActivity = (id: string) => {
    //     // this.selectedActivity = this.activities.find(a => a.id === id);
    //     this.selectedActivity = this.activityRegistry.get(id);
    // }
    
    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;        
    // }

    // openForm = (id?: string) => {
    //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode = true;
    // }

    // closeForm = () => {
    //     this.editMode = false;
    // }

    createActivity = async(activity: Activity) => {
        this.loading = true;
        // commented out in lecture 88
        // activity.id = uuid();

        try{
            await agent.Activities.create(activity);
            runInAction(() => {
                // this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try{
            await agent.Activities.update(activity);
            runInAction(() => {
                // this.activities =[...this.activities.filter(a => a.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(() => {
                // commented in lecture 84
                // this.activities = [...this.activities.filter(a => a.id !== id)];
                this.activityRegistry.delete(id);
                // commented in lecture 84
                // if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
