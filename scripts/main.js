/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
var categoryModuleIn = angular.module("categoryModule", ["ngRoute"]);
var order = 0;
var ordered=[];
var toBeDelivered=[];
categoryModuleIn.factory('Data', function() {
    var orderedItems =  [];
    return orderedItems;
});

categoryModuleIn.controller("category", function($scope, $http, Data) {
    $http.get('documents/main.json').success(function(data) {
        $scope.items = data.items;
    });
    $scope.total = 0;
    $scope.ordered_items = [];
    $scope.ordered_items = Data;


    $scope.order = function(item1) {
        var quan = 1;

//        console.log($scope.ordered_items);
        for (var i = 0; i < $scope.ordered_items.length; i++) {

            if ($scope.ordered_items[i].name == item1.item)
            {

                quan = $scope.ordered_items[i].qty + 1;
                $scope.ordered_items.splice(i, 1);
                break;
            }
        }

        var itm = {qty: quan, name: item1.item, price: item1.price};
        $scope.ordered_items.push(itm);
        $scope.calculateTotal();
    };

    $scope.submit_order = function() {
        if($scope.total==0)
        alert("No items on the list");
        else
        alert("order is placed successfully");
        order = order + 1;
    };


    $scope.remove = function(item1) {
        var ind = $scope.ordered_items.indexOf(item1);
        if ($scope.ordered_items[ind].qty == 1) {
            $scope.ordered_items.splice(ind, 1);
            $scope.calculateTotal();
        }
        else {
            $scope.ordered_items[ind].qty = $scope.ordered_items[ind].qty - 1;
            $scope.calculateTotal();
        }

    };


    $scope.calculateTotal = function() {
        $scope.total = 0;
        for (var i = 0; i < $scope.ordered_items.length; i++) {
            $scope.total = $scope.total + $scope.ordered_items[i].qty * $scope.ordered_items[i].price;
        }
    };

});


categoryModuleIn.controller("cook", function($scope, Data) {
    //console.log($scope.ordered_items);
    $scope.status = "TC";
   
    
    for(var i=0; i<Data.length;i++){
        Data[i].order_no= order;
    }
    //ordered=ordered.concat(Data);
    console.log(Data);
    
    $scope.ordered_items = Data;
    
    $scope.change = function(status,i)
    {
        if(status=='CD'){
            var temp=$scope.ordered_items.splice(i,1)
        toBeDelivered.push(temp[0]);
      
    }
    };

});

categoryModuleIn.controller("waiter", function($scope){
   $scope.status='TD';
    $scope.toBeDeli=toBeDelivered;
      console.log($scope.toBeDeli);
});

categoryModuleIn.config(function($routeProvider) {
    $routeProvider.when('/', {controller: "category", templateUrl: 'templates/Home.html'}).
            when('/customer', {controller: "category", templateUrl: 'templates/Customer.html'}).
            when('/cook', {controller: "category", templateUrl: 'templates/Cook.html'}).
            when('/waiter', {controller: "category", templateUrl: 'templates/Waiter.html'}).
            otherwise({redirectTo: '/'});
});