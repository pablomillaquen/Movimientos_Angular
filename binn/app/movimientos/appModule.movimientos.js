/****************************************************************************************

NOMBRES DE CONTROLLER y FACTORIAS comienzan con los primeros 4 digitos
factory     xxxxFact
controller  xxxxCtrl
$scope.xxxxDatos

****************************************************************************************/

(function() {


    'use strict';

    angular.module("appMovimientos", [
                                        'ngResource', 
                                        'platanus.rut'
                                    ])

   .value('UrlBase', 'api/')


/****************************************************************************************
FACTORIAS
****************************************************************************************/
   .factory("MoviFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "movimientos/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
            //a la función get le decimos el método, y, si es un array lo que devuelve
            {
                "update": {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: UrlBase + "movimientos/",
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
                    url: UrlBase + "movimientos/del",
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

   .factory("ObrasFact", function($resource, UrlBase) {
        var Data = $resource(UrlBase + "obras/:id", //la url donde queremos consumir
            { id: "@id" }, //aquí podemos pasar variables que queramos pasar a la consulta
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
       
        return Data;
    })
/****************************************************************************************
CONTROLLERS
****************************************************************************************/

//Controlador: MoviListCtrl
//Maneja la pantalla Lista-Movimiento 
.controller("MoviListCtrl", function($scope, MoviFact, ngToast, $state, $confirm, ParaFact) {
    //Carga los datos a la lista
    $scope.MoviDatos = [];
    $scope.MoviDatos = MoviFact.get({}, function(element, $scope) {});
    console.log($scope.MoviDatos);
    var ListaCompleta = $scope.MoviDatos;
    $scope.ListPrint = MoviFact.get({}, function(element, $scope) {});

    //Cargar datos Select EstadoMaq
    $scope.selectEstadoMaq = ParaFact.get({ id: 18 }, function(element, $scope) {});
        $scope.selectEstadoMaqs = {
            availableOptions: $scope.selectEstadoMaq
        };

        //Eliminar Funcionarios
    $scope.delRegistro = function(row) {
        $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
            .then(function() {

                var funcionario = {
                    Id: parseInt(row.idreg),
                    Estado: 2,
                    IdEmpModif: 1
                };


                MoviFact.delete(funcionario, function() {
                    $scope.removeItem(row);
                    ngToast.create('Registro eliminado');
                }, function() {
                   
                    ngToast.create('No fue posible eliminar este registro');
                });
            });
    };

    //Quitar registros eliminados de la tabla
    $scope.removeItem = function removeItem(row) {
        
        var index = $scope.movimientos.indexOf(row);
        if (index !== -1) {
            $scope.movimientos.splice(index, 1);
        }
    };
    
    //Filtrar listado por Estado de máquina
    $scope.filtrarPorEstado = function(){
        if($scope.movimiento.IdEstadoMaq == 0){
            $scope.MoviDatos = [];
            $scope.MoviDatos = MoviFact.get({}, function(element, $scope) {});
            $scope.ListPrint = MoviFact.get({}, function(element, $scope) {});
        }else{
            var Listado = ListaCompleta;
            var estado = $scope.movimiento.IdEstadoMaq;
            $scope.MoviDatos = [];
            $scope.MoviDatos = _.filter(Listado, function(m){ return m.IdEstadoMaq == estado; });
            $scope.ListPrint = _.filter(Listado, function(m){ return m.IdEstadoMaq == estado; });
        }
        
    }


    //Editar Movimiento
    $scope.editRegistro = function(row) {
        $state.go('movimiento.detalle', { idMov: row.Idreg });
        };

    //Eliminar Registro
    



})//Fin controlador MoviListCtrl



//Controlador: MoviDetCtrl
//Maneja la pantalla Detalle-Movimiento
.controller("MoviDetCtrl", function($scope, $uibModal, MoviFact, $state, $stateParams,FuncTipoCargoFact, PetrFact, ParaFact, ObrasFact, MaquFact, $timeout, $confirm, dataMantenciones, ngToast) {
    
    $scope.movimiento = [];
    $scope.comprobarFecha = false;
    $scope.estado = false;

    //Cargar datos Select Obra
    $scope.selectObra = ObrasFact.get({}, function(element, $scope) {});
        $scope.selectObras = {
            availableOptions: $scope.selectObra
        };
    

    //Cargar datos Select Operador
    $scope.selectOperador = FuncTipoCargoFact.get({id:1}, function(element, $scope) {});
        $scope.selectOperadores = {
            availableOptions: $scope.selectOperador
        };


    //Cargar datos Select EstadoMaq
    $scope.selectEstadoMaq = ParaFact.get({ id: 18 }, function(element, $scope) {});
        $scope.selectEstadoMaqs = {
            availableOptions: $scope.selectEstadoMaq
        };
    

    //Cargar datos Select Maquina
    $scope.selectMaquina = MaquFact.get({}, function(element, $scope) {});
        $scope.selectMaquinas = {
            availableOptions: $scope.selectMaquina
        };


    //Cargar datos Select Operación
    $scope.selectOperacion = ParaFact.get({ id: 19 }, function(element, $scope) {});
        $scope.selectOperaciones = {
            availableOptions: $scope.selectOperacion
        };
    

    //Cargar datos Select Rol
    $scope.selectRol = ParaFact.get({ id: 20 }, function(element, $scope) {});
        $scope.selectRoles = {
            availableOptions: $scope.selectRol
        };

    //valor actual Petroleo
    $scope.valorPetrActual = PetrFact.get({}, function(element, $scope) {});

    //Comprueba estado de la máquina
    $scope.estadoMaq = function(){
        if($scope.movimiento.IdEstadoMaq == 1){
            $scope.estado = true;
        }else{
            $scope.estado = false;
        }
    };

    var estadoMaquina = function(){
        if($scope.movimiento.IdEstadoMaq == 1){
            $scope.estado = true;
        }else{
            $scope.estado = false;
        }
    };


    //Completa los datos de $scope.movimiento con los valores devueltos
    var obtenerMovimiento = function(mov){
    
        $scope.movimiento= {
            Idreg : mov.Idreg,
            NumReport : mov.NumReport,
            Fecha : mov.Fecha,
            IdObra : mov.IdObra,
            NomObra : mov.NomObra,
            IdOperador: mov.IdOperador,
            OPerador: mov.OPerador,
            IdMaquina: mov.IdMaquina,
            Maquina: mov.Maquina,
            IdEstadoMaq: mov.IdEstadoMaq,
            EstadoMaq: mov.EstadoMaq,
            Hrsinicio: parseInt(mov.Hrsinicio),
            HrsFin: parseInt(mov.HrsFin),
            HrsTotal: parseInt(mov.HrsTotal),
            HrsMin: parseInt(mov.HrsMin),
            HrsMinValor: parseInt(mov.HrsMinValor),
            HrsMinValorModif: parseInt(mov.HrsMinValor),
            HrsValoraPagar: parseInt(mov.HrsValoraPagar),
            Kmsinicio: parseInt(mov.Kmsinicio),
            KmsFin: parseInt(mov.KmsFin),
            KmsTotal: parseInt(mov.KmsTotal),
            KmsMin: parseInt(mov.KmsMin),
            KmsMinValor: parseInt(mov.KmsMinValor),
            KmsMinValorModif: parseInt(mov.KmsMinValor),
            KmsValoraPagar: parseInt(mov.KmsValoraPagar),
            DiasTrabajados: parseInt(mov.DiasTrabajados),
            DiasMin: parseInt(mov.DiasMin),
            DiasValor:parseInt(mov.DiasValor),
            DiasValoraPagar: parseInt(mov.DiasValoraPagar),
            CombReporte: mov.CombReporte,
            CombLts: parseInt(mov.CombLts),
            CombHorometro: parseInt(mov.CombHorometro),
            CombOdometro: parseInt(mov.CombOdometro),
            CombaPagar: parseInt(mov.CombaPagar),
            Actividades: mov.Actividades,
            IdOperacion: mov.IdOperacion,
            Operacion: mov.Operacion,
            IdRol: mov.IdRol,
            Rol: mov.Rol,
            Obs: mov.Obs,
            IdEstado: mov.IdEstado,
            Estado: mov.Estado
            };
            var fechaActual =new Date(mov.Fecha);
            $scope.dt = fechaActual;
            estadoMaquina();
        };

    //Completa los datos de $scope.maquina con los valores devueltos
        var obtenerMaquina = function(maq){
            $scope.movimiento.IdMaquina = maq.idMaquina;
            $scope.movimiento.KmsMin = parseInt(maq.tcKmsMin);
            $scope.movimiento.KmsMinValor = parseInt(maq.tcKmsValor);
            $scope.movimiento.HrsMin = parseInt(maq.tcHrsMin);
            $scope.movimiento.HrsMinValor = parseInt(maq.tcHrsValor);
            $scope.movimiento.DiasMin = parseInt(maq.tcDiaMin);
            $scope.movimiento.DiasValor = parseInt(maq.tcDiaValor);
            };

    //Carga las mantenciones al cambiar el select de Máquinas
    $scope.CargarMantenciones = function(data){
        $scope.mantenciones =[];
        var mant = dataMantenciones.get({ id: data }, function(element, $scope) {})
            .$promise.then(function (mant) {
               $scope.mantenciones = mant;                  
            });

        //Cargar valores base:
        var maq = MaquFact.get({id:data}, function(element, $scope) {})
                .$promise.then(function (maq) {
                   var maquina = _.find(maq, function(m){ return m.idMaquina == data; });
                   obtenerMaquina(maquina);
                });
        };

    //Obtiene la lista de mantenciones
    var obtenerMantenciones = function(data) {
        $scope.mantenciones = dataMantenciones.get({ id: data.IdMaquina }, function(element, $scope) {});
        };


    //Si existe, lo carga (Debe cargar también las mantenciones)
    if($stateParams.idMov){
        var id = $stateParams.idMov;
       
        var mov = MoviFact.get({id:id}, function(element, $scope) {})
            .$promise.then(function (mov) {
               var movimiento = _.find(mov, function(m){ return m.Idreg == id; });
               if(movimiento){
                   obtenerMovimiento(movimiento);
                   obtenerMantenciones(movimiento);
               }
            });
        }


    //Abre el modal para Buscar el Report 
    var BuscarMovModal = function(size){
            var modalInstance = $uibModal.open({
                templateUrl: 'binn/app/movimientos/vw/DetReportModal.html',
                controller: 'MovDetBuscar',
                size: size,
                resolve: {}
            }).result.then(function(result) {
                //Completa la vista con los datos obtenidos a partir de la base de datos
                obtenerMovimiento(result);
                obtenerMantenciones(result);
            });
        };

    //Modal para buscar Report
    $scope.openBuscarReport = function(codigo) {
        //Si hay un valor en el textbox de código
        if ($scope.movimiento.NumReport) {
            //Busco la lista
            var mov = MoviFact.get({}, function(element, $scope) {})
                .$promise.then(function(mov) {
                    // Una vez que tenga la lista, busco en ella si hay un registro que coincida
                    var Mov = _.find(mov, function(m) {
                        return m.NumReport == codigo;
                    });
                    //Si hay un registro que coincida, obtengo los datos
                    if (Mov) {
                        
                        obtenerMovimiento(Mov);
                        obtenerMantenciones(Mov);
                        
                    } else {
                        BuscarMovModal();
                    }
                });
            } else {
                BuscarMovModal();
            }
        };
    

    //Modal para crear nueva Operación
    $scope.nuevaOperacion = function(size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'binn/app/movimientos/vw/DetOperacionModal.html',
            controller: 'DetOperacionModal',
            size: size,
            resolve: {}
            });
        };
    


    //Modal para crear nuevo Rol
    $scope.nuevoRol = function(size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'binn/app/movimientos/vw/DetRolModal.html',
            controller: 'DetRolModal',
            //size: size,
            resolve: {}
            });
        };



    //Cargar los datos para fecha
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

    //Grabar Movimiento
        $scope.grabarMov = function() {

            var fechaMov = $scope.dt;
            var d = new Date(fechaMov);
            var n = d.toISOString();
            if($scope.movimiento.KmsMinValor!=$scope.movimiento.KmsMinValorModif){
                $scope.movimiento.KmsMinValorModif = $scope.movimiento.KmsMinValor;
            }
            if($scope.movimiento.HrsMinValor!=$scope.movimiento.HrsMinValorModif){
                $scope.movimiento.HrsMinValorModif = $scope.movimiento.HrsMinValor;
            }
            var movimiento ={
                 'IdReg':$scope.movimiento.Idreg,
                 'NumReport':$scope.movimiento.NumReport,
                 'Fecha':n,
                 'IdObra':$scope.movimiento.IdObra,
                 'IdOperador':$scope.movimiento.IdOperador,
                 'IdMaquina':$scope.movimiento.IdMaquina,
                 'IdEstadoMaq':$scope.movimiento.IdEstadoMaq,
                 'Hrsinicio':$scope.movimiento.Hrsinicio,
                 'HrsFin':$scope.movimiento.HrsFin,
                 'HrsTotal':$scope.movimiento.HrsTotal,
                 'HrsMin':$scope.movimiento.HrsMin,
                 'HrsMinValor':$scope.movimiento.HrsMinValor,
                 'HrsMinValorModif':$scope.movimiento.HrsMinValorModif,
                 'HrsValoraPagar':$scope.movimiento.HrsValoraPagar,
                 'Kmsinicio':$scope.movimiento.Kmsinicio,
                 'KmsFin':$scope.movimiento.KmsFin,
                 'KmsTotal':$scope.movimiento.KmsTotal,
                 'KmsMin':$scope.movimiento.KmsMin,
                 'KmsMinValor':$scope.movimiento.KmsMinValor,
                 'KmsMinValorModif':$scope.movimiento.KmsMinValorModif,
                 'KmsValoraPagar':$scope.movimiento.KmsValoraPagar,
                 'DiasTrabajados':$scope.movimiento.DiasTrabajados,
                 'DiasMin':$scope.movimiento.DiasMin,
                 'DiasValor':$scope.movimiento.DiasValor,
                 'DiasValoraPagar':$scope.movimiento.DiasValoraPagar,
                 'CombReporte':$scope.movimiento.CombReporte,
                 'CombLts':$scope.movimiento.CombLts,
                 'CombHorometro':$scope.movimiento.CombHorometro,
                 'CombOdometro':$scope.movimiento.CombOdometro,
                 'CombaPagar': $scope.movimiento.CombaPagar,
                 'Actividades':$scope.movimiento.Actividades,
                 'IdOperacion':$scope.movimiento.IdOperacion,
                 'Rol':$scope.movimiento.IdRol,
                 'Obs':$scope.movimiento.Obs
            };
            if (!$scope.movimiento.Idreg) {
                MoviFact.save(movimiento, function() {
                    ngToast.create('Datos de movimiento guardados');
                    $scope.$broadcast('limpiar', "");
                });
            } else {
                MoviFact.update(movimiento, function() {
                    ngToast.create('Datos de movimiento actualizados');
                    $scope.$broadcast('limpiar', "");
                });
            }
            $scope.movimiento = [];

        };
    

    //Eliminar Movimiento
    $scope.EliminarMov = function() {
        $confirm({ text: '¿Está seguro de querer eliminar este registro?', title: 'Eliminar registro', ok: 'Si', cancel: 'No' })
            .then(function() {
                var movimiento = {
                    IdReg : parseInt($scope.movimiento.Idreg),
                    Estado : 2
                };
                MoviFact.delete(movimiento,function() {
                    ngToast.create('Registro eliminado');
                    $state.go('movimiento.lista');
                }, function() {
                    console.log("Error");
                    ngToast.create('No fue posible eliminar este registro');
                });
            });
        };


    //Cerrar pantalla Detalle-Movimiento
    $scope.cerrar = function(){$state.go('movimiento.lista');};
    

   

    //Abrir Histórico de Cursos
    $scope.openHistCursos = function(size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'binn/app/movimientos/vw/ModalHistCursos.html',
            controller: 'MovHistCursos',
            size: size,
            resolve: {}
            });
        };

     //Cálculos Horas
    $scope.calculoHoras = function(){
        $scope.movimiento.HrsTotal = $scope.movimiento.HrsFin - $scope.movimiento.Hrsinicio;
        if($scope.movimiento.HrsTotal<=$scope.movimiento.HrsMin){ //Si el total de horas es menor al mínimo
            $scope.movimiento.HrsValoraPagar = $scope.movimiento.HrsMin * $scope.movimiento.HrsMinValor; 
        }else{ //Si es mayor
            $scope.movimiento.HrsValoraPagar = $scope.movimiento.HrsTotal * $scope.movimiento.HrsMinValor; 
        }
    };

     //Cálculos Kms
    $scope.calculoKms = function(){
        $scope.movimiento.KmsTotal = $scope.movimiento.KmsFin - $scope.movimiento.Kmsinicio;
        if($scope.movimiento.KmsTotal<=$scope.movimiento.KmsMin){ //Si el total de horas es menor al mínimo
            $scope.movimiento.KmsValoraPagar = $scope.movimiento.KmsMin * $scope.movimiento.KmsMinValor; 
        }else{ //Si es mayor
            $scope.movimiento.KmsValoraPagar = $scope.movimiento.KmsTotal * $scope.movimiento.KmsMinValor; 
        }
    };

    $scope.calculoDias = function(){
        if($scope.movimiento.DiasTrabajados <= $scope.movimiento.DiasMin){
            $scope.movimiento.DiasValoraPagar = $scope.movimiento.DiasMin * $scope.movimiento.DiasValor;
        }else{
            $scope.movimiento.DiasValoraPagar = $scope.movimiento.DiasTrabajados * $scope.movimiento.DiasValor;
        }
    };

    //Cálculo de valor petróleo y aviso de modificación de precio. 
    $scope.calculoPetroleo = function(){
        //Cálculo valor a pagar
        $scope.movimiento.CombaPagar = $scope.movimiento.CombLts *  $scope.valorPetrActual.valor;
        //Comparación de fechas
        var fechaIngreso = new Date($scope.formatString($scope.valorPetrActual.UltimoIngreso)); //Fecha de ingreso
        var fechaActual = new Date();
        var timeDiff = Math.abs(fechaActual.getTime() - fechaIngreso.getTime());   
        $scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if($scope.dayDifference>=30){
            $scope.comprobarFecha = true;
        }else{
            $scope.comprobarFecha = false;
        }
        return $scope.comprobarFecha;
    };
     
    //Formatear fecha 
    $scope.formatString = function(format) {
        var day   = parseInt(format.substring(0,2));
        var month  = parseInt(format.substring(3,5));
        var year   = parseInt(format.substring(6,10));
        var date = new Date(year, month-1, day);
        return date;
    };

}) //Fin Controlador MoviDetCtrl




