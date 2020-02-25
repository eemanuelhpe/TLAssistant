import alasql from "alasql";

let oo = [
    {
        "id": "2001",
        "end_date": "2016-02-25T12:06:55Z",
        "is_default": false
    },
    {
        "id": "5001",
        "end_date": "2016-04-21T05:39:23Z",
        "is_default": false
    },
    {
        "id": "9001",
        "end_date": "2016-04-30T12:00:00Z",
        "is_default": false
    },
    {
        "id": "10006",
        "end_date": "2016-06-30T12:00:00Z",
        "is_default": false
    },
    {
        "id": "11001",
        "end_date": "2016-06-16T12:00:00Z",
        "is_default": false
    },
    {
        "id": "13001",
        "end_date": "2016-10-06T12:00:00Z",
        "is_default": false
    },
    {
        "id": "17001",
        "end_date": "2016-10-06T12:00:00Z",
        "is_default": false
    },
    {
        "id": "18001",
        "end_date": "2016-07-31T12:00:00Z",
        "is_default": false
    },
    {
        "id": "18002",
        "end_date": "2016-07-31T12:00:00Z",
        "is_default": false
    },
    {
        "id": "18003",
        "end_date": "2016-07-31T12:00:00Z",
        "is_default": false
    },
    {
        "id": "19001",
        "end_date": "2016-07-31T12:00:00Z",
        "is_default": false
    },
    {
        "id": "20001",
        "end_date": "2016-07-31T12:00:00Z",
        "is_default": false
    },
    {
        "id": "20002",
        "end_date": "2016-07-31T12:00:00Z",
        "is_default": false
    },
    {
        "id": "22001",
        "end_date": "2017-02-09T12:00:00Z",
        "is_default": false
    },
    {
        "id": "23001",
        "end_date": "2017-12-31T12:00:00Z",
        "is_default": false
    },
    {
        "id": "28001",
        "end_date": "2017-06-29T12:00:00Z",
        "is_default": false
    },
    {
        "id": "29001",
        "end_date": "2017-02-09T12:00:00Z",
        "is_default": false
    },
    {
        "id": "29002",
        "end_date": "2016-10-14T12:00:00Z",
        "is_default": false
    },
    {
        "id": "31001",
        "end_date": "2018-11-17T12:00:00Z",
        "is_default": false
    },
    {
        "id": "33001",
        "end_date": "2017-10-19T12:00:00Z",
        "is_default": false
    },
    {
        "id": "34001",
        "end_date": "2017-02-23T12:00:00Z",
        "is_default": false
    },
    {
        "id": "35001",
        "end_date": "2017-02-09T12:00:00Z",
        "is_default": false
    },
    {
        "id": "43001",
        "end_date": "2017-07-16T12:00:00Z",
        "is_default": false
    },
    {
        "id": "45001",
        "end_date": "2017-06-15T12:00:00Z",
        "is_default": false
    },
    {
        "id": "46001",
        "end_date": "2017-10-15T12:00:00Z",
        "is_default": false
    },
    {
        "id": "48001",
        "end_date": "2018-01-25T12:00:00Z",
        "is_default": false
    },
    {
        "id": "49001",
        "end_date": "2017-10-19T12:00:00Z",
        "is_default": false
    },
    {
        "id": "50001",
        "end_date": "2018-01-11T12:00:00Z",
        "is_default": false
    },
    {
        "id": "52001",
        "end_date": "2018-01-25T12:00:00Z",
        "is_default": false
    },
    {
        "id": "54001",
        "end_date": "2018-06-04T12:00:00Z",
        "is_default": false
    },
    {
        "id": "55001",
        "end_date": "2018-04-05T12:00:00Z",
        "is_default": false
    },
    {
        "id": "56001",
        "end_date": "2017-11-30T12:00:00Z",
        "is_default": false
    },
    {
        "id": "57001",
        "end_date": "2017-08-01T12:00:00Z",
        "is_default": false
    },
    {
        "id": "59001",
        "end_date": "2018-10-08T12:00:00Z",
        "is_default": false
    },
    {
        "id": "61001",
        "end_date": "2018-06-04T12:00:00Z",
        "is_default": false
    },
    {
        "id": "66001",
        "end_date": "2019-01-14T12:00:00Z",
        "is_default": false
    },
    {
        "id": "67001",
        "end_date": "2018-05-31T12:00:00Z",
        "is_default": false
    },
    {
        "id": "68001",
        "end_date": "2018-10-08T12:00:00Z",
        "is_default": false
    },
    {
        "id": "69001",
        "end_date": "2019-04-15T12:00:00Z",
        "is_default": false
    },
    {
        "id": "71001",
        "end_date": "2019-01-14T12:00:00Z",
        "is_default": false
    },
    {
        "id": "74001",
        "end_date": "2019-07-15T12:00:00Z",
        "is_default": false
    },
    {
        "id": "75001",
        "end_date": "2019-10-07T12:00:00Z",
        "is_default": false
    },
    {
        "id": "77001",
        "end_date": "2017-02-09T12:00:00Z",
        "is_default": false
    },
    {
        "id": "77002",
        "end_date": "2016-10-06T12:00:00Z",
        "is_default": false
    },
    {
        "id": "77003",
        "end_date": "2017-06-29T12:00:00Z",
        "is_default": false
    },
    {
        "id": "84001",
        "end_date": "2019-09-30T12:00:00Z",
        "is_default": false
    },
    {
        "id": "88001",
        "end_date": "2020-01-06T12:00:00Z",
        "is_default": false
    },
    {
        "id": "94001",
        "end_date": "2020-03-30T12:00:00Z",
        "is_default": true
    },
    {
        "id": "103001",
        "end_date": "2020-06-22T12:00:00Z",
        "is_default": false
    }
];

let sql = 'SELECT FLOOR( DATEDIFF(Day, DATE(end_date),now())) as days  FROM ?  WHERE is_default = true';
let x = [{"type":"release","start_date":"2020-02-19T12:00:00Z","activity_level":0,"workspace_id":1002,"name":"dsf","end_date":"2020-02-28T12:00:00Z","id":"1001","num_of_sprints":2,"has_attachments":false,"is_default":true,"shared":false,"agile_type":{"type":"list_node","id":"list_node.release_agile_type.scrum","index":0,"activity_level":0,"logical_name":"list_node.release_agile_type.scrum","name":"Scrum"}}];
var c = new Date("2020-02-19T12:00:00Z");
var vv = alasql('SELECT FLOOR( DATEDIFF(Day, DATE(start_date),now())) as date  FROM ? WHERE is_default = true',[x]);
console.log(c)//var res = alasql('SELECT a, SUM(b) AS b FROM ? GROUP BY a',[data]);
