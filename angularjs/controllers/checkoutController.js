angular.module("sportsStore")
.controller("cartSummaryController",function ($scope,cart) {
    $scope.cartData = cart.getProducts();
    
    $scope.total = function () {
        var total = 0;
        for(var i = 0; i < $scope.cartData.length; i++){
            total += ($scope.cartData[i].price * $scope.cartData[i].count);
        }
        return total;
    }
    
    $scope.remove = function (id) {
        cart.removeProduct(id);
    }
    
    var findIndex = function (id) {
        var index = -1;

        angular.forEach($scope.cartData,function (item,key) {
            if(item.id === id){
                index = key;
                return;
            }
        });
        return index;
    }

    $scope.addOne = function (id) {
        var index = findIndex(id);
        if(index !== -1){
            ++$scope.cartData[index].count;
        }
    }

    $scope.reduceOne = function (id) {
        var index = findIndex(id);
        if(index !== -1){
            var item = $scope.cartData[index];
            if(item.count > 1){
                --$scope.cartData[index].count;
            }else {
                var returnKey = confirm("是否移除该商品？");
                if(returnKey){
                    $scope.remove(id);
                }
            }
        }
    }
    
    $scope.removeAll = function () {
        var sure = confirm("确定清空购物车？")
        if(sure){
            $scope.cartData.length = 0;
        }
    }
});