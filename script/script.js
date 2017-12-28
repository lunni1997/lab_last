var myApp = angular.module('myApp',['ngRoute']);


myApp.controller('mainCotroller', function ($scope, $http) {
   var url_start ="https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=London&callback=JSON_CALLBACK"
    $http.jsonp(url_start).success(function (data) {
       $scope.data = data.response.listings;
    });
     $scope.total_pages=1;
     $scope.currentPage = 1;
$scope.Search = function () {
	

	let price_min = $('[name = price_min]:first').val() || 0;
      let price_max = $('[name = price_max]:first').val() || 999999999;
      let bedroom_min = $('[name = bedroom_min]:first').val() || 0;
      let bedroom_max = $('[name = bedroom_max]:first').val() || 99;
      let room_min = $('[name = room_min]:first').val() || 0;
      let room_max = $('[name = room_max]:first').val() || 99;
      let bathroom_min = $('[name = bathroom_min]:first').val() || 0;
      let bathroom_max = $('[name = bathroom_max]:first').val() || 99;
      let url = "http://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=" + $('.country').val() + "&listing_type=" + "buy" + "&place_name="+ $('.city').val() +"&price_min=" + price_min + "&price_max=" + price_max + "&bedroom_min=" + bedroom_min + "&bedroom_max=" + bedroom_max +"&room_min=" + room_min;
      url += "&bathroom_min=" + bathroom_min + "&bathroom_max=" + bathroom_max + "&page=" + $scope.currentPage + "&callback=JSON_CALLBACK";
    //var url ="https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=London&callback=JSON_CALLBACK"
    $http.jsonp(url).success(function (data) {
       $scope.data = data.response.listings;
       $scope.total_pages = data.response.total_pages;
    });




;}

$scope.Next = function(){

$scope.currentPage++;
$scope.Search();
if($scope.currentPage > $scope.total_pages)
	$scope.currentPage = $scope.currentPage-1;
};
$scope.Back = function(){
if($scope.currentPage>0){
$scope.currentPage--;
$scope.Search();
}
};
$scope.liked = function(e) {
      $(e.target).attr("class", "like liked");
     

      let i = $(e.target).attr('name');

          let todos = localStorage.getItem('hotel') + '\
          <div class="listing-list">\
            <img src='+ $scope.data[i].img_url +'>\
            <span class="price">'+ $scope.data[i].price_formatted +'</span><br>\
            <span class="title">'+ $scope.data[i].title +'</span><br>\
            <span class="summary">'+ $scope.data[i].summary +'</span><br>\
            <span class="updated">'+ $scope.data[i].updated_in_days_formatted +'</span>\
          </div>';


          localStorage.setItem('hotel', todos);
    }
  $scope.like = function() {

      $('.items').html("");
      if(localStorage.getItem('hotel')){
      $('.localStorage').html(localStorage.getItem('hotel') + "<span id=\"clear\">Clear</clear>");
      $('#clear').click(function () {
        localStorage.setItem('hotel', "");
        $('.items').html("");
        $('.localStorage').html("");
      });
      }else{
        alert('Пусто');
      }
    }




});

myApp.config(function($routeProvider){
		$routeProvider
		.when('/:num',{
				templateUrl:'tamplate.html',
				controller:'mod'
		});

});
myApp.controller('mod', function ($scope,$routeParams) {
		$scope.indx = $routeParams.num;
		let map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: $scope.data[$scope.indx].latitude, lng:  $scope.data[$scope.indx].longitude},
	    zoom: 16
	  });
		let marker = new google.maps.Marker({
	    position: {lat: $scope.data[$scope.indx].latitude, lng:  $scope.data[$scope.indx].longitude},
	    map: map,
	    title: $scope.data[$scope.indx].title
  	});

	});