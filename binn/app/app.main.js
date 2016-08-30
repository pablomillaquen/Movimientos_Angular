(function() {


    'use strict';

    //Modulo: gcaControlMaq
    //Módulo: principal de la aplicación
    angular.module('gcaControlMaq', [
        'ui.router',
        'ngAnimate',
        'ngResource',
        'ngSanitize',
        'ui.bootstrap',
        'ngToast',
        'smart-table',
        'highcharts-ng',
        'ceibo.components.table.export',
        'angular-confirm', //Ventanas modales para confirmar eliminación
        'platanus.rut', //Validación de RUT
        'angular-storage', //Almacenamiento local de los datos del token de autenticación
        'angular-jwt', //Manejo del token de autenticación
        'AngularPrint',
        'angular-sha1',
        'appModule',
        'appFuncionarios',
        'appMaquinas',
        'appMarcas',
        'appProveedores',
        'appMovimientos',
        'appInformes'
    ]);

// /****************************************************************************************
// CONFIGURACIONES 
// ****************************************************************************************/   
    angular.module("gcaControlMaq").config(function ($locationProvider) { $locationProvider.html5Mode(true); });



/****************************************************************************************
FACTORIAS DE SISTEMA
****************************************************************************************/   

/****************************************************************************************
PROVIDER DE SISTEMA 
****************************************************************************************/



/****************************************************************************************
CONTROLLERS DE SISTEMA 
****************************************************************************************/
    //Controlador: loginCtrl
    //Maneja el ingreso a la aplicación
    //Controlador principal de la sección Login
    angular.module("gcaControlMaq").controller('loginCtrl', function LoginController($scope, $http, store, $state) {

        //Crea el objeto user
        $scope.user = {};

        //Realiza el login del usuario
        // $scope.login = function() {
        //     //Establece los valores para $http
        //     $http({
        //         url: 'http://localhost/apimasuno/sesion/crear',
        //         //skipAuthorization: true,
        //         method: 'post',
        //         data: $scope.user,
        //         //withCredentials: true,
        //         //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //     }).then(function(response) { //Si es aceptado por el servidor, realiza lo siguiente:
        //         //Almacena el token en jwt
        //         store.set('jwt', response.data.token);
        //         //Devuelve a la página home
        //         $state.go('/');
        //     }, function(error) { //En caso contrario
        //         //Presenta un mensaje de error
        //         alert(error.data);
        //     });
        // }
        $state.go('/');

    })


    angular.module("gcaControlMaq").controller("recuperaCtrl", function($scope, $state) {

            $state.go('login.recupera');

        })




// angular.module("gcaControlMaq").controller("ParaListCtrl", function($scope, ParaFact) {

//         $scope.ParaDatos = ParaFact.get({}, function(element, $scope) {});

//     })
    angular.module("gcaControlMaq").controller("myCtrl", function($scope, ParaFact) {

        $scope.options1 = ParaFact.get({ idpar: 4 }, function(element, $scope) {});

           

        })




    angular.module("gcaControlMaq").controller("homeCtrl", function($scope, ParaFact) {

           

        })

     angular.module("gcaControlMaq").controller('Grafico2Ctrl', function($scope, $resource) {
        $scope.chartSeries = [{
            "name": "Petróleo",
            "data": [140000, 670000, 230000, 425000]
        }, {
            "name": "Máquinas arrendadas",
            "data": [null, 230000, 550000, null],
            "connectNulls": "true"
        }, {
            "name": "Máquinas propias",
            "data": [1140000, 120000, 550000, 230000]
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
                    categories: ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4'],
                    title: { text: null }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Valor en pesos',
                        align: 'high'
                    },
                    labels: { overflow: 'justify' }
                },
            },
            series: $scope.chartSeries,
            title: { text: '<b>GASTOS POR OBRAS</b>' },
            loading: false,
            size: {}
        };

        $scope.reflow = function() {
            $scope.$broadcast('highchartsng.reflow');
        };

    })


 angular.module("gcaControlMaq").controller('Grafico1Ctrl', function($scope, $resource) {

        $scope.chartConfig = {
            options: {
                chart: { type: 'spline', zoomType: 'x' },
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
                    text: 'Valor en litros'
                }
            },
            series: [{
                "name": "OBRA 1",
                "data": [556, 900, 150, 320, 210, 400, 450, 367, 280, 411, 439, 234]
            }, {
                "name": "OBRA 2",
                "data": [350, 210, 458, 219, 560, 650, 238, 110, 450, 49, 650, 237]
            }, {
                "name": "OBRA 3",
                "data": [176, 425, 376, 654, 778, 629, 555, 521, 218, 96, 441, 580]
            }, {
                "name": "OBRA 4",
                "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
                "name": "OBRA 5",
                "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }],
            title: { text: '<b>Consumo de petróleo</b>' },
            loading: false,
            size: {}

        };
    })

 angular.module("gcaControlMaq").controller('Grafico3Ctrl', function($scope, $resource) {

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            series: [{
                type: 'pie',
                name: 'Horas Hombre',
                data: [
                    ['Proyecto 1', 7500],
                    ['Proyecto 2', 4500], {
                        name: 'Proyecto 3',
                        y: 1250,
                        sliced: true,
                        selected: true
                    },
                    ['Proyecto 4', 9125],
                    ['Proyecto 5', 900]
                ]
            }],
            title: { text: '<b>H.H. por Proyecto</b>' },
            loading: false
        };

        /*$scope.reflow = function() {
            $scope.$broadcast('highchartsng.reflow');
        };*/


    })

