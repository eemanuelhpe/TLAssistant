class NotificationQuery {

    set sharedSpaceId(sharedSpaceId) {
        this._sharedSpaceId = sharedSpaceId;
        return this;
    }

    get sharedSpaceId() {
        return this.sharedSpaceId;
    }
    set workspaceId(workspaceId) {
        this._workspaceId = workspaceId;
        return this;
    }

    get workspaceId() {
        return this.workspaceId;
    }
    set fields(fields) {
        this._fields = fields;
        return this;
    }

    get fields() {
        return this.fields;
    }
    set orderBy(orderBy) {
        this._orderBy = orderBy;
        return this;
    }

    get orderBy() {
        return this.orderBy;
    }

    set condition(condition) {
        this._condition = condition;
        return this;
    }

    get condition() {
        return this.condition;
    }
}

module.exports = NotificationQuery;
