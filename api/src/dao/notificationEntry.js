class NotificationEntry{

    set email(email){
        this._email = email;
        return this;
    }
    get email(){
        return this.email;
    }

    set query(query){
        this._query = query;
        return this;
    }
    get query(){
        return this.query;
    }

    set title(title){
        this._title = title;
        return this;
    }
    get title(){
        return this.title;
    }

    set time(time){
        this._time = time;
        return this;
    }
    get time(){
        return this.time;
    }

    set style(style){
        this._style = style;
        return this;
    }
    get style(){
        return this.style;
    }

    set rank(rank){
        this._rank = rank;
        return this;
    }
    get rank(){
        return this.rank;
    }
}


let condition = "((team%3D%7Bid%3D8003%7D);(defect_type%3D%7Bid%3D%27list_node_defect_type_cpe_incident_ln%27%7D);blocked%3Dfalse;phase%3D%7Bid+IN+%27phase.defect.new%27,%27phase.defect.opened%27,%27o2z59r8vd8z5wfryk2jjmng61%27,%27jq210o9wgzmk4sn3kdj6j0nk3%27%7D;(subtype%3D%27defect%27))"

let defaultQuery = {
    sharedSpaceId:1001,
    workspaceId:1001,
    fields: ['id','name'],
    orderBy:['id'],
    condition: condition

}

let defaultEntry ={
    id:123,
    email:"eemanuel@microfocus.com",
    query:defaultQuery,
    title: "CPE Incidents",
    time:"42 * * * * *",
    style:"table",
    rank: 1
}

module.exports = NotificationEntry;
