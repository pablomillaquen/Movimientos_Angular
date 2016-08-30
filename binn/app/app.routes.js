/****************************************************************************************
RUTAS DE LA APLICACION

    Secciones Principales:
      ui-view="sectionheader"
      ui-view="sectionTop"
      ui-view="sectionCenter"
      ui-view="sectionFooter"
****************************************************************************************/



(function() {


    'use strict';


    //Configuración del módulo principal: gcaControlMaq
    //Configura las rutas usadas en la aplicación
    angular.module("gcaControlMaq").config(function($stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider) {
    //angular.module("gcaControlMaq").config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider

            .otherwise('/');
            //Enable cross domain calls
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            /*Obtiene el token para trabajar con la API
             *******************************************************/
            jwtInterceptorProvider.tokenGetter = function(store) {
                return store.get('jwt');
            }
            $httpProvider.interceptors.push('jwtInterceptor');
            /*****************************************************/



        $stateProvider
            //Estado de la paǵina de Login
                .state('login', {
                url: '/login',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    /*'sectionTop@': {
                        templateUrl: 'binn/app/login.html',
                        controller: 'loginCtrl'
                    },*/
                    'sectionCenter@': {
                        templateUrl: 'binn/app/funcionarios/vw/login.html',
                        controller: 'loginCtrl'
                    }
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    /*'sectionFooter@': { templateUrl: '' }*/

                }
            })
            .state('login.recupera', {
                url: '/recupera',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionCenter@': {
                        templateUrl: 'binn/app/funcionarios/vw/recupera.html',
                        controller: 'recuperaCtrl'
                    }
                    //'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    //'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })

        $stateProvider
            .state('/', {
                url: '/',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html' },
                    // 'sectionTop@':    { templateUrl: 'binn/appComponents/home/homeView.html'},
                    // 'sectionCenter@': {
                    //     templateUrl: 'binn/app/home/homeView.html',
                    //     controller: 'homeCtrl'
                    // }
                     'sectionCenter@': {
                        templateUrl: 'binn/app/funcionarios/vw/login.html',
                        controller: 'loginCtrl'
                    }
                    // 'sectionFooter@':    { templateUrl: 'binn/app/menu/footerView.html'},
                }, data: { requiresLogin: true }
            })


        $stateProvider
            .state('inicio', {
                url: '/inicio',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html' },
                    // 'sectionTop@':    { templateUrl: 'binn/appComponents/home/homeView.html'},
                    // 'sectionCenter@': {
                    //     templateUrl: 'binn/app/home/homeView.html',
                    //     controller: 'homeCtrl'
                    // }
                     'sectionCenter@': {
                        templateUrl: 'binn/app/home/homeView.html',
                        controller: 'homeCtrl'
                    }
                    // 'sectionFooter@':    { templateUrl: 'binn/app/menu/footerView.html'},
                }, data: { requiresLogin: false }
            })    
         // $stateProvider
         //    .state('inicio', {
         //        url: '/inicio',
         //        views: {
         //            // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html' },
         //            // 'sectionTop@':    { templateUrl: 'binn/appComponents/home/homeView.html'},
         //            'sectionCenter@': {
         //                templateUrl: 'binn/app/home/homeView.html',
         //                controller: 'homeCtrl'
         //            }
                  
         //            // 'sectionFooter@':    { templateUrl: 'binn/app/menu/footerView.html'},
         //        }
         //    })   
            
            //----------------------------------------------------------------------------------------------------------------------------------------
            .state('funcionario', {
                url: '/funcionario',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/funcionarios/vw/ListFuncionarioView.html',
                        controller: 'FuncListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('funcionario.lista', {
                url: '/lista',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/funcionarios/vw/ListFuncionarioView.html',
                        controller: 'FuncListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('funcionario.detalle', {
                url: '/detalle/:idFunc',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/funcionarios/vw/DetFuncionarioView.html',
                        params:      {'idFunc': null},
                        controller: 'FuncDetaCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })












            
        //----------------------------------------------------------------------------------------------------------------------------------------

        .state('maquinas', {
                url: '/maquinas',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/maquinas/vw/ListmaquinasView.html',
                        controller: 'MaquinaListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('maquinas.lista', {
                url: '/lista',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/maquinas/vw/ListmaquinasView.html',
                        controller: 'MaquinaListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('maquinas.detalle', {
                url: '/detalle/:idMaq',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/maquinas/vw/DetmaquinasView.html',
                        params:      {'idMaq': null},
                        controller: 'MaqDetaCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })





            
            //----------------------------------------------------------------------------------------------------------------------------------------
            .state('marcas', {
                url: '/marcas',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/marcas/vw/ListMarcasView.html',
                        controller: 'FuncListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('marcas.lista', {
                url: '/lista',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/marcas/vw/ListMarcasView.html',
                        controller: 'MarcListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('marcas.detalle', {
                url: '/detalle/:idmarca',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/marcas/vw/DetMarcasView.html',
                        params:      {'idmarca': null},
                        controller: 'MarcDetaCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })

      
            //----------------------------------------------------------------------------------------------------------------------------------------
            .state('proveedores', {
                url: '/proveedores',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/proveedores/vw/ListproveedorView.html',
                        controller: 'ProveListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('proveedores.lista', {
                url: '/lista',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/proveedores/vw/ListproveedorView.html',
                        controller: 'ProveListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            // .state('proveedores.detalle', {
            //     url: '/detalle/:idFunc',
            //     views: {
            //         // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
            //         'sectionTop@': {
            //             templateUrl: 'binn/app/proveedores/vw/DetFuncionarioView.html',
            //             params:      {'idFunc': null},
            //             controller: 'FuncDetaCtrl'
            //         },
            //         'sectionCenter@': { templateUrl: '' },
            //         //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
            //         'sectionFooter@': { templateUrl: '' },

            //     }, data: { requiresLogin: false }
            // })

            //----------------------------------------------------------------------------------------------------------------------------------------
        
            .state('movimiento', {
                url: '/movimiento',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/movimientos/vw/ListmoviView.html',
                        controller: 'MoviListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('movimiento.lista', {
                url: '/lista',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/movimientos/vw/ListmoviView.html',
                        controller: 'MoviListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('movimiento.detalle', {
                url: '/detalle/:idMov',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/movimientos/vw/DetmoviView.html',
                        params:      {'idMov': null},
                        controller: 'MoviDetCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })







        //----------------------------------------------------------------------------------------------------------------------------------------
            .state('petroleo', {
                url: '/petroleo',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/petroleo/vw/ListPetroleoView.html',
                        controller: 'FuncListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: true }
            })
            .state('petroleo.lista', {
                url: '/lista',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/petroleo/vw/ListPetroleoView.html',
                        controller: 'FuncListCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: true }
            })
            .state('petroleo.detalle', {
                url: '/detalle',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/funcionarios/vw/DetPetroleoView.html',
                        controller: 'PetrDetaCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: true }
            })
   

            //----------------------------------------------------------------------------------------------------------------------------------------
            .state('informe', {
                url: '/informe',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/informes/vw/LiqxObra.html',
                        controller: 'LiqxObraCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: true }
            })
            .state('informe.liquidacionobra', {
                url: '/liquidacionobra',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/informes/vw/LiqxObra.html',
                        controller: 'LiqxObraCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('informe.resumenobra', {
                url: '/resumenobra',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/informes/vw/ResumenxObra.html',
                        controller: 'ResxObraCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('informe.global', {
                url: '/global',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/informes/vw/ResumenGlobal.html',
                        controller: 'ResGlobalCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })
            .state('informe.usomaquinas', {
                url: '/usomaquinas',
                views: {
                    // 'sectionheader@': {  templateUrl: 'binn/app/menu/menuView.html'  },
                    'sectionTop@': {
                        templateUrl: 'binn/app/informes/vw/DetalleMaquina.html',
                        controller: 'DetMaqCtrl'
                    },
                    'sectionCenter@': { templateUrl: '' },
                    //'sectionFooter@':    { templateUrl: 'binn/appComponents/personas/footPersonaView.html'},
                    'sectionFooter@': { templateUrl: '' },

                }, data: { requiresLogin: false }
            })




        //----------------------------------------------------------------------------------------------------------------------------------------

      
    });


 angular.module("gcaControlMaq").run(function($rootScope, $state, store, jwtHelper) {
            $rootScope.$on('$stateChangeStart', function(e, to) {
                if (to.data && to.data.requiresLogin) {
                    if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                        e.preventDefault();
                        $state.go('login');
                    }
                }
            });
        })




}());
