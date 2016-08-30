/****************************************************************************************

****************************************************************************************/

(function() {


    'use strict';

    angular.module("appMarcas", [ 'ngResource' ])
       
    
    .value('UrlBase', 'http://cm.dgca.io/api/')
    //.value('UrlBase', 'http://maquinas.apgca.cl/api/') 

       
    

/****************************************************************************************
FACTORIAS
****************************************************************************************/

 // .factory("MarcFact", function($resource, UrlBase) {
 //        var Data = $resource(UrlBase + "marcas/:id", //la url donde queremos consumir
 //            { id: "@_idreg" }, //aquí podemos pasar variables que queramos pasar a la consulta
 //            //a la función get le decimos el método, y, si es un array lo que devuelve
 //            {
 //                "update": { method: "PUT" }, //Cambio el Verbo "update" por "PUT"
 //                'get': { method: "GET", isArray: true }, //ponemos isArray en true
 //                'save': { method: 'POST' },
 //                'delete': { method: 'DELETE' }
 //            });
 //        //debugger;
 //        return Data;
 //    })


 .factory("MarcFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "marcas/:id", //la url donde queremos consumir
            { id: "@_id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": { method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url : UrlBase + "marcas/",
                    transformRequest: function (Data, headersGetter) {
                       var str = [];
                       for (var d in Data)
                           str.push(encodeURIComponent(d) + "=" + encodeURIComponent(Data[d]));
                       return str.join("&");
                   }}, //Cambio el Verbo "update" por "PUT"
                'get': { method: "GET", isArray: true }, //ponemos isArray en true
                'save': { method: 'POST', 
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function (data, headersGetter) {
                           var str = [];
                           for (var d in data)
                               str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                           return str.join("&");
                            }
                         },
                'delete': { method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url : UrlBase + "marcas/del",
                    transformRequest: function (data, headersGetter) {
                       var str = [];
                       for (var d in data)
                           str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                       return str.join("&");
                        }
                    }
            });
        //debugger;
        return Data;
    })



 .factory("ModFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "marcas/modelos/:id", //la url donde queremos consumir
            { id: "@_id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": { method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url : UrlBase + "marcas/modelos",
                    transformRequest: function (Data, headersGetter) {
                       var str = [];
                       for (var d in Data)
                           str.push(encodeURIComponent(d) + "=" + encodeURIComponent(Data[d]));
                       return str.join("&");
                   }}, //Cambio el Verbo "update" por "PUT"
                'get': { method: "GET", isArray: true }, //ponemos isArray en true
                'save': { method: 'POST', 
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function (data, headersGetter) {
                           var str = [];
                           for (var d in data)
                               str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                           return str.join("&");
                            }
                         },
                'delete': { method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url : UrlBase + "marcas/modelos/del",
                    transformRequest: function (data, headersGetter) {
                       var str = [];
                       for (var d in data)
                           str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                       return str.join("&");
                        }
                    }
            });
        //debugger;
        return Data;
    })

/****************************************************************************************
Directivas
****************************************************************************************/
.directive("marcDir", function(MarcFact) {
            return {
                restrict: "EA",
                templateUrl: "binn/app/config/ListMarcasView.html",
                transclude: true,
                scope: {
                  nomobj: '@',
                  val:'@'
                },
                link: function(scope, element, attrs) {
                    //debugger
                    scope.ParaDatos = MarcFact.get({}, function(element, $scope) {});
                    scope.NombreObj = scope.nomobj;
                    scope.ValorObj = scope.val;
                    scope.indice = {};
                    //var valor = scope.val;
                   
                     scope.$watch('val', function(value){
                     //attrs.$observe('val', function(value){
                         if(value){
                             scope.indice = {"IdReg" : value};
                         }
                     });
                }

            };
        })


.directive("modDir", function(ModFact) {
            return {
                restrict: "EA",
                templateUrl: "binn/app/config/ListModelosView.html",
                transclude: true,
                scope: {
                  idp: '@',
                  nomobj: '@',
                  val:'@'
                },
                link: function(scope, element, attrs) {
                    //debugger
                    scope.ParaDatos = ModFact.get({ id: scope.idp }, function(element, $scope) {});
                    scope.NombreObj = scope.nomobj;
                    scope.ValorObj = scope.val;
                    scope.indice = {};
                    //var valor = scope.val;
                   
                     scope.$watch('val', function(value){
                     //attrs.$observe('val', function(value){
                         if(value){
                             scope.indice = {"IdDet" : value};
                         }
                     });
                }

            };
        })


/****************************************************************************************
filter
****************************************************************************************/
// .filter('range', function() {
//     return function(input, total) {
//         total = parseInt(total);
//         for (var i=0; i < total; ++i) {
//             input.push(i);
//         }
//         return input;
//     };
// });


/****************************************************************************************
CONTROLLERS
****************************************************************************************/
 .controller("MarcListCtrl", function($scope, MarcFact, ModFact, $state, $rootScope) {

//debugger
            var IdMarca;
            var VarModelos;
            var entry = $scope.MarcDatos = MarcFact.get({ }, function(element, $scope) {});

            $scope.modelos= ModFact.get({ id:2 }, function(element, $scope) {});

           


            //Editar Operadores 
            $scope.editRegistro = function(row) {
                //debugger;
                //var params = { 'RutFunc': row.rut, 'RutId': row.idreg };
                $state.go('marcas.detalle', { idmarca: row.IdReg });

            };
        })


  .controller("MarcDetaCtrl", function($scope, MarcFact, $state, $stateParams, $rootScope) {


    $scope.marcas = MarcFact.get({id: $stateParams}, function(element, $scope) {});



            //$scope.MarcDatos = MarcFact.get({}, function(element, $scope) {});
           
           // idMarc
          //debugger 
// console.log($stateParams);

//         var obtenerCargos = function(data) {
//            // $scope.cargos = dataEmpleadoCargo.get({ id: data.idreg }, function(element, $scope) {});
//            // console.log(data.idreg);

            


//         };

        

          



        })


}());



