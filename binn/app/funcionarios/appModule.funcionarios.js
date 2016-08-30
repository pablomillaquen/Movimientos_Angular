/****************************************************************************************

NOMBRES DE CONTROLLER y FACTORIAS comienzan con los primeros 4 digitos
factory     xxxxFact
controller  xxxxCtrl
$scope.xxxxDatos

****************************************************************************************/

(function() {


    'use strict';

    angular.module("appFuncionarios", ['ngResource'])

    .value('UrlBase', 'http://cm.dgca.io/api/')
        //.value('UrlBase', 'maquinas.apgca.io/api/')


    /****************************************************************************************
    FACTORIAS
    ****************************************************************************************/


    .factory("FuncFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "funcionarios/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: UrlBase + "funcionarios/",
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
                    url: UrlBase + "funcionarios/del",
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

    .factory("FuncTipoCargoFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "funcionarios/tipocargo/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                
                'get': { method: "GET", isArray: true }, //ponemos isArray en true
            });

        return Data;
    })

    //Factoria: dataEmpleadoCargo
    //Obtiene los datos de los modelos desde la URL que se entrega
    .factory("dataEmpleadoCargo", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "funcionarios/cargos/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    url: UrlBase + "funcionarios/cargos/",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(Data, headersGetter) {
                        var str = [];
                        for (var d in Data)
                            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(Data[d]));
                        return str.join("&");
                    }
                }, //Cambio el Verbo "update" por "PUT"
                'get': { method: "GET", isArray: true }, //CON ESTA FUNCION CALLBACK DISPONIBILIZAMOS LOS DATOS EN LA VISTA
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
                    url: UrlBase + "funcionarios/cargos/del",
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

    //Factoria: dataEmpleadoContacto
    //Obtiene los datos de los modelos desde la URL que se entrega
    .factory("dataEmpleadoContacto", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "funcionarios/contactos/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    url: UrlBase + "funcionarios/contactos/",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(Data, headersGetter) {
                        var str = [];
                        for (var d in Data)
                            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(Data[d]));
                        return str.join("&");
                    }
                }, //Cambio el Verbo "update" por "PUT"
                'get': { method: "GET", isArray: true }, //CON ESTA FUNCION CALLBACK DISPONIBILIZAMOS LOS DATOS EN LA VISTA
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
                    url: UrlBase + "funcionarios/contactos/del",
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

    //Factoria: dataEmpleadoHoras
    //Obtiene los datos de los modelos desde la URL que se entrega
    .factory("dataEmpleadoHoras", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "funcionarios/horas/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    url: UrlBase + "funcionarios/horas/",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(Data, headersGetter) {
                        var str = [];
                        for (var d in Data)
                            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(Data[d]));
                        return str.join("&");
                    }
                }, //Cambio el Verbo "update" por "PUT"
                'get': { method: "GET", isArray: true }, //CON ESTA FUNCION CALLBACK DISPONIBILIZAMOS LOS DATOS EN LA VISTA
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
                    url: UrlBase + "funcionarios/horas/del",
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

    //Factoria: dataEmpleadoHoras
    //Obtiene los datos de los modelos desde la URL que se entrega
    .factory("dataEmpHistMaq", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "maquinas/funcionarios/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    url: UrlBase + "maquinas/funcionarios/",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(Data, headersGetter) {
                        var str = [];
                        for (var d in Data)
                            str.push(encodeURIComponent(d) + "=" + encodeURIComponent(Data[d]));
                        return str.join("&");
                    }
                }, //Cambio el Verbo "update" por "PUT"
                'get': { method: "GET", isArray: true }, //CON ESTA FUNCION CALLBACK DISPONIBILIZAMOS LOS DATOS EN LA VISTA
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
                    url: UrlBase + "maquinas/funcionarios/del",
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
    CONTROLLERS
    ****************************************************************************************/
    .controller("FuncListCtrl", function($scope, FuncFact, $state, $rootScope, $confirm, ngToast) {

        //Lista de Funcionarios
        $scope.FuncDatos = FuncFact.get({}, function(element, $scope) {});
        $scope.ListPrint = FuncFact.get({}, function(element, $scope) {});



        //Eliminar Funcionarios
        $scope.delRegistro = function(row) {
            $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                .then(function() {

                    var funcionario = {
                        Id: parseInt(row.idreg),
                        Estado: 2,
                        IdEmpModif: 1
                    };


                    FuncFact.delete(funcionario, function() {
                        $scope.removeItem(row);
                        ngToast.create('Registro eliminado');
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

        //Editar Funcionarios. Envía a la página de Detalle Funcionario
        $scope.editRegistro = function(row) {

            $state.go('funcionario.detalle', {
                idFunc: row.idreg
            });
        };

    })




    /*********************************************************************************************************
    INICIO SECCIÓN DETALLE FUNCIONARIOS
    *********************************************************************************************************/
    //Controlador:OperadorDetCtrl
    //Maneja la ventana de detalle de un operador.
    //Contiene 4 partes:
    //  - Sección Perfil
    //  - Sección Contacto
    //  - Sección Cargos
    //  - Sección Horas

    //FUNCIONARIO DETALLE
    .controller("FuncDetaCtrl", function($scope, $uibModal, FuncFact, $confirm, ngToast, $state, $rootScope, ParaFact, dataEmpleadoCargo, dataEmpleadoContacto, dataEmpleadoHoras, $stateParams, sha1, RutHelper) {

        $scope.operador = [];

        //Cargar el dropdown "Aceeso"
        $scope.selectAcceso = ParaFact.get({ id: 12 }, function(element, $scope) {});
        $scope.selectAccesos = {
            availableOptions: $scope.selectAcceso
        };

        var obtenerCargos = function(data) {
            $scope.cargos = dataEmpleadoCargo.get({ id: data.idreg }, function(element, $scope) {});
        };

        var obtenerContacto = function(data) {
            $scope.contactos = dataEmpleadoContacto.get({ id: data.idreg }, function(element, $scope) {});
        };

        var obtenerHoras = function(data) {
            $scope.horas = dataEmpleadoHoras.get({ id: data.idreg }, function(element, $scope) {});
        };

        var BuscarFunc = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'binn/app/funcionarios/vw/DetOperadorModal.html',
                controller: 'OperadorDetPerfilBuscarModalCtrl',
                size: size,
                resolve: {}
            }).result.then(function(result) {
                $scope.operador = result;

                var str1 = $scope.operador.rut;
                var str2 = "-";
                var str3 = $scope.operador.dv;
                $scope.operador.rutcompleto = str1.concat(str2, str3);

                obtenerCargos(result);
                obtenerContacto(result);
                obtenerHoras(result);
            });
        };

        //Buscar: Debe mostrar un modal con una grilla para seleccionar la que corresponde)
        //Posteriormente, devolverá los datos a esta pantalla principal, cargando los datos del funcionario
        $scope.openBuscarOperador = function(rutcompleto) {
            if ($scope.FormFuncionario.RUT.$valid) {
                var rut = '';
                if (rutcompleto.length == 9) {
                    rut = rutcompleto.slice(0, 8);
                }
                if (rutcompleto.length == 8) {
                    rut = rutcompleto.slice(0, 7);
                }
                var oper = FuncFact.get({}, function(element, $scope) {})
                    .$promise.then(function(oper) {
                       
                        $scope.operador = _.find(oper, function(m) {
                            return m.rut == rut;
                        });

                        if ($scope.operador) {
                            var str1 = $scope.operador.rut;
                            var str2 = "-";
                            var str3 = $scope.operador.dv;
                            $scope.operador.rutcompleto = str1.concat(str2, str3);
                            var op = $scope.operador;
                            obtenerCargos(op);
                            obtenerContacto(op);
                            obtenerHoras(op);
                        } else {
                            BuscarFunc();
                        };
                    });
            } else {
                BuscarFunc();
            };
        };


        //Limpiar los datos
        $scope.LimpiaDatos = function() {
            $scope.operador = [];
            $scope.cargos = [];
            $scope.contactos = [];
            $scope.$broadcast('limpiar', "");
        };

        //Guardar estado
        $scope.grabarDatos = function() {
            if ($scope.FormFuncionario.RUT.$valid) {
                var RUT = $scope.operador.rutcompleto;
                var str = RutHelper.clean(RUT);
                var valid = RutHelper.validate(str);
                if(RutHelper.validate(str)){
                    //Divido los caracteres del RUT
                    var rut = '';
                    if (str.length == 9) {
                        rut = str.slice(0, 8);
                    }
                    if (str.length == 8) {
                        rut = str.slice(0, 7);
                    }
                    var dv = str.slice(-1);

                    //Creo el arreglo que enviaré al método Guardar
                    var funcionario = {
                        Id: $scope.operador.idreg,
                        Rut: rut,
                        Dv: dv,
                        Nombres: $scope.operador.nombres,
                        ApePat: $scope.operador.apepat,
                        ApeMat: $scope.operador.apemat,
                        Email: $scope.operador.email,
                        Acceso: $scope.operador.idacceso,
                        User: $scope.operador.User,
                        IdEstado: $scope.operador.idEstado,
                        IdEmpModif: $scope.operador.modificadopor,
                    }
                   
                    //Modifico la contraseña, si el usuario la cambió
                    if($scope.operador.contrasena){
                        $scope.operador.Pass = $scope.operador.contrasena;
                        funcionario.Pass = sha1.hash($scope.operador.Pass + "apgca");
                        $scope.operador.contrasena = "";
                    };

                    //Si no existe el registro, guardo
                    if (!$scope.operador.idreg) {
                        FuncFact.save(funcionario, function() {
                            ngToast.create('Datos de contacto guardados');
                            $scope.$broadcast('limpiar', "");
                        });
                        //Sino existe, actualizo
                    } else {
                        FuncFact.update(funcionario, function() {
                            ngToast.create('Datos de contacto actualizados');
                            $scope.$broadcast('limpiar', "");
                        });
                    }
                }
                  
            }else{
                ngToast.create('No ha sido posible guardar los datos');
            }
            

        };

        //Cerrar ventana completa y volver al listado inicial
        $scope.cerrar = function() {
            $state.go('funcionario.lista');
        };

        //Eliminar Funcionarios
        $scope.EliminarFunc = function() {
            $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                .then(function() {

                    var funcionario = {
                        Id: parseInt($scope.operador.idreg),
                        Estado: 2,
                        IdEmpModif: 1
                    };


                    FuncFact.delete(funcionario, function() {
                        ngToast.create('Registro eliminado');
                        $state.go('funcionario.lista');
                    }, function() {
                        console.log("Error");
                        ngToast.create('No fue posible eliminar este registro');
                    });
                });
        };



        //Histórico de Modificaciones
        $scope.openHistModif = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'binn/app/funcionarios/vw/DetHistModal.html',
                controller: 'OperadorDetHistoricoModalCtrl',
                size: size,
                resolve: {}
            });
        };
        //Histórico de Máquinas utilizadas
        $scope.openMaquinasUtilizadas = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'binn/app/funcionarios/vw/DetMaqModal.html',
                controller: 'OperadorDetMaquinasModalCtrl',
                size: size,
                resolve: {}
            });
        };

        if ($stateParams.idFunc) {
            var id = $stateParams.idFunc;
            var oper = FuncFact.get({ id: id }, function(element, $scope) {})
                .$promise.then(function(oper) {
                    $scope.operador = _.find(oper, function(m) {
                        return m.idreg == id;
                    });
                    var str1 = $scope.operador.rut;
                    var str2 = "-";
                    var str3 = $scope.operador.dv;
                    $scope.operador.rutcompleto = str1.concat(str2, str3);
                    $scope.$watch(function(operador) {});
                });
            $scope.cargos = dataEmpleadoCargo.get({ id: $stateParams.idFunc }, function(element, $scope) {});
            $scope.contactos = dataEmpleadoContacto.get({ id: $stateParams.idFunc }, function(element, $scope) {});
            $scope.horas = dataEmpleadoHoras.get({ id: $stateParams.idFunc }, function(element, $scope) {});

            $scope.$watch(function(cargos) {});
            $scope.$watch(function(contactos) {});
        };

    })

    //Controlador:OperadorDetPerfilBuscarModalCtrl
    //Modal para buscar un funcionario.
    .controller("OperadorDetPerfilBuscarModalCtrl", function($scope, $uibModal, $uibModalInstance, FuncFact, $confirm, $state, $rootScope) {
        //Crear listado
        $scope.datosOperadores = FuncFact.get({}, function(element, $scope) {});

        //Seleccionar
        $scope.seleccionaOperador = function(row) {
            $uibModalInstance.close(row);
        };

        //Cerrar model
        $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };

    })


    //Controlador:OperadorDetContactoCtrl
    //Maneja la sección de Contacto de un operador
    .controller("OperadorDetContactoCtrl", function($scope, $uibModal, ParaFact, $confirm, dataEmpleadoContacto, ngToast) {

        $scope.$on("limpiar", function(event, data) {
            $scope.tipos.repeatSelect = data;
            $scope.contacto = data;
        });

        //Cargar el dropdown "Tipo"
        $scope.tipo = ParaFact.get({ id: 14 }, function(element, $scope) {});

        $scope.tipos = {
            repeatSelect: null,
            availableOptions: $scope.tipo
        };

        $scope.$watch(function(contactos) {});

        //Nuevo registro de contacto
        $scope.grabarContactoOperador = function() {
            var NombreTipo = "";
            if ($scope.tipos.repeatSelect == 1) { NombreTipo = "EMAIL" };
            if ($scope.tipos.repeatSelect == 2) { NombreTipo = "TELÉFONO" };
            if ($scope.tipos.repeatSelect == 3) { NombreTipo = "CELULAR" };

            var Data = {
                'IdEmp': $scope.operador.idreg,
                'IdTipoContacto': $scope.tipos.repeatSelect,
                'DetContacto': $scope.contacto.detalle
            };
            dataEmpleadoContacto.save(Data, function() {
                ngToast.create('Datos de contacto guardados');
                $scope.contactos.push({
                    TipoContacto: NombreTipo,
                    Detalle: Data.DetContacto
                });
            });
        };

        //Eliminar Funcionarios
        $scope.eliminaContacto = function(contacto) {

            $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                .then(function() {

                    var contFunc = {
                        Id: parseInt(contacto.Id),
                        Estado: 2
                    };


                    dataEmpleadoContacto.delete(contFunc, function() {
                        $scope.removeItem(contacto);
                        ngToast.create('Registro eliminado');
                    }, function() {
                        console.log("Error");
                        ngToast.create('No fue posible eliminar este registro');
                    });
                });
        };

        //Quitar registros eliminados de la tabla
        $scope.removeItem = function removeItem(contacto) {
            var index = $scope.contactos.indexOf(contacto);
            if (index !== -1) {
                $scope.contactos.splice(index, 1);
            }
        };


    })

    //Controlador:OperadorDetCargosCtrl
    //Maneja la sección de Cargos de la ventana de detalle de operador.
    .controller("OperadorDetCargosCtrl", function($scope, $uibModal, dataEmpleadoCargo, $confirm, ParaFact, ngToast) {

        //Cargar el dropdown "selectCargo"
        $scope.selectCargo = ParaFact.get({ id: 6 }, function(element, $scope) {});

        $scope.selectCargos = {
            repeatSelect: null,
            availableOptions: $scope.selectCargo
        };

        $scope.$on("limpiar", function(event, data) {
            $scope.selectCargos.repeatSelect = data;
        });

        $scope.$watch(function(cargos) {});

        //Nuevo registro de cargo
        $scope.guardarCargo = function() {
            var NombreCargo = "";
            if ($scope.selectCargos.repeatSelect == 1) { NombreCargo = "OPERADOR" };
            if ($scope.selectCargos.repeatSelect == 2) { NombreCargo = "ENCARGADO OBRA" };


            var Data = {
                'IdEmp': $scope.operador.idreg,
                //'Empleado': $scope.operador.nombres+' '+$scope.operador.apepat+' '+$scope.operador.apemat,
                'IdCargo': $scope.selectCargos.repeatSelect,
                //'Cargo' : NombreCargo,
                //'IdEstado': 1
            };
            dataEmpleadoCargo.save(Data, function() {
                ngToast.create('Datos de cargo, guardados');
                $scope.cargos.push({
                    Cargo: NombreCargo
                });
            });
        };

        //Eliminar Cargos
        $scope.EliminarCargo = function(cargo) {

            $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                .then(function() {
                    var cargFunc = {
                        Id: parseInt(cargo.IdReg),
                        Estado: 2
                    };


                    dataEmpleadoCargo.delete(cargFunc, function() {
                        $scope.removeItem(cargo);
                        ngToast.create('Registro eliminado');
                    }, function() {
                        console.log("Error");
                        ngToast.create('No fue posible eliminar este registro');
                    });
                });
        };

        //Quitar registros eliminados de la tabla
        $scope.removeItem = function removeItem(cargo) {
            var index = $scope.cargos.indexOf(cargo);
            if (index !== -1) {
                $scope.cargos.splice(index, 1);
            }
        };


    })

    //Controlador:OperadorDetHorasCtrl
    //Maneja la sección de Horas de la ventana de detalle de operador.
    .controller("OperadorDetHorasCtrl", function($scope, $uibModal, ParaFact, $confirm, dataEmpleadoHoras, ngToast) {
        //Cargar el dropdown "selectHora"
        $scope.selectHora = ParaFact.get({ id: 15 }, function(element, $scope) {});
        $scope.selectHoras = {
            repeatSelect: null,
            availableOptions: $scope.selectHora
        };

        $scope.$on("limpiar", function(event, data) {
            $scope.hora = data;
            $scope.selectHoras.repeatSelect = data;
        });


        $scope.$watch(function(horas) {});

        //Nuevo registro de horas
        $scope.guardarHoras = function() {

            var d = new Date($scope.dt);
            var n = d.toISOString();

            var Data = {
                'IdEmp': $scope.operador.idreg,
                'IdTipoHrs': $scope.selectHoras.repeatSelect,
                'TotalHrs': $scope.hora.totalHoras,
                'Fecha': n,
                'IdEmpModif': 1
            };

            dataEmpleadoHoras.save(Data, function() {
                ngToast.create('Datos de cargo, guardados');
                $scope.horas.push({
                    Fecha: $scope.dt,
                    IdTipoHrs: Data.IdTipoHrs,
                    Hrs: Data.TotalHrs
                });
            });
        };

        //Eliminar Horas
        $scope.eliminarHora = function(hora) {

            $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                .then(function() {
                    var HoraFunc = {
                        IdReg: parseInt(hora.IdReg),
                        Estado: 2,
                        IdEmpleado: 1
                    };


                    dataEmpleadoHoras.delete(HoraFunc, function() {
                        $scope.removeItem(hora);
                        ngToast.create('Registro eliminado');
                    }, function() {
                        console.log("Error");
                        ngToast.create('No fue posible eliminar este registro');
                    });
                });
        };

        //Quitar registros eliminados de la tabla
        $scope.removeItem = function removeItem(hora) {
            var index = $scope.horas.indexOf(hora);
            if (index !== -1) {
                $scope.horas.splice(index, 1);
            }
        };


        //Control de campo Fecha
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };



        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };



        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
        //Listado
        //$scope.horas = DataDetalle.horas;

        //Nueva Rev.Tecnica
        /*$scope.guardarHoras = function() {
            dataEmpleadoHoras.save(function(Data) {
                ngToast.create('Registro de horas guardado');
                $scope.$watch();
            });
        };

        //Eliminar
        $scope.eliminarHora = function(row) {
            $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                .then(function() {
                    $scope.removeItem(row);
                    dataEmpleadoHoras.delete(function(revTecnica) {
                        ngToast.create('Registro eliminado');
                        $scope.$watch();
                    });
                });
        };*/

    })


    /*********************************************************************************************************
    FIN SECCIÓN DETALLE FUNCIONARIOS
    *********************************************************************************************************/


    /******************************************************************************************************
    MODALES DE HISTORICOS
    ******************************************************************************************************/
    //Controlador:OperadorDetPerfilBuscarModalCtrl
    //Modal para buscar un funcionario.
    .controller("OperadorDetHistoricoModalCtrl", function($scope, $uibModal, $uibModalInstance, FuncFact, $confirm, $state, $rootScope) {
        //Crear listado
        //$scope.datosOperadores = FuncFact.get({}, function(element, $scope) {});

        //Seleccionar
        /*$scope.seleccionaOperador = function(row) {
                $rootScope.operador = DataDetalle.getById(row); //Debe ser corregido, debería ser $rootScope
                $scope.cerrar();
                $state.go('funcionario.detalle');
            };*/
        //Cerrar model
        $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };

    })

    //Controlador:OperadorDetPerfilBuscarModalCtrl
    //Modal para buscar un funcionario.
    .controller("OperadorDetMaquinasModalCtrl", function($scope, $uibModal, $uibModalInstance, dataEmpHistMaq, $confirm, $state, $rootScope) {
        //Crear listado
        //$scope.datosOperadores = dataEmpHistMaq.get({}, function(element, $scope) {});

        //Cerrar model
        $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };

    })

    /******************************************************************************************************
    FIN DE MODALES DE HISTORICOS
    ******************************************************************************************************/




}());
