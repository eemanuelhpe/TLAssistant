const axios = require('axios')

const httpsProxyAgent = require('https-proxy-agent');
let agent = new httpsProxyAgent('http://web-proxy.il.softwaregrp.net:8080/');


function getContent(authData,url){
   return auth(authData).then((cookies) =>{
        return get(cookies,url);
    });
}

function auth(authData) {
    return axios.post('https://center.almoctane.com/authentication/sign_in', {
        user: authData.user,
        password:authData.password
    },{httpsAgent: agent})
        .then((res) => {
            return res.headers['set-cookie']
        })
        .catch((error) => {
            console.error(error)
        })
}

function get(cookies, url) {

    //url: 'https://center.almoctane.com/api/shared_spaces/1001/workspaces/1002/work_items?fields=parent,user_tags,followed_by_me,has_attachments,story_points,total_risky_commits,progress,name,total_commits,owner,feature_type,release,id,phase,defects,blocked,author,tasks_number,detected_in_release,subtype,milestone,is_in_filter,limit_line&limit=111&offset=0&order_by=parent,id&query=%22(release%3D%7Bid+IN+%2788001%27,%2794001%27,%2794001%27%7D;phase%3D%7Bid+IN+%27phase.feature.new%27,%27z6qwxp00033gkbopozg4210m8%27,%27phase.feature.inprogress%27,%27k1g3y0zgnrklf02olvv05rxqw%27%7D;(team%3D%7Bid%3D8003%7D);(subtype%3D%27feature%27))%22',

 return axios.request({
        url:url,
        method: "get",
        headers: {
            Cookie: cookies.join(";"),
            HPECLIENTTYPE: 'TEAM_MAIL',
            'ALM-OCTANE-PRIVATE': true,
        },
        httpsAgent: agent
    }).then((res) => {
        return res.data;
    }).catch((error) => {
        console.error(error)
    })
}


module.exports = {getContent};