/****************************************************************************************
CONTROLLERS DE SISTEMA 
****************************************************************************************/
 //Directiva: pageSelect
    //Permite hacer la paginación de la tabla que usa Smart Tables
    angular.module("gcaControlMaq").directive('pageSelect', function() {
            return {
                restrict: 'E',
                template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
                link: function(scope, element, attrs) {
                    scope.$watch('currentPage', function(c) {
                        scope.inputPage = c;
                    });
                }
            };
        });

    

    //Directiva: stDateRange
    //Permite filtrar por fechas en una lista de SmartTable
    angular.module("gcaControlMaq").directive('stDateRange', ['$timeout', function($timeout) {
        //Devuelve...
        return {
            //Valores propios de la directiva
            restrict: 'E', //Se usará como un elemento de HTML5
            //require: '^stTable', //Requiere el controlador "stTable" para funcionar
            //ámbito sobre el que trabajará
            scope: {
                before: '=',
                after: '='
            },
            //Enlace a la página que usará como template
            templateUrl: 'binn/app/config/stDateRange.html',
            //la función que pasaremos para que cumpla la tarea de la directiva
            link: function(scope, element, attr, table) {
                //tomamos el atributo "predicate" y lo hacemos una variable local
                var predicateName = attr.predicate;
                //Función rangeChange
                scope.rangeChanged = function() {
                    //Creamos la variable "query"
                    var query = {};
                    //Se agregan los datos a partir de cual textbox estemos modificando
                    if (scope.before) {
                        query.before = scope.before;
                    }
                    if (scope.after) {
                        query.after = scope.after;
                    }
                    //Busca de acuerdo a los valores de query y de la columna seleccionada
                    table.search(query, predicateName);
                };

                function open(before) {
                    return function($event) {
                        //Impide que el evento se propague
                        $event.preventDefault();
                        //Encapsula el evento, de forma que el padre del elemento no escuche 
                        $event.stopPropagation();

                        if (before) {
                            scope.isBeforeOpen = true;
                        } else {
                            scope.isAfterOpen = true;
                        }//Fin "if"
                    };//Fin "return"
                }//Fin function "open"

                scope.openBefore = open(true);
                scope.openAfter = open();
            }//Fin "link"
        }; //Fin "return"
    }])//Fin directiva

    //Filtro:customFilter
    //Permite filtrar entre fechas. 
    //Es una filtro a medida, porque la librería SmartTable no cuenta con ella y hubo que extender su funcionalidad
    angular.module("gcaControlMaq").filter('customFilter', ['$filter', function($filter) {
        //toma el valor de filter y lo agrega como una variable local
        var filterFilter = $filter('filter');

        var filterOutDate = function filterOutDate(expression) {
            //Crea la variable "basicFields"
            var basicFields = [];
            // Obtiene los otros campos que no están en los campos de rangos
            for (var key in expression) {
                if (expression.hasOwnProperty(key) && key !== 'fecha') {
                    basicFields.push(key);
                }//Fin "If"
            }// Fin "For"
            return basicFields;
        }; //Fin función "filterOutDate"


        var standardComparator = function standardComparator(obj, text) {
            text = ('' + text).toLowerCase();
            return ('' + obj).toLowerCase().indexOf(text) > -1;
        };//Fin función "standardComparator"

        //Devuelve función "customFilter"
        return function customFilter(array, expression) {
            var output = [];
            var searchFor = [];
            var include = true;
            var itemDate;
            var basicFields = filterOutDate(expression); //Agrega los campos anexos

            searchFor['dateAfter'] = expression['fecha'] && expression['fecha'].after ? true : false;
            searchFor['dateBefore'] = expression['fecha'] && expression['fecha'].before ? true : false;

            var dateAfter = searchFor['dateAfter'] ? new Date(expression['fecha'].after) : null;
            var dateBefore = searchFor['dateBefore'] ? new Date(expression['fecha'].before) : null;

            array.forEach(function(element, index) {
                include = true;
                // crea el "itemDate"
                if (searchFor['dateAfter'] || searchFor['dateBefore']) {
                    itemDate = new Date(element.fecha);
                }

                // Campos de rango
                if ((dateAfter && (dateAfter > itemDate)) || // date range From
                    (dateBefore && (dateBefore < itemDate)) // date range To
                ) {
                    include = false;
                }

                // Otros campos
                basicFields.forEach(function(field, index) {
                    if (!standardComparator(element[field], expression[field])) {
                        include = false;
                    }
                });

                if (include) {
                    output.push(element);
                }

            });
            return output;
        };
    }]); 

    




}());
