/****************************************************************************************

****************************************************************************************/

(function() {


    'use strict';

    angular.module("appInformes", ['ngResource'])


    .value('UrlBase', 'http://cm.dgca.io/api/')
        //.value('UrlBase', 'http://maquinas.apgca.cl/api/') 




    /****************************************************************************************
    FACTORIAS
    ****************************************************************************************/


    .factory("ObrasFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "obras/:id", //la url donde queremos consumir
            { id: "@_id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: UrlBase + "obras/",
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
                    url: UrlBase + "obras/del",
                    transformRequest: function(data, headersGetter) {
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
    DIRECTIVAS
    ****************************************************************************************/


    /****************************************************************************************
    CONTROLADORES
    ****************************************************************************************/

    .controller("LiqxObraCtrl", function($scope, ObrasFact, $state, $stateParams, $rootScope) {
        //Valores de inicio
        $scope.escogerFecha = "dos";


        //Cargar datos Select Obra
        $scope.selectObra = ObrasFact.get({}, function(element, $scope) {});
        $scope.selectObras = {
            availableOptions: $scope.selectObra
        };
        //Cambia la forma de escoger las fechas
        $scope.modoFecha = function() {
            if ($scope.escogerFecha == "uno") {
                $scope.modo = true;
            };
            if ($scope.escogerFecha == "dos") {
                $scope.modo = false;
            }
        };

        //Código para manejar el campo Mes.
        $scope.today = function() {
            $scope.Mes = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.Mes = null;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(2000, 1, 1),
            minMode: 'month'
        };

        $scope.openMes = function() {
            $scope.popupMes.opened = true;
        };

        $scope.setDate = function(year, month) {
            $scope.Mes = new Date(year, month);
        };

        $scope.format = 'MM-yyyy';

        $scope.popupMes = {
            opened: false
        };




    })

    .controller("ResxObraCtrl", function($scope, ObrasFact, $state, $stateParams, $rootScope) {
            //Valores de inicio
            $scope.escogerFecha = "dos";


            //Cargar datos Select Obra
            $scope.selectObra = ObrasFact.get({}, function(element, $scope) {});
            $scope.selectObras = {
                availableOptions: $scope.selectObra
            };
            //Cambia la forma de escoger las fechas
            $scope.modoFecha = function() {
                if ($scope.escogerFecha == "uno") {
                    $scope.modo = true;
                };
                if ($scope.escogerFecha == "dos") {
                    $scope.modo = false;
                }
            };

            //Código para manejar el campo Mes.
            $scope.today = function() {
                $scope.Mes = new Date();
            };
            $scope.today();

            $scope.clear = function() {
                $scope.Mes = null;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(),
                minDate: new Date(2000, 1, 1),
                minMode: 'month'
            };

            $scope.openMes = function() {
                $scope.popupMes.opened = true;
            };

            $scope.setDate = function(year, month) {
                $scope.Mes = new Date(year, month);
            };

            $scope.format = 'MM-yyyy';

            $scope.popupMes = {
                opened: false
            };





        })
        .controller("ResGlobalCtrl", function($scope, ObrasFact, $state, $stateParams, $rootScope) {
            //Valores de inicio
            $scope.escogerFecha = "dos";


            //Cargar datos Select Obra
            $scope.selectObra = ObrasFact.get({}, function(element, $scope) {});
            $scope.selectObras = {
                availableOptions: $scope.selectObra
            };
            //Cambia la forma de escoger las fechas
            $scope.modoFecha = function() {
                if ($scope.escogerFecha == "uno") {
                    $scope.modo = true;
                };
                if ($scope.escogerFecha == "dos") {
                    $scope.modo = false;
                }
            };

            //Código para manejar el campo Mes.
            $scope.today = function() {
                $scope.Mes = new Date();
            };
            $scope.today();

            $scope.clear = function() {
                $scope.Mes = null;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(),
                minDate: new Date(2000, 1, 1),
                minMode: 'month'
            };

            $scope.openMes = function() {
                $scope.popupMes.opened = true;
            };

            $scope.setDate = function(year, month) {
                $scope.Mes = new Date(year, month);
            };

            $scope.format = 'MM-yyyy';

            $scope.popupMes = {
                opened: false
            };




        })
        .controller("DetMaqCtrl", function($scope, ObrasFact, ParaFact, $state, ModFact, $stateParams, $rootScope) {
            //Valores de inicio
            $scope.escogerFecha = "dos";


            //Cargar datos Select Obra
            $scope.selectObra = ObrasFact.get({}, function(element, $scope) {});
            $scope.selectObras = {
                availableOptions: $scope.selectObra
            };
            //Cambia la forma de escoger las fechas
            $scope.modoFecha = function() {
                if ($scope.escogerFecha == "uno") {
                    $scope.modo = true;
                };
                if ($scope.escogerFecha == "dos") {
                    $scope.modo = false;
                }
            };

            //Cargar el dropdown "nombre Maquina"
            $scope.selectNombre = ParaFact.get({ id: 10 }, function(element, $scope) {});
            $scope.selectNombres = {
                availableOptions: $scope.selectNombre
            };

            //Cargar el dropdown "Modelos"
            $scope.selectModelo = ModFact.get({}, function(element, $scope) {});
            $scope.selectModelos = {
                availableOptions: $scope.selectModelo
            };

            //Código para manejar el campo Mes.
            $scope.today = function() {
                $scope.Mes = new Date();
            };
            $scope.today();

            $scope.clear = function() {
                $scope.Mes = null;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(),
                minDate: new Date(2000, 1, 1),
                minMode: 'month'
            };

            $scope.openMes = function() {
                $scope.popupMes.opened = true;
            };

            $scope.setDate = function(year, month) {
                $scope.Mes = new Date(year, month);
            };

            $scope.format = 'MM-yyyy';

            $scope.popupMes = {
                opened: false
            };
        })


    .controller('GrafHrsaPagarCtrl', function($scope, $resource) {
        $scope.chartConfig = {
            options: {
                chart: { type: 'line', zoomType: 'x' },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                }
            },
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
            },
            yAxis: {
                title: {
                    text: 'CANTIDAD DE HORAS'
                }
            },
            series: [{
                "name": "Nombre Máquina",
                "data": [556, 600, 620, 405, 430, 400, 450, 367, 390, 400, 439, 450],
                "color": '#70d200'
            }],
            title: { text: '<b>HORAS A PAGAR POR MÁQUINA</b>' },
            loading: false,
            "size": {
                "width": "450",
                "height": "200"
            }

        };
    })

    .controller('GrafKmsaPagarCtrl', function($scope, $resource) {
        $scope.chartConfig = {
            options: {
                chart: { type: 'line', zoomType: 'x',color: '#70d200' },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                }
            },
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
            },
            yAxis: {
                title: {
                    text: 'CANTIDAD DE KILÓMETROS'
                }
            },
            series: [{
                "name": "Nombre Máquina",
                "data": [2000, 2040, 2001, 2200, 2100, 2430, 1950, 2040, 1930, 1950, 2030, 2000]
            }],
            title: { text: '<b>KMS A PAGAR POR MÁQUINA</b>' },
            loading: false,
            "size": {
                "width": "400",
                "height": "200"
            }
        };
    })

    .controller('GrafDiasaPagarCtrl', function($scope, $resource) {
        $scope.chartConfig = {
            options: {
                chart: { type: 'line', zoomType: 'x' },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                }
            },
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
            },
            yAxis: {
                title: {
                    text: 'CANTIDAD DE DÍAS'
                }
            },
            series: [{
                "name": "Nombre Máquina",
                "data": [20, 26, 29, 28, 15, 19, 29, 20, 26, 20, 30, 30],
                "color": '#e12305'
            }],
            title: { text: '<b>DÍAS A PAGAR POR MÁQUINA</b>' },
            loading: false,
            "size": {
                "width": "400",
                "height": "200"
            }

        };
    })

    .controller('GrafResKmsCtrl', function($scope, $resource) {
        $scope.chartSeries = [{
            "name": "NOMBRE OBRA",
            "data": [2500, 2640, 2302]
        }];

        $scope.addPoints = function() {
            var seriesArray = $scope.chartConfig.series;
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);
        };
        //Agregar series
        $scope.addSeries = function() {
            var rnd = [];
            for (var i = 0; i < 10; i++) {
                rnd.push(Math.floor(Math.random() * 20) + 1);
            }
            $scope.chartConfig.series.push({
                data: rnd
            });
        };
        //Remover series
        $scope.removeRandomSeries = function() {
            var seriesArray = $scope.chartConfig.series;
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray.splice(rndIdx, 1);
        };

        $scope.replaceAllSeries = function() {
            var data = [
                { name: "first", data: [10] },
                { name: "second", data: [3] },
                { name: "third", data: [13] }
            ];
            $scope.chartConfig.series = data;
        };

        $scope.chartConfig = {
            options: {
                chart: { type: 'bar' },
                plotOptions: {
                    series: { stacking: '' },
                    bar: {
                        dataLabels: { enabled: true }
                    }
                },
                xAxis: {
                    categories: ['CAMIONETAS', 'CAMIONES', 'MÁQUINAS'],
                    title: { text: null }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'KMS',
                        align: 'high'
                    },
                    labels: { overflow: 'justify' }
                },
            },
            series: $scope.chartSeries,
            title: { text: '<b>KILÓMETROS</b>' },
            loading: false,
            "size": {
                "width": "400",
                "height": "200"
            }
        };

        $scope.reflow = function() {
            $scope.$broadcast('highchartsng.reflow');
        };

    })

    .controller('GrafResHrsCtrl', function($scope, $resource) {
        $scope.chartSeries = [{
            "name": "NOMBRE OBRA",
            "data": [15000, 12640, 14302]
        }];

        $scope.addPoints = function() {
            var seriesArray = $scope.chartConfig.series;
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);
        };
        //Agregar series
        $scope.addSeries = function() {
            var rnd = [];
            for (var i = 0; i < 10; i++) {
                rnd.push(Math.floor(Math.random() * 20) + 1);
            }
            $scope.chartConfig.series.push({
                data: rnd
            });
        };
        //Remover series
        $scope.removeRandomSeries = function() {
            var seriesArray = $scope.chartConfig.series;
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray.splice(rndIdx, 1);
        };

        $scope.replaceAllSeries = function() {
            var data = [
                { name: "first", data: [10] },
                { name: "second", data: [3] },
                { name: "third", data: [13] }
            ];
            $scope.chartConfig.series = data;
        };

        $scope.chartConfig = {
            options: {
                chart: { type: 'bar' },
                plotOptions: {
                    series: { stacking: '' },
                    bar: {
                        dataLabels: { enabled: true },
                        color: '#70d200'
                    }
                },
                xAxis: {
                    categories: ['CAMIONETAS', 'CAMIONES', 'MÁQUINAS'],
                    title: { text: null }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'HRS',
                        align: 'high'
                    },
                    labels: { overflow: 'justify' }
                },
            },
            series: $scope.chartSeries,
            title: { text: '<b>HORAS</b>' },
            loading: false,
            "size": {
                "width": "400",
                "height": "200"
            }
        };

        $scope.reflow = function() {
            $scope.$broadcast('highchartsng.reflow');
        };
    })

    .controller('GrafResDiasCtrl', function($scope, $resource) {
        $scope.chartSeries = [{
            "name": "NOMBRE OBRA",
            "data": [20, 22, 26]
        }];

        $scope.addPoints = function() {
            var seriesArray = $scope.chartConfig.series;
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);
        };
        //Agregar series
        $scope.addSeries = function() {
            var rnd = [];
            for (var i = 0; i < 10; i++) {
                rnd.push(Math.floor(Math.random() * 20) + 1);
            }
            $scope.chartConfig.series.push({
                data: rnd
            });
        };
        //Remover series
        $scope.removeRandomSeries = function() {
            var seriesArray = $scope.chartConfig.series;
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray.splice(rndIdx, 1);
        };

        $scope.replaceAllSeries = function() {
            var data = [
                { name: "first", data: [10] },
                { name: "second", data: [3] },
                { name: "third", data: [13] }
            ];
            $scope.chartConfig.series = data;
        };

        $scope.chartConfig = {
            options: {
                chart: { type: 'bar' },
                plotOptions: {
                    series: { stacking: '' },
                    bar: {
                        dataLabels: { enabled: true },
                        color: '#e12305'
                    }
                },
                xAxis: {
                    categories: ['CAMIONETAS', 'CAMIONES', 'MÁQUINAS'],
                    title: { text: null }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'DÍAS',
                        align: 'high'
                    },
                    labels: { overflow: 'justify' }
                },
            },
            series: $scope.chartSeries,
            title: { text: '<b>DÍAS</b>' },
            loading: false,
            "size": {
                "width": "400",
                "height": "200"
            }
        };

        $scope.reflow = function() {
            $scope.$broadcast('highchartsng.reflow');
        };

    })

    .controller('GrafOpCtrl', function($scope, $resource) {
        $scope.chartConfig = {
            options: {
                chart: { type: 'area' },
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                }
            },
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'GASTOS EN MILLONES DE $.'
                }
            },
            series: [{
                "name": "Año 2016",
                "data": [3.45, 3.6, 2.56, 10.3, 10.4, 12.6, 13.2, 12.7, 15.6, 14.3, 14.6, 18.2]
            }],
            tooltip: {
                shared: true,
                valueSuffix: ' Millones'
            },
            title: { text: '<b>GASTO OPERACIONALES</b>' },
            loading: false,
            "size": {
                "width": "400",
                "height": "200"
            }
        };
    })

    .controller('GrafCombCtrl', function($scope, $resource) {
        $scope.chartConfig = {
            options: {
                chart: { type: 'line', zoomType: 'x', color: '#0f28ee' },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                }
            },
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
            },
            yAxis: {
                title: {
                    text: 'COMBUSTIBLE EN LTS.'
                }
            },
            series: [{
                "name": "Año 2016",
                "data": [2000, 2040, 2001, 2200, 2100, 2430, 1950, 2040, 1930, 1950, 2030, 2000]
            }],
            title: { text: '<b>GASTO DE COMBUSTIBLE</b>' },
            loading: false,
            "size": {
                "width": "400",
                "height": "200"
            }
        };
    })



}());



// .factory("MarcFact", function($resource, UrlBase) {
//        var Data = $resource(UrlBase + "obras/:id", //la url donde queremos consumir
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




/****************************************************************************************
Directivas
****************************************************************************************/
/*.directive("marcDir", function(MarcFact) {
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
        })*/


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
/* .controller("MarcListCtrl", function($scope, MarcFact, ModFact, $state, $rootScope) {

//debugger
            var IdMarca;
            var VarModelos;
            var entry = $scope.MarcDatos = MarcFact.get({ }, function(element, $scope) {});

            $scope.modelos= ModFact.get({ id:2 }, function(element, $scope) {});

           


            //Editar Operadores 
            $scope.editRegistro = function(row) {
                //debugger;
                //var params = { 'RutFunc': row.rut, 'RutId': row.idreg };
                $state.go('obras.detalle', { idmarca: row.IdReg });

            };
        })*/
