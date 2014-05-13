var JSONPAdapterFHNW = function() {

    this.initialize = function(data) {
        url = typeof data !== 'undefined' ? data : "http://mobileappserver.andreasmartin.cloudbees.net/app/webresources/ch.fhnw.bscwi.esae.mobileappserver.service.employee";
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    };

    this.findById = function(id) {
        return $.ajax({url: url + "/findById/" + id, dataType: "jsonp", jsonpCallback: 'callback'});
    };

    this.findByName = function(searchKey) {
        return $.ajax({url: url + "/findByName/" + searchKey, dataType: "jsonp", jsonpCallback: 'callback'});
    };

    var url;

};