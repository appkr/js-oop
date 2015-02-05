var makeRequest = function(url, callback) {
  var data = 10;
  callback(data);
};

var obj = {
  someValue : 20,
  loadData: function(data) {
    var sum = this.someValue + data;
    alert(sum);
  },
  prepareRequest: function() {
    var url = "http://numberservice.com";
    // first "this" means obj, second means makeRequest.
    makeRequest(url, this.loadData.bind(this));
  }
};