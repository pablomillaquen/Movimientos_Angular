/****************************************************************************************

NOMBRES DE CONTROLLER y FACTORIAS comienzan con los primeros 4 digitos
factory     xxxxFact
controller  xxxxCtrl
$scope.xxxxDatos

****************************************************************************************/

(function() {


    'use strict';

    angular.module("appProveedores", [
                                        'ngResource', 
                                        'platanus.rut'
                                    ])

   .value('UrlBase', 'api/')
        //.value('UrlBase', 'maquinas.apgca.io/api/')


/****************************************************************************************
FACTORIAS
****************************************************************************************/
    .factory("ProveFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "proveedores/:tipo/:id", //la url donde queremos consumir
            { tipo: "@_tipo", id: "@_idreg" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": { method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url : UrlBase + "proveedores/",
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
                    url : UrlBase + "proveedores/del",
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



    // .factory("ProveFact", function($resource, UrlBase) {
    //     var Data = $resource(UrlBase + "proveedores/:tipo/:id", //la url donde queremos consumir
    //         { tipo: "@_tipo", id: "@_idreg" }, //aquí podemos pasar variables que queramos pasar a la consulta
    //         //a la función get le decimos el método, y, si es un array lo que devuelve
    //         {
    //             "update": { method: "PUT" }, //Cambio el Verbo "update" por "PUT"
    //             'get': { method: "GET", isArray: true }, //ponemos isArray en true
    //             //'save': { method: 'POST' },
    //             'save': {
    //                 method: "POST",
    //                 headers: { 
    //                     'Access-Control-Allow-Credentials': 'true',
    //                     'Content-Type': 'text/html; charset=UTF-8',
    //                     'Accept': 'application/json'}
    //                //  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, //{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
    //                //  transformRequest: function (data, headersGetter) {
    //                //     var str = [];
    //                //     for (var d in data)
    //                //         str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    //                //     return str.join("&");
    //                // }
    //             },
    //             'delete': { method: 'DELETE' }
    //         });


 // Data.save({ }, $httpParamSerializer({ IdReg: '0', Rut: '7' , Dv: '7' , RazonSocial: 'sdsd' , Giro: 'sdsd' , Direccion: 'sdsd' , IdComuna: '90' }), function (response) {

 //            }, function (error) { 

 //            });
        //debugger;
    //     return Data;
    // })
    // .factory("ProveRutFact", function($resource, UrlBase) {
    //     var Data = $resource(UrlBase + "proveedores/rut/:rut", //la url donde queremos consumir
    //         { rut: "@_Rut" }, //aquí podemos pasar variables que queramos pasar a la consulta
    //         //a la función get le decimos el método, y, si es un array lo que devuelve
    //         {
    //             //"update": { method: "PUT" }, //Cambio el Verbo "update" por "PUT"
    //             'get': { method: "GET", isArray: true }, //ponemos isArray en true
    //             //'save': { method: 'POST' },
    //             //'delete': { method: 'DELETE' }
    //         });
    //     //debugger;
    //     return Data;
    // })

/****************************************************************************************
CONTROLLERS
****************************************************************************************/
 .controller("ProveListCtrl", function($scope, $filter, $uibModal, ProveFact, $state, RutHelper,$rootScope, $confirm, ngToast) {

        $scope.proveedores = [];
        $scope.proveedores = ProveFact.get({}, function(element, $scope) {});

        //Eliminar Funcionarios
         $scope.delRegistro = function(row) {
             $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                 .then(function() {
                    //debugger;
                    var proveedor = {
                        IdReg : parseInt(row.IdReg),
                        Estado : 2
                    };


                   // debugger
                    ProveFact.delete(proveedor,function() {
                        $scope.removeItem(row);
                        ngToast.create('Registro eliminado');
                         var myToastMsg = ngToast.danger({ content: 'Registro eliminado' });

                    }, function() {
                        console.log("Error");
                        ngToast.create('No fue posible eliminar este registro');
                    });
                });
         };

        //Quitar registros eliminados de la tabla
         $scope.removeItem = function removeItem(row) {
             var index = $scope.displayed.indexOf(row);
             if (index !== -1) {
                 $scope.displayed.splice(index, 1);
             }
         };




        //$scope.editableInput = true;
        $scope.newRegistro = function(size) {
            
                var row = [];
                $scope.txtRut = true;
                $scope.editableInput = true;

                var modalInstance = $uibModal.open({
                    templateUrl: 'binn/app/proveedores/vw/DetProveedorModal.html',
                    controller: 'ProveDetCtrl',
                    size: size,
                    resolve: { items: function () { return row; } }
                })
                 .result.then(function(row) {
                    $scope.proveedores = row;

                    LimpiaDatos();
                    
                });
        };

        //Editar
        $scope.editRegistro = function(row,size) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'binn/app/proveedores/vw/DetProveedorModal.html',
            controller: 'ProveDetCtrl',
            size: size,
             resolve: { items: function () { return row; } }

            })
            .result.then(function(row) { $scope.proveedores = row; });
        };


       



        $scope.$watch(function(proveedores) {});

    })

   .controller("ProveDetCtrl", function ($scope, $uibModal, ProveFact, $uibModalInstance, $filter, RutHelper, items, ngToast) {
        //debugger
        $scope.proveedor = items;

        //console.log(JSON.stringify(items));
        

        $scope.LimpiaDatos = function (){
              $scope.proveedor = [];
              $scope.proveedor.IdReg = 0;
              $scope.proveedor.Rut = "";
              $scope.proveedor.RazonSocial = "";
              $scope.proveedor.Giro  = "";
              $scope.proveedor.Direccion  = "";
              $scope.proveedor.IdComuna = 0;
              $scope.editableInput = true;
        };


        $scope.editableInput = true;
        $scope.ValidaRut = function (){
        debugger
        if (RutHelper.validate($scope.proveedor.Rut))
              {
                //debugger
                var RutLimpio =  String($scope.proveedor.Rut).substring(0, $scope.proveedor.Rut.length-1);

                var entry = ProveFact.get({ tipo:'2', id: RutLimpio }, function() {
                    if (entry[0].Rut) { $scope.proveedor= entry[0]; } 
                });

              }else{
                //$scope.proveedor.Rut = true;
                 var myToastMsg = ngToast.danger({
                                  //content: '<img src="https://orientadorespalencia.files.wordpress.com/2012/10/alerta.png" alt="Smiley face" height="42" width="42">RUT INVALIDO'
                                  content: 'RUT INVALIDO'
                                });
                $scope.editableInput = true;
              }
        };


        //Guardar estado
        $scope.grabarDatos = function() {
            
        var LargoRut = $scope.proveedor.Rut.length;
        var SoloRut = $scope.proveedor.Rut.toString().substr(0, (LargoRut-1));
        var SoloDv = $scope.proveedor.Rut.toString().substr(LargoRut-1, LargoRut);
            
            if (!$scope.proveedor.IdReg) {
                debugger
                $scope.proveedor.IdReg = 0;
                $scope.proveedor.Rut = SoloRut;  ///QUITARLE DIGITO VERIFICADOR
                $scope.proveedor.Dv = SoloDv;     
                $scope.proveedor.IdComuna = 90;

                ProveFact.save($scope.proveedor, function() { ngToast.create('Registro Almacenado'); });
            } else {
                ProveFact.update($scope.proveedor, function() { ngToast.create('Registro Actualizado'); });
            }

            $scope.proveedores = [];
            $scope.proveedores = ProveFact.get({}, function(element, $scope) {});

        };







        //Cerrar model
        $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };
        $scope.$watch(function(proveedor) {});

    })




}());