//Controlador:MovDetMantCtrl
//Maneja la sección de Mantenciones de la ventana de detalle de máquina.
.controller("MovDetMantCtrl", function($scope, $uibModal, dataMantenciones, $confirm, ngToast, ParaFact) {
     //Cargar el dropdown "Pieza"
        $scope.selectPieza = ParaFact.get({ id: 17 }, function(element, $scope) {});
        $scope.selectPiezas = {
            availableOptions: $scope.selectPieza
        };

    //Nuevo registro de Mantención
    $scope.grabarMantencion = function() {

        var Data = {
            'IdMaquina': $scope.movimiento.IdMaquina,
            'IdTipo': $scope.mantencion.TipoMantencion,
            'IdParte': $scope.mantencion.Pieza,
            'Kms': $scope.mantencion.ProxMantKms,
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

    $scope.$on("limpiar", function(event, data) {
            $scope.mantencion = data;
            $scope.mantenciones = {};
        });

})//Fin controlador MovDetMantCtrl




//Controlador:MovDetBuscar
//Modal para buscar un Report.
.controller("MovDetBuscar", function($scope, $uibModal, $uibModalInstance, MoviFact, $confirm, $state) {
    //Crear listado
    $scope.datosMovimientos = MoviFact.get({}, function(element, $scope) {});
    
    //Seleccionar
    $scope.selecciona = function(row) {
            $uibModalInstance.close(row);
        };
        //Cerrar model
    $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };

})//Fin controlador MovDetBuscar


//Controlador:MovHistCursos
//Modal para visualizar el historico de modificaciones
.controller("MovHistCursos", function($scope, $uibModal, $uibModalInstance, $state) {
    //Cerrar model
    $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };
})//Fin controlador MovHistCursos


