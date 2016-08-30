/****************************************************************************************
    
    "/public_html/maquinas/binn/app/app.module.js" ..

****************************************************************************************/

(function() {


    'use strict';

    angular.module("appModule", [ 'ngResource' ])

    //s.value('UrlBase', 'http://cm.apgca.cl/api/')
    .value('UrlBase', 'http://cm.dgca.io/api/')
    

/****************************************************************************************
FACTORIAS
****************************************************************************************/

        //PARAMETROS DEL SISTEMA 
        .factory("MenuFact", function($resource, UrlBase) {
                var Data = $resource(UrlBase + "menu/:id", //la url donde queremos consumir
                    { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
                    //a la función get le decimos el método, y, si es un array lo que devuelve
                    {
                        //"update": { method: "PUT" }, //Cambio el Verbo "update" por "PUT"
                        'get': { method: "GET", isArray: true }, //ponemos isArray en true
                        //'save': { method: 'POST' },
                        //'delete':{method: 'DELETE'}
                    });
                //debugger;
                return Data;
        })

        //PARAMETROS DEL SISTEMA 
       /* .factory("ParaFact", function($resource, UrlBase) {
                var Data = $resource(UrlBase + "parametros/:id", //la url donde queremos consumir
                    { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
                    //a la función get le decimos el método, y, si es un array lo que devuelve
                    {
                        //"update": { method: "PUT" }, //Cambio el Verbo "update" por "PUT"
                        'get': { method: "GET", isArray: true }, //ponemos isArray en true
                        //'save': { method: 'POST' },
                        //'delete':{method: 'DELETE'}
                    });
                //debugger;
                return Data;
        })*/

        .factory("ParaFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "parametros/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: UrlBase + "parametros/",
                    transformRequest: function(Data, headersGetter) {
                        var str = [];
                        for (var d in Data)
                            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(Data[d]));
                        return str.join("&");
                    }
                }, //Cambio el Verbo "update" por "PUT"
                'get': { method: "GET", isArray: true }, //ponemos isArray en true
                'save': {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(data, headersGetter) {
                        var str = [];
                        for (var d in data)
                            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                        return str.join("&");
                    }
                },
                'delete': {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: UrlBase + "parametros/del",
                    transformRequest: function(data, headersGetter) {
                        var str = [];
                        for (var d in data)
                            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                        return str.join("&");
                    }
                }
            });

        return Data;
    })

    .factory("PetrFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "petroleo/valoractual/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: UrlBase + "petroleo/valoractual/",
                    transformRequest: function(Data, headersGetter) {
                        var str = [];
                        for (var d in Data)
                            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(Data[d]));
                        return str.join("&");
                    }
                }, //Cambio el Verbo "update" por "PUT"
                'get': { method: "GET"}, //ponemos isArray en true
                //'get': { method: "GET", isArray: true }, //ponemos isArray en true
                'save': {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(data, headersGetter) {
                        var str = [];
                        for (var d in data)
                            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                        return str.join("&");
                    }
                },
                'delete': {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: UrlBase + "petroleo/valoractual/del",
                    transformRequest: function(data, headersGetter) {
                        var str = [];
                        for (var d in data)
                            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                        return str.join("&");
                    }
                }
            });

        return Data;
    })

/****************************************************************************************
DIRECTIVAS
****************************************************************************************/
    

    .directive("menuDir", function(MenuFact) {
            return {
                restrict: "E",
                templateUrl: "binn/app/config/menuView.html",
                link: function(scope) {
                    scope.MenuDatos = MenuFact.get({}, function(element, $scope) {});
                }

            };
        })

    .directive("paraDir", function(ParaFact) {
            return {
                restrict: "EA",
                templateUrl: "binn/app/config/ListParametrosView.html",
                transclude: true,
                scope: {
                  idp: '@',
                  nomobj: '@',
                  val:'@'
                },
                link: function(scope, element, attrs) {
                    //debugger
                    scope.ParaDatos = ParaFact.get({ id: scope.idp }, function(element, $scope) {});
                    scope.NombreObj = scope.nomobj;
                    scope.ValorObj = scope.val;
                    scope.indice = {};
                    
                     scope.$watch('val', function(value){
                         if(value){
                             scope.indice = {"IdDet" : value};
                         }
                     });
                }

            };
        })





    .directive("cargando", ['$http', function($http) {
        return {
            template: "<div ng-show='loading' class='dinamicContentLoading'><img src='binn/images/ajax-loader.gif' style='position:absolute;top:40%;left:45%' /></div>",
            scope: {},
            controller: function($scope, $http) {
                $scope.$watch(function() {
                    return $http.pendingRequests.length;
                }, function(newVal) {
                    $scope.pending = newVal;
                });
            },

        };
    }])


    .directive("inputDisabled", function(){
          return function(scope, element, attrs){
            scope.$watch(attrs.inputDisabled, function(val){
              if(val)
                element.removeAttr("disabled");
              else
                element.attr("disabled", "disabled");
            });
          }
        });

  

    

/****************************************************************************************
CONTROLLERS  
****************************************************************************************/







   angular.module("gcaControlMaq").controller("DropdownCtrl", function() {}); //Instancia Menu Boostrap
   

}());





/****************************************************************************************
FACTORIAS
****************************************************************************************/
// angular.module("gcaControlMaq").factory('Utils', function() {
//     var service = {
//         isUndefinedOrNull: function(obj) {
//             return !angular.isDefined(obj) || obj === null;
//         }

//     };

//     return service;
// });
