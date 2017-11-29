var kafka = require('./kafka/client');
var axios = require('axios');
var asyncLoop = require('node-async-loop');


function searchFromApi(data, callback){
    console.log("search from api data");
    console.log("**************");
console.log(data)
    console.log("**************");
console.log(data.searchtype);
    kafka.make_request('getapi', data.searchtype, function(err,results){

        if(err){
            callback(err, null);
        }
        else
        {
            var search_results = [];

            if(results.code == "200"){

                var vendorArr=results.value;

                asyncLoop(vendorArr, function (vendor, next)
                {
                    axios.get(vendor.vendorapi,
                        {
                            params: {
                                'data': data.searchquery
                            }
                        }).then(function(response) {
                        search_results.push.apply(search_results,response.data.api_results);

                       // console.log("car results after push",search_results)

                        next();

                    }).catch(function(error) {
                        callback(err, null);
                    });

                }, function (err)
                {
                    if (err)
                    {
                        callback(err, null);

                    }
                    callback(null, search_results);
                });

            }
            else {
                callback(null, null);
            }

        }


    });

}

exports.searchFromApi=searchFromApi;
