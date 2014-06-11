var app = angular.module( 'app', ['ngRoute']);

app.config(
    function( $controllerProvider, $provide, $compileProvider, $routeProvider ) {

        /* CODE FOR ASYNC MODULE LOADING */
        app._controller = app.controller;
        app._service = app.service;
        app._factory = app.factory;
        app._directive = app.directive;

        app.controller = function( name, constructor ) {
            $controllerProvider.register( name, constructor );
            return( this );
        };

        app.service = function( name, constructor ) {
            $provide.service( name, constructor );
            return( this );
        };

        app.factory = function( name, factory ) {
            $provide.factory( name, factory );
            return( this );
        };

        app.directive = function( name, factory ) {
            $compileProvider.directive( name, factory );
            return( this );
        };

        /* ROUTING STUFFZ */
        $routeProvider
            .when('/', {
                templateUrl: 'page-home/home.html',
                resolve: {
                    deps: function($q, $rootScope) {
                        var deferred = $q.defer();
                        var dependencies = [
                            'page-home/homectrl.js'
                        ];

                        $script(dependencies, function(){
                            $rootScope.$apply(function(){
                                deferred.resolve();
                            });
                        });

                        return deferred.promise;
                    }
                },
                controller: 'HomeCtrl'
            })
            .when('/about', {
                templateUrl: 'page-about/about.html',
                resolve: {
                    deps: function($q, $rootScope) {
                        var deferred = $q.defer();
                        var dependencies = [
                            'page-about/aboutctrl.js'
                        ];

                        $script(dependencies, function(){
                            $rootScope.$apply(function(){
                                deferred.resolve();
                            });
                        });

                        return deferred.promise;
                    }
                },
                controller: 'AboutCtrl'
            })
            .otherwise({ redirectTo: '/' });
    }
);