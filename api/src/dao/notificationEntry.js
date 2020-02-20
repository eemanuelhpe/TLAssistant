module.exports = {

    NotificationEntry: () => {
        this.id = 1;
        this.email = "";
        this.baseUrl = 'https://center.almoctane.com';
        this.sharedSpaceId = 1001;
        this.workspaceId = 1002;
        this.entity = 'work_items';
        this.query = 'defaultQuery1';
        this.title = "CPE Incidents";
        this.fields = [['id'], ['name:'], ['severity.name:severity', 'owner.name:owner', 'phase.name:phase']];
        this.time = "42 * * * * *";
        this.style = "table";
        this.rank = 1;
    }

};

module.exports = NotificationEntry;
