import {EmailDescriptor} from "../../api/src/dao/emailDescriptor";
import axios from "axios";
import {ResourceConst} from "../../api/src/resources/resource-const";

export class DemoUtil{

    baseAppUrl;

    constructor(baseAppUrl){
        this.baseAppUrl = baseAppUrl;
    }

      addEmailDescriptorDemo(data){
        return axios.post(this.baseAppUrl + '/' + ResourceConst.EMAIL_DESCRIPTORS, data)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error('got the following error massage when trying add alert: ' +error.message)
            })
    }

     addTemplateDemo(data){
        return axios.post(this.baseAppUrl + '/' + ResourceConst.TEMPLATES , data)
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