//Controlador:DetRolModal
//Modal para grabar un nuevo rol
.controller("DetRolModal", function($scope, $uibModal, $uibModalInstance, $state, ngToast) {
    //Cerrar model
    $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };



    //Nuevo Rol
    $scope.GrabarRol = function(cant) {
        /*console.log($scope.CantRoles);
                
        var rol = {
            'IdPar' : 20,
            'IdDet' : cant,
            'Descrip1' : $scope.movimiento.Rol,
            'Obs' : 'ROL (DIRECCION) DONDE SE EJECUTA LA OBRA',
            'Orden' : 1
        };
       
        /*RolFact.save(rol, function() {
            ngToast.create('Nuevo rol guardado');
            $scope.selectRoles = [];
            var roles = RolFact.get({}, function(element, $scope) {})
                .$promise.then(function (roles) {
                   $scope.selectRoles = {
                    availableOptions: roles
                    }                  
                });
            //$state.go('movimiento.detalle');
            $scope.cerrar();
            });*/
        };
})//Fin controlador DetRolModal

//Controlador:DetOperacionModal
//Modal para Grabar una nueva operación
.controller("DetOperacionModal", function($scope, $uibModal, $uibModalInstance, $state, ngToast) {
    //Cerrar model
    $scope.cerrar = function() { $uibModalInstance.dismiss('cancel'); };


    //Nueva operación
    $scope.GrabarOperacion = function() {
        /*var operacion = {
            'IdReg' : $scope.movimiento.IdReg,
            'Nombre' : $scope.movimiento.Operacion
        };
        /*OperFact.save(operacion, function() {
            ngToast.create('Nueva operación guardada');
            $scope.selectOperaciones = [];
            var operaciones = OperFact.get({}, function(element, $scope) {})
                .$promise.then(function (operaciones) {
                   $scope.selectOperaciones = {
                    availableOptions: operaciones
                    }                  
                });
            //$state.go('movimiento.detalle');
            $scope.cerrar();
            });*/
        };
});//Fin controlador DetOperacionModal

}());
