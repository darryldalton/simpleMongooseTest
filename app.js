console.log('Hello world');

var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/tableSchedulerLocalDB');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback)
{
    var testSchema = mongoose.Schema({});
    var collectionName = 'show_scheduler';
    var Model = mongoose.model('RSVP', testSchema, collectionName);

    //Model.find({ rsvp_contact_name: /onny/, guest_company_name: /Fed/ }, function (err, collection)
    //Model.find({ 'meeting_space.name': 'Cafe Table 1', date:'6/18/2015' }, {rsvp_contact_name:1,_id:0}, function (err, result)
    //{
    //    if (err) return console.error(err);
    //
    //    console.log(result);
    //    process.exit();
    //
    //});  //  Model.find
    
    
    //  See more query examples: http://mongoosejs.com/docs/queries.html, http://mongoosejs.com/docs/api.html#query-js

    Model
    .find({ 'meeting_space.name': 'Cafe Table 2' })
    //.where({ rsvp_contact_name: /ss/ })
    //.where("guest_contact_names").in(["Adam Naylor", "Dave Davies"])
    .limit(3)
    .sort("-rsvp_contact_name")  // -desc
    .select("meeting_space.name rsvp_contact_name rsvp_company_name guest_contact_names -_id")  //  - means exclude field
    .exec(findCallbackFunction);

    function findCallbackFunction(err, result)
    {
        if (err) return console.error(err);

        console.log(result);
        process.exit();
    }  //  function findCallbackFunction(err, result)


});  //  db.once('open', function (callback)