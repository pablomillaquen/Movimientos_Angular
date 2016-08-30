/****************************************************************************************

****************************************************************************************/

(function() {


    'use strict';

    angular.module("appMaquinas", ['ngResource'])


    .value('UrlBase', 'http://cm.dgca.io/api/')
        //.value('UrlBase', 'http://maquinas.apgca.cl/api/') 

    /****************************************************************************************
    FACTORIAS
    ****************************************************************************************/
    //Factoria: MaquFact
    .factory("MaquFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "maquinas/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: UrlBase + "maquinas/",
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
                    url: UrlBase + "maquinas/del",
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

    //Factoria: dataMantenciones
    //Obtiene los datos de los modelos desde la URL que se entrega
    .factory("dataMantenciones", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "maquinas/mantencion/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: UrlBase + "maquinas/mantencion/",
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
                    url: UrlBase + "maquinas/mantencion/del",
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

    //Factoria: dataRevTecnica
    //Obtiene los datos de los modelos desde la URL que se entrega
    .factory("dataRevTecnica", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "maquinas/revtecnica/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: UrlBase + "maquinas/revtecnica/",
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
                    url: UrlBase + "maquinas/revtecnica/del",
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

    /*.factory("DataMaquinas",function("MaquFact"){

    })*/
        




    /****************************************************************************************
    CONTROLLERS
    ****************************************************************************************/
    //Controlador:MaquinaListCtrl
    //Maneja la ventana de listado de la sección Máquinas
    //.controller("MaquinaListCtrl", function($scope, $uibModal, MaquFact,$confirm) {
    .controller("MaquinaListCtrl", function($scope, MaquFact, $uibModal, $confirm, ngToast, $state) {

        $scope.MaquDatos = MaquFact.get({}, function(element, $scope) {});
        console.log($scope.MaquDatos);

        //Eliminar Funcionarios
        $scope.delRegistro = function(row) {
            $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                .then(function() {

                    var maquina = {
                        IdReg: parseInt(row.idMaquina),
                        Estado: 2
                    };

                    MaquFact.delete(maquina, function() {
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
       
            var index = $scope.maquinas.indexOf(row);
            if (index !== -1) {
                $scope.maquinas.splice(index, 1);
            }
        };


        //Editar máquina
        $scope.editRegistro = function(row) {
            $state.go('maquinas.detalle', { idMaq: row.idMaquina });
        };


    })


     

        /*********************************************************************************************************
        SECCIÓN DETALLE MÁQUINAS
        *********************************************************************************************************/
    //Controlador:MaquinaDetCtrl
    //Maneja la ventana de detalle de una máquina.
    //Contiene 3 partes:
    //  - Sección Perfil
    //  - Sección Mantención
    //  - Sección Revisión Técnica
    .controller("MaqDetaCtrl", function($scope, $uibModal, $state, MaquFact, ProveFact, MarcFact, $timeout, $confirm, ParaFact, dataMantenciones, dataRevTecnica, ngToast, ModFact, $stateParams) {

        $scope.maquina = [];

        //Cargar el dropdown "nombre Maquina"
        $scope.selectNombre = ParaFact.get({ id: 10 }, function(element, $scope) {});
        $scope.selectNombres = {
            availableOptions: $scope.selectNombre
        };

        //Cargar el dropdown "Combustible"
        $scope.selectCombustible = ParaFact.get({ id: 8 }, function(element, $scope) {});
        $scope.selectCombustibles = {
           availableOptions: $scope.selectCombustible
        };

        //Cargar el dropdown "Tipo Máquina"
        $scope.selectTipoMaquina = ParaFact.get({ id: 9 }, function(element, $scope) {});
        $scope.selectTipoMaquinas = {
           availableOptions: $scope.selectTipoMaquina
        };

        //Cargar el dropdown "Proveedor"
        $scope.selectProveedor = ProveFact.get({}, function(element, $scope) {});
        $scope.selectProveedores = {
            availableOptions: $scope.selectProveedor
        };

        //Cargar el dropdown "Marcas"
        $scope.selectMarca = MarcFact.get({}, function(element, $scope) {});
        $scope.selectMarcas = {
            availableOptions: $scope.selectMarca
        };

        //Cargar el dropdown "Modelos"
            $scope.selectModelo = ModFact.get({}, function(element, $scope) {});
            $scope.selectModelos = {
                availableOptions: $scope.selectModelo
                };

        //Se ejecuta al modficar el select "Marca", lo que actualiza el model del Select "Modelo"
        $scope.CambiarModelos = function(id){
            debugger;
            $scope.selectModelos=[];
            //actualiza el dropdown "Modelos"
            $scope.selectModelo = ModFact.get({id: id}, function(element, $scope) {});
            $scope.selectModelos = {
                availableOptions: $scope.selectModelo
                };
            };

         //Completa los datos de $scope.maquina con los valores devueltos
        var obtenerMaquina = function(maq){
            console.log(maq);
            $scope.maquina= {
                idMaquina : maq.idMaquina,
                IdTipoMaq : maq.tipoMaquina,
                idProveedor : maq.idProveedor,
                CodMaquina : maq.CodMaquina,
                patente : maq.patente,
                TipoCombustible : maq.TipoCombustible,
                NombreMaq: maq.NombreMaq,
                IdMarca: maq.IdMarca,
                IdModelo: maq.IdModelo,
                Ano: parseInt(maq.Ano),
                tcKmsMin: parseInt(maq.tcKmsMin),
                tcKmsValor: parseInt(maq.tcKmsValor),
                tcHrsMin: parseInt(maq.tcHrsMin),
                tcHrsValor: parseInt(maq.tcHrsValor),
                tcDiaMin: parseInt(maq.tcDiaMin),
                tcDiaValor: parseInt(maq.tcDiaValor),
                VencRevTec: maq.VencRevTec,
                ProxMantHrs: parseInt(maq.ProxMantHrs),
                ProxMantKms: parseInt(maq.ProxMantKms),
                TipoMantencion: parseInt(maq.TipoMantencion),
                ProxMantencion: parseInt(maq.ProxMantencion),
                RenHoras: parseInt(maq.RenHoras),
                RenKms: parseInt(maq.RenKms),
                RenDia: parseInt(maq.RenDia),
                EstadoMaq: parseInt(maq.EstadoMaq),
                KmsInicio: parseInt(maq.KmsInicio),
                KmsActual:parseInt(maq.KmsActual),
                HrsInicio: parseInt(maq.HrsInicio),
                HrsActual: parseInt(maq.HrsActual)
                };
                ngToast.create('Datos de la máquina cargados.');
                console.log($scope.maquina);
            };

        //Obtiene la lista de mantenciones
        var obtenerMantenciones = function(data) {
          
            $scope.mantenciones = dataMantenciones.get({ id: data.idMaquina }, function(element, $scope) {});
            };

        //Obtiene la lista de Revisiones Técnicas
        var obtenerRevTecnica = function(data) {
            $scope.revtecnicas = dataRevTecnica.get({ id: data.idMaquina }, function(element, $scope) {});
        };
        
        if($stateParams.idMaq){
            var id = $stateParams.idMaq;
            
            var maq = MaquFact.get({id:id}, function(element, $scope) {})
                .$promise.then(function (maq) {
                   var maquina = _.find(maq, function(m){ return m.idMaquina == id; });
                   obtenerMaquina(maquina);
                   obtenerMantenciones(maquina);
                    obtenerRevTecnica(maquina); 
                   $scope.$watch(function(operador) {});
                });    
        };

        var BuscarMaqModal = function(size){
            var modalInstance = $uibModal.open({
                templateUrl: 'binn/app/maquinas/vw/DetmaquinasModal.html',
                controller: 'MaqDetBuscar',
                size: size,
                resolve: {}
            }).result.then(function(result) {
                //Completa la vista con los datos obtenidos a partir de la base de datos
                obtenerMaquina(result);
                obtenerMantenciones(result);
                obtenerRevTecnica(result);
            });
        }


        //Buscar: Debe mostrar un modal con una grilla para seleccionar la que corresponde)
        //Posteriormente, devolverá los datos a esta pantalla principal, cargando los datos del funcionario
        $scope.openBuscarMaquina = function(codigo) {
            //Si hay un valor en el textbox de código
            if ($scope.maquina.CodMaquina) {
                //Busco la lista
                var maq = MaquFact.get({}, function(element, $scope) {})
                    .$promise.then(function(maq) {
                        // Una vez que tenga la lista, busco en ella si hay un registro que coincida
                        var Maq = _.find(maq, function(m) {
                            return m.CodMaquina == codigo;
                        });
                        //Si hay un registro que coincida, obtengo los datos
                        if (Maq) {
                            
                            obtenerMaquina(Maq);
                            obtenerMantenciones(Maq);
                            obtenerRevTecnica(Maq);
                            
                        } else {
                            BuscarMaqModal();
                        };
                    });
            } else {
                BuscarMaqModal();
            };
        };

        //Guardar estado
        $scope.guardarMaq = function() {
            var d = new Date();
            var n = d.toISOString();
           debugger;
            var maquina ={
                 'IdReg':$scope.maquina.idMaquina,
                 'IdTipoMaq':$scope.maquina.IdTipoMaq,
                 'IdProveedor':$scope.maquina.idProveedor,
                 'Codigo':$scope.maquina.CodMaquina,
                 'Patente':$scope.maquina.patente,
                 'TipoCombustible':$scope.maquina.TipoCombustible,
                 'NombreMaq':$scope.maquina.NombreMaq,
                 'IdMarca':$scope.maquina.IdMarca,
                 'IdModelo':$scope.maquina.IdModelo,
                 'Ano':$scope.maquina.Ano,
                 'tcKmsMin':$scope.maquina.tcKmsMin,
                 'tcKmsValor':$scope.maquina.tcKmsValor,
                 'tcHrsMin':$scope.maquina.tcHrsMin,
                 'tcHrsValor':$scope.maquina.tcHrsValor,
                 'tcDiaMin':$scope.maquina.tcDiaMin,
                 'tcDiaValor':$scope.maquina.tcDiaValor,
                 'VencRevTec':'',
                 'ProxMantHrs':'',
                 'ProxMantKms':'',
                 'IdTipoMantencion':'',
                 'ProxMantencion':'',
                 'RenHoras':$scope.maquina.RenHoras,
                 'RenKms':$scope.maquina.RenKms,
                 'RenDia':$scope.maquina.RenDia,
                 'KmsInicio':$scope.maquina.KmsInicio,
                 'KmsActual':$scope.maquina.KmsActual,
                 'HrsInicio':'',
                 'HrsActual':'',
                 'IdEmpleado':1,
                 'FecModifica': n
            };

            if (!$scope.maquina.idMaquina) {
                MaquFact.save(maquina, function() {
                    ngToast.create('Datos de contacto guardados');
                });
            } else {
                MaquFact.update(maquina, function() {
                    ngToast.create('Datos de contacto actualizados');
                });
            }

        };

        $scope.limpiarMaq = function(){
            $scope.maquina = [];
            $scope.$broadcast('limpiar', "");
        };

        //Eliminar Funcionarios
        $scope.EliminarMaq = function() {
            $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                .then(function() {
                    var maquina = {
                        Id : parseInt($scope.maquina.idMaquina),
                        Estado : 2
                    };
                    MaquFact.delete(maquina,function() {
                        ngToast.create('Registro eliminado');
                        $state.go('maquinas.lista');
                    }, function() {
                        console.log("Error");
                        ngToast.create('No fue posible eliminar este registro');
                    });
                });
            };

        //Abrir modal Nuevo Modelo
        $scope.openNuevoModelo = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'binn/app/maquinas/vw/DetmaquinasModeloModal.html',
                controller: 'MaqDetModelo',
                size: size,
                resolve: {}
            }).result.then(function(result) {
                $scope.selectModelo = ModFact.get({id: id}, function(element, $scope) {});
            });
        };

        $scope.cerrar = function(){$state.go('maquinas.lista')};
        
        //Histórico de Modificaciones
        $scope.openHistModif = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'binn/app/maquinas/vw/DetMaquinaHistModifModal.html',
                controller: 'MaqDetHistModif',
                size: size,
                resolve: {}
            });
        };

        //Histórico de Reports
        $scope.openHistReports = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'binn/app/maquinas/vw/DetMaquinaHistReportsModal.html',
                controller: 'MaqDetHistReports',
                size: size,
                resolve: {}
            });
        };

        //Histórico de Operarios
        $scope.openHistOperarios = function(size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'binn/app/maquinas/vw/DetMaquinaHistOperariosModal.html',
                controller: 'MaqDetHistFunc',
                size: size,
                resolve: {}
            });
        };

    })



    //Controlador:MaqDetBuscar
    //Modal para buscar una máquina.
    .controller("MaqDetBuscar", function($scope, $uibModal, $uibModalInstance, MaquFact, $confirm, $state) {
        //Crear listado
        $scope.datosMaquinas = MaquFact.get({}, function(element, $scope) {});
        
        //Seleccionar
        $scope.selecciona = function(row) {
                $uibModalInstance.close(row);
            }
            //Cerrar model
        $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };

    })


    //Controlador:MaquinaDetPerfilModalCtrl
    //Modal para crear un nuevo modelo.
    .controller("MaqDetModelo", function($scope, $uibModal, $uibModalInstance, MarcFact, ModFact, $confirm, ngToast, $state) {

        //Cargar el dropdown "Marcas"
        $scope.selectMarca = MarcFact.get({}, function(element, $scope) {});
        $scope.selectMarcas = {
            availableOptions: $scope.selectMarca
        };

        //Cerrar model
        $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };

        //Nuevo Modelo
        $scope.GrabarModelo = function() {
            var modelo = {
                'IdMarca' : $scope.maquina.IdMarca,
                'Nombre' : $scope.maquina.IdModelo
            };
            ModFact.save(modelo, function() {
                ngToast.create('Nuevo modelo guardado');
                $state.go('maquinas.detalle');
                $scope.cerrar();
                });

        }
    })

    //Controlador:MaquinaDetMantencionCtrl
    //Maneja la sección de Mantenciones de la ventana de detalle de máquina.
    .controller("MaquinaDetMantencionCtrl", function($scope, $uibModal, dataMantenciones, $confirm, ngToast, ParaFact) {
        
        //Cargar el dropdown "nombre Maquina"
        $scope.selectPieza = ParaFact.get({ id: 17 }, function(element, $scope) {});
        $scope.selectPiezas = {
            availableOptions: $scope.selectPieza
        };

        //Cargar el dropdown "Tipo Mantencion"
        $scope.selectTipo = ParaFact.get({ id: 21 }, function(element, $scope) {});
        $scope.selectTipos = {
            availableOptions: $scope.selectTipo
        };

        $scope.$on("limpiar", function(event, data) {
            //$scope.tipos.repeatSelect = data;
            $scope.mantencion = [];
            $scope.mantenciones = [];
        });

        //Nuevo registro de Mantención
        $scope.grabarMantencion = function() {
            var Data = {
                'IdMaquina': $scope.maquina.idMaquina,
                'IdTipo': $scope.mantencion.TipoMantencion,
                'IdParte': $scope.mantencion.Pieza,
                'kms': $scope.mantencion.ProxMantKms,
                'Hrs' : $scope.mantencion.ProxMantHrs,
                
            };
            
            dataMantenciones.save(Data, function() {
                ngToast.create('Datos de mantención, guardados');
                $scope.mantenciones = [];
                var id = Data.IdMaquina;
                var mant = dataMantenciones.get({ id: id }, function(element, $scope) {})
                    .$promise.then(function (mant) {
                        $scope.mantenciones = mant;                  
                    });
                /*$scope.mantenciones.push({
                    Hrs : Data.Hrs,
                    kms : Data.kms,
                    Parte : Data.IdParte,
                    IdReg : "--"
                });*/
            });
        };

        //Eliminar Mantenciones
        $scope.eliminarMant = function(mantencion) {

             $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                 .then(function() {
                    var Mant = {
                        Id : parseInt(mantencion.IdReg),
                        Estado : 2
                    };


                    dataMantenciones.delete(Mant,function() {
                        $scope.removeItem(mantencion);
                        ngToast.create('Registro eliminado');
                    }, function() {
                        console.log("Error");
                        ngToast.create('No fue posible eliminar este registro');
                    });
                });
         };

        //Quitar registros eliminados de la tabla
         $scope.removeItem = function removeItem(mantencion) {
             var index = $scope.mantenciones.indexOf(mantencion);
             if (index !== -1) {
                 $scope.mantenciones.splice(index, 1);
             }
         };
    })

    //Controlador:MaquinaDetRevTecnicaCtrl
    //Maneja la sección de Revisión Técnica de la ventana de detalle de máquina.
    .controller("MaquinaDetRevTecnicaCtrl", function($scope, $uibModal, MaquFact, $confirm, dataRevTecnica, ngToast) {
       
        //Actualizar
        $scope.actualizaRevTecnica = function(row) {
            dataRevTecnica.put(function(revTecnica) {
                ngToast.create('Revisión técnica actualizada');
                $scope.$watch($scope.RevTecnica);
            });
        };


        $scope.$on("limpiar", function(event, data) {
            //$scope.tipos.repeatSelect = data;
            $scope.revtecnicas = [];
            
        });

        //Nuevo registro de cargo
        $scope.guardarRev = function() {            
         
            var d = new Date($scope.fechaRevTecnica);
            var n = d.toISOString();

            var Data = {
                'IdMaquina': $scope.maquina.idMaquina,
                //'Empleado': $scope.operador.nombres+' '+$scope.operador.apepat+' '+$scope.operador.apemat,
                'Fecha': n,
                //'Cargo' : NombreCargo,
                //'IdEstado': 1
            };
            dataRevTecnica.save(Data, function() {
                ngToast.create('Datos de cargo, guardados');
                
                var d = $scope.fechaRevTecnica;
                var fecha = d.toLocaleDateString();
                $scope.revtecnicas.push({
                    Fecha: fecha
                });
            });
        };

        //Eliminar Revisiones Técnicas
        $scope.eliminarRev = function(revTecnica) {

             $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
                 .then(function() {
                    var Mant = {
                        Id : parseInt(revTecnica.IdReg),
                        Estado : 2
                    };


                    dataRevTecnica.delete(Mant,function() {
                        $scope.removeItem(revTecnica);
                        ngToast.create('Registro eliminado');
                    }, function() {
                        console.log("Error");
                        ngToast.create('No fue posible eliminar este registro');
                    });
                });
         };

        //Quitar registros eliminados de la tabla
         $scope.removeItem = function removeItem(revTecnica) {
             var index = $scope.revtecnicas.indexOf(revTecnica);
             if (index !== -1) {
                 $scope.revtecnicas.splice(index, 1);
             }
         };

        //Fechas
        //definiendo fecha de hoy
        $scope.today = function() {
            $scope.dt = new Date();
        };

        $scope.today();

        //Definiendo campo vacío
        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yyyy',
            maxDate: new Date(2025, 1, 1),
            minDate: new Date(2014, 1, 1),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
        //Abre los cuadros de selección de fecha
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };


        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
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

    })


    /*********************************************************************************************************
    FIN SECCIÓN DETALLE MÁQUINAS
    *********************************************************************************************************/

    /******************************************************************************************************
    MODALES DE HISTORICOS
    ******************************************************************************************************/

    //Controlador:MaquinaDetHistModifModalCtrl
    //Modal para visualizar el historico de modificaciones
    .controller("MaqDetHistModif", function($scope, $uibModal, $uibModalInstance, FuncFact, $confirm, $state, $rootScope) {
        //Cerrar model
        $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };

    })

    //Controlador:MaquinaDetHistReportsModalCtrl
    //Modal para mostrar el historico de Reports
    .controller("MaqDetHistReports", function($scope, $uibModal, $uibModalInstance, FuncFact, $confirm, $state, $rootScope) {
        //Cerrar model
        $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };

    })

    //Controlador:MaquinaDetHistOperariosModalCtrl
    //Modal para mostrar el historico de Operarios
    .controller("MaqDetHistFunc", function($scope, $uibModal, $uibModalInstance, FuncFact, $confirm, $state, $rootScope) {
            //Cerrar model
            $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };

        })
        /******************************************************************************************************
        FIN DE MODALES DE HISTORICOS
        ******************************************************************************************************/




}());
