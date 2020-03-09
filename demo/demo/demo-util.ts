import {Alert} from "../../api/src/dao/alert";
import axios from "axios";

export class DemoUtil{

    baseAppUrl;

    constructor(baseAppUrl){
        this.baseAppUrl = baseAppUrl;
    }

     addAlertDemo(data){
        return axios.post(this.baseAppUrl + '/alert', data)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error('got the following error massage when trying add alert: ' +error.message)
            })
    }

     addTemplateDemo(data){
        return axios.post(this.baseAppUrl + '/notification-template', data)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error('got the following error massage when trying add template: ' +error.message)
            })
    }

    sendEmailDemo(){
        return axios.post(this.baseAppUrl + '/send-email')
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error('got the following error massage when trying send mail' + error.message)
            })
    }

    createSiteDemo(){
        return axios.post(this.baseAppUrl + '/create-site')
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error('got the following error massage when trying to create site: ' +error.message)
            })
    }

     scheduleDemo(cronString:string ){
        return axios.post(this.baseAppUrl + '/schedule',{cronString:cronString})
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error('got the following error massage when trying to create site: ' +error.message)
            })
    }
}

