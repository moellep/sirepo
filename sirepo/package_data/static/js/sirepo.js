"use strict";

// Application meta-data
var _ENUM = {
    Flux: ['Flux', 'Flux per Unit Surface'],
    IntegrationMethod: ['Manual', 'Auto-Undulator', 'Auto-Wiggler'],
    Polarization: ['Linear Horizontal', 'Linear Vertical', 'Linear 45 degrees', 'Linear 135 degrees', 'Circular Right', 'Circular Left', 'Total'],
    PowerDensityMethod: ['Near Field', 'Far Field'],
    Characteristic: [
        'Single-Electron Intensity',
        'Multi-Electron Intensity',
        'Single-Electron Flux',
        'Multi-Electron Flux',
        'Single-Electron Radiation Phase',
        'Re(E): Real part of Single-Electron Electric Field',
        'Im(E): Imaginary part of Single-Electron Electric Field',
        'Single-Electron Intensity, integrated over Time or Photon Energy (i.e. Fluence)',
    ],
    Symmetry: [
        'Symmetrical',
        'Anti-symmetrical',
    ],
};
var _MODEL = {
    electronBeam: {
        title: 'Electron Beam',
        basic: [
            ['beamName', 'Beam Name', 'BeamList'],
            ['current',  'Current [A]', 'Float'],
        ],
        advanced: [
            ['beamName', 'Beam Name', 'BeamList'],
            ['current',  'Current [A]', 'Float'],
            ['horizontalPosition', 'Average Horizontal Position [m]', 'Float'],
            ['verticalPosition', 'Average Vertical Position [m]', 'Float'],
            ['energyDeviation', 'Average Energy Deviation [GeV]', 'Float'],
        ],
    },
    undulator: {
        title: 'Undulator',
        basic: [
            ['period', 'Undulator Period [m]', 'Float'],
            ['length', 'Undulator Length [m]', 'Float'],
            ['horizontalAmplitude', 'Horizontal Amplitude [T]', 'Float'],
        ],
        advanced: [
            ['period', 'Undulator Period [m]', 'Float'],
            ['length', 'Undulator Length [m]', 'Float'],
            ['longitudinalPosition', 'Undulator Center Longitudinal Position [m]', 'Float'],
            ['horizontalAmplitude', 'Horizontal Amplitude [T]', 'Float'],
            ['horizontalSymmetry', 'Horizontal Symmetry', 'Symmetry'],
            ['horizontalInitialPhase', 'Initial Horizontal Phase [rad]', 'Float'],
            ['verticalAmplitude', 'Vertical Amplitude [T]', 'Float'],
            ['verticalSymmetry', 'Vertical Symmetry', 'Symmetry'],
            ['verticalInitialPhase', 'Initial Vertical Phase [rad]', 'Float'],
        ],
    },
    intensityReport: {
        title: 'Intensity Report',
        dataFile: '/static/json/intensity.json',
        basic: [],
        advanced: [
            ['initialEnergy', 'Initial Photon Energy [eV]', 'Float'],
            ['finalEnergy', 'Final Photon Energy [eV]', 'Float'],
            ['horizontalPosition', 'Horizontal Position [m]', 'Float'],
            ['verticalPosition', 'Vertical Position [m]', 'Float'],
            ['method', 'Method for Integration', 'IntegrationMethod'],
            ['precision', 'Relative Precision', 'Float'],
            ['polarization', 'Polarization Component to Extract', 'Polarization'],
        ],
    },
    fluxReport: {
        title: 'Flux Report',
        dataFile: '/static/json/flux.json',
        basic: [],
        advanced: [
            ['initialEnergy', 'Initial Photon Energy [eV]', 'Float'],
            ['finalEnergy', 'Final Photon Energy [eV]', 'Float'],
            ['horizontalPosition', 'Horizontal Center Position [m]', 'Float'],
            ['horizontalApertureSize', 'Horizontal Aperture Size [m]', 'Float'],
            ['verticalPosition', 'Vertical Center Position [m]', 'Float'],
            ['verticalApertureSize', 'Vertical Aperture Size [m]', 'Float'],
            ['longitudinalPrecision', 'Longitudinal Integration Precision', 'Float'],
            ['azimuthalPrecision', 'Azimuthal Integration Precision', 'Float'],
            ['fluxType', 'Flux Calculation', 'Flux'],
            ['polarization', 'Polarization Component to Extract', 'Polarization'],
        ],
    },
    powerDensityReport: {
        title: 'Power Density Report',
        dataFile: '/static/json/power3d.json',
        basic: [],
        advanced: [
            ['horizontalPosition', 'Horizontal Center Position [m]', 'Float'],
            ['horizontalRange', 'Range of Horizontal Position [m]', 'Float'],
            ['verticalPosition', 'Vertical Center Position [m]', 'Float'],
            ['verticalRange', 'Range of Vertical Position [m]', 'Float'],
            ['precision', 'Relative Precision', 'Float'],
            ['method', 'Power Density Computation Method', 'PowerDensityMethod'],
        ],
    },
    initialIntensityReport: {
        title: 'Initial Intensity Report',
        dataFile: '/static/json/initial-intensity.json',
        basic: [],
        advanced: [
            ['photonEnergy', 'Photon Energy [eV]', 'Float'],
            ['horizontalPosition', 'Horizontal Center Position [m]', 'Float'],
            ['horizontalRange', 'Range of Horizontal Position [m]', 'Float'],
            ['verticalPosition', 'Vertical Center Position [m]', 'Float'],
            ['verticalRange', 'Range of Vertical Position [m]', 'Float'],
            ['sampleFactor', 'Sampling Factor', 'Float'],
            ['method', 'Method for Integration', 'IntegrationMethod'],
            ['precision', 'Relative Precision', 'Float'],
            ['polarization', 'Polarization Component to Extract', 'Polarization'],
            ['characteristic', 'Characteristic to be Extracted', 'Characteristic'],
        ],
    },
    intensityAtSampleReport: {
        title: 'Initial At Sample Report',
        dataFile: '/static/json/intensity-at-sample.json',
        basic: [],
        advanced: [
            ['photonEnergy', 'Photon Energy [eV]', 'Float'],
            ['horizontalPosition', 'Horizontal Center Position [m]', 'Float'],
            ['horizontalRange', 'Range of Horizontal Position [m]', 'Float'],
            ['verticalPosition', 'Vertical Center Position [m]', 'Float'],
            ['verticalRange', 'Range of Vertical Position [m]', 'Float'],
            ['sampleFactor', 'Sampling Factor', 'Float'],
            ['method', 'Method for Integration', 'IntegrationMethod'],
            ['precision', 'Relative Precision', 'Float'],
            ['polarization', 'Polarization Component to Extract', 'Polarization'],
            ['characteristic', 'Characteristic to be Extracted', 'Characteristic'],
        ],
    },
    intensityAtBPMReport: {
        title: 'Initial At BPM Report',
        dataFile: '/static/json/intensity-at-bpm.json',
        basic: [],
        advanced: [
            ['photonEnergy', 'Photon Energy [eV]', 'Float'],
            ['horizontalPosition', 'Horizontal Center Position [m]', 'Float'],
            ['horizontalRange', 'Range of Horizontal Position [m]', 'Float'],
            ['verticalPosition', 'Vertical Center Position [m]', 'Float'],
            ['verticalRange', 'Range of Vertical Position [m]', 'Float'],
            ['sampleFactor', 'Sampling Factor', 'Float'],
            ['method', 'Method for Integration', 'IntegrationMethod'],
            ['precision', 'Relative Precision', 'Float'],
            ['polarization', 'Polarization Component to Extract', 'Polarization'],
            ['characteristic', 'Characteristic to be Extracted', 'Characteristic'],
        ],
    },
};


var app = angular.module('SRWApp', ['ngAnimate', 'ngDraggable', 'ngRoute', 'd3']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/simulations', {
            controller: 'SimulationsController as simulations',
            templateUrl: '/static/html/simulations.html',
        })
        .when('/source', {
            controller: 'SourceController as source',
            templateUrl: '/static/html/source.html',
        })
        .when('/beamline', {
            controller: 'BeamlineController as beamline',
            templateUrl: '/static/html/beamline.html',
        })
        .otherwise({
            redirectTo: '/simulations'
        });
});

app.factory('beamlineGraphics', function() {
    var canvasWidth = 50;
    var canvasHeight = 60;
    var draw_lens = function(ctx, x, y, width, height) {
        if (x === undefined) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            x = 20;
            y = 0;
            width = 10;
            height = canvasHeight;
        }
        ctx.fillStyle="#ddee00";
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(x + width / 2, y);
        ctx.bezierCurveTo(x + width, y + 10, x + width, height - 10, x + width / 2, height);
        ctx.bezierCurveTo(x, height - 10, x, y + 10, x + width / 2, y);
        ctx.fill();
        ctx.stroke();
    };
    var draw = {
        lens: draw_lens,
        aperture: function(ctx) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.fillStyle="#000000";
            ctx.fillRect(23, 0, 5, 24);
            ctx.fillRect(23, 36, 5, 24);
        },
        mirror: function(ctx) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.fillStyle="#bdd7ee";
            ctx.fillRect(23, 0, 5, canvasHeight);
            ctx.strokeStyle = "#000000";
            ctx.strokeRect(23, 0, 5, canvasHeight);
        },
        crl: function(ctx) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.fillStyle="#333333";
            ctx.fillRect(15, 0, 20, canvasHeight);
            draw_lens(ctx, 10, 0, 10, canvasHeight);
            draw_lens(ctx, 20, 0, 10, canvasHeight);
            draw_lens(ctx, 30, 0, 10, canvasHeight);
        },
        obstacle: function(ctx) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.fillStyle="#669999";
            ctx.fillRect(15, 20, 20, 20);
            ctx.strokeStyle = "#000000";
            ctx.strokeRect(15, 20, 20, 20);
        },
        watch: function(ctx) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            var radius = 15;
            ctx.strokeStyle = "#000000";
            ctx.beginPath();
            ctx.moveTo(5, 30);
            ctx.bezierCurveTo(15, 30 + radius, 35, 30 + radius, 45, 30);
            ctx.bezierCurveTo(35, 30 - radius, 15, 30 - radius, 5, 30);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(25, 30, radius - 5, 0, 2 * Math.PI);
            ctx.fillStyle="#a52a2a";
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(25, 30, 4, 0, 2 * Math.PI);
            ctx.fillStyle="#000000";
            ctx.fill();
        },
    };

    return {
        width: canvasWidth,
        height: canvasHeight,
        draw_icon: function(item, canvas) {
            draw[item](canvas.getContext("2d"));
        },
    };
});

app.factory('appState', function($http, $rootScope) {
    var models = {
        electronBeam: {
            _visible: true,
            beamName: {name: 'NSLS-II Low Beta Day 1'},
            current: 0.5,
            horizontalPosition: 0,
            verticalPosition: 0,
            energyDeviation: 0,
        },
        undulator: {
            _visible: true,
            period: 0.02,
            length: 3,
            longitudinalPosition: 0,
            horizontalAmplitude: 0.88770981,
            horizontalSymmetry: 'Symmetrical',
            horizontalInitialPhase: 0,
            verticalAmplitude: 0,
            verticalSymmetry: 'Anti-symmetrical',
            verticalInitialPhase: 0,
        },
        intensityReport: {
            _visible: true,
            _loading: false,
            initialEnergy: 100,
            finalEnergy: 20000,
            horizontalPosition: 0,
            verticalPosition: 0,
            method: 'Auto-Undulator',
            precision: 0.01,
            polarization: 'Total',
        },
        fluxReport: {
            _visible: true,
            _loading: false,
            initialEnergy: 100,
            finalEnergy: 20000,
            horizontalPosition: 0,
            horizontalApertureSize: 0.001,
            verticalPosition: 0,
            verticalApertureSize: 0.001,
            longitudinalPrecision: 1,
            azimuthalPrecision: 1,
            fluxType: 'Flux',
            polarization: 'Total',
        },
        powerDensityReport: {
            _visible: true,
            _loading: false,
            horizontalPosition: 0,
            horizontalRange: 0.015,
            verticalPosition: 0,
            verticalRange: 0.015,
            precision: 1,
            method: 'Near Field',
        },
        initialIntensityReport: {
            _visible: true,
            _loading: false,
            photonEnergy: 9000,
            horizontalPosition: 0,
            horizontalRange: 0.4e-03,
            verticalPosition: 0,
            verticalRange: 0.6e-03,
            sampleFactor: 1,
            method: 'Auto-Undulator',
            precision: 0.01,
            polarization: 'Total',
            characteristic: 'Single-Electron Intensity',
        },
        intensityAtSampleReport: {
            _visible: true,
            _loading: false,
        },
        intensityAtBPMReport: {
            _visible: true,
            _loading: false,
        },
    };
    var beamline = [
        {id: 1, name:'aperture', title:'S0', position: 20.5, horizontalSize:0.2, verticalSize:1},
        {id: 2, name:'mirror', title:'HDM', position: 27.4},
        {id: 3, name:'aperture', title:'S1', position: 29.9, horizontalSize:0.2, verticalSize:1},
        {id: 4, name:'aperture', title:'S2', position: 34.3, horizontalSize:0.05, verticalSize:1},
        {id: 5, name:'watch', title:'BPM', position: 34.6},
        {id: 6, name:'crl', title:'CRL1', position: 35.4},
        {id: 7, name:'crl', title:'CRL2', position: 35.4},
        {id: 8, name:'lens', title:'KL', position: 44.5},
        {id: 9, name:'aperture', title:'S3', position: 48, horizontalSize:0.01, verticalSize:0.01},
        {id: 10, name:'watch', title:'Sample', position: 48.7},
    ];
    var reportCache = {}
    var clone_model = function(name) {
        var val = name ? models[name] : models;
        return JSON.parse(JSON.stringify(val));
    };
    var saved_model_values = clone_model();

    function update_reports(name) {
        if (name.indexOf('Report') > 0) {
            $rootScope.$broadcast(name + '.changed');
        }
        else {
            for (var key in models) {
                if (key.indexOf('Report') > 0) {
                    $rootScope.$broadcast(key + '.changed');
                }
            }
        }
    };

    var model_info = function(name) {
        return _MODEL[name];
    };

    var run_queue = [];

    function execute_queue() {
        if (run_queue.length === 0)
            return;
        $http.post('/srw/run', {
            report: run_queue[0][0],
            models: saved_model_values,
            beamline: beamline,
        }).success(function(data, status) {
            var item = run_queue.shift();

            if (data['error']) {
                models[item[0]]._error = data['error'];
            }
            else {
                reportCache[item[0]] = data;
                item[1](data);
            }
            //TODO(pjm): don't set loading to false unless there are no other queue items for this report
            models[item[0]]._loading = false;
            execute_queue();
        }).error(function(data, status) {
            console.log("run failed: ", status, ' ', data);
            run_queue.shift();
            execute_queue();
        });
    }

    return {
        beamline: beamline,
        models: models,
        reportCache: reportCache,
        model_info: model_info,
        request_data: function(name, callback) {
            if (reportCache[name])
                callback(reportCache[name]);
            else {
                models[name]._loading = true;
                models[name]._error = null;
                run_queue.push([name, callback]);
                if (run_queue.length == 1)
                    execute_queue();
            }
        },
        save_changes: function(name, refresh_reports) {
            //console.log("save changes: ", name);
            saved_model_values[name] = clone_model(name);
            if (refresh_reports) {
                reportCache = {};
                update_reports(name);
            }
        },
        cancel_changes: function(name) {
            console.log("cancel changes: ", name);
            models[name] = JSON.parse(JSON.stringify(saved_model_values[name]));
        },
    };
});

app.controller('SourceController', function ($rootScope, appState) {
    $rootScope.pageTitle = "NSLS-II CHX beamline Day 1 - SRW - Radiasoft";
    $rootScope.sectionTitle = "NSLS-II CHX beamline Day 1";
    $rootScope.activeSection = "source";
    var self = this;
    self.models = appState.models;
});

app.directive('fieldEditor', function(appState, $http) {
    return {
        restirct: 'A',
        scope: {
            fieldEditor: '=',
            model: '=',
        },
        template: [
            // field def: [name, label, type]
            '<label class="col-sm-5 control-label">{{ fieldEditor[1] }}</label>',
            '<div data-ng-switch="fieldEditor[2]">',
              '<div data-ng-switch-when="BeamList" class="col-sm-5">',
                '<select class="form-control" data-ng-model="model[fieldEditor[0]]" data-ng-options="item.name for item in appState.beams track by item.name"></select>',
              '</div>',
              '<div data-ng-switch-when="Float" class="col-sm-3">',
                '<input data-ng-model="model[fieldEditor[0]]" class="form-control" style="text-align: right">',
              '</div>',
              // assume it is an enum
              '<div data-ng-switch-default class="col-sm-5">',
                '<select class="form-control" data-ng-model="model[fieldEditor[0]]" data-ng-options="item for item in enum[fieldEditor[2]] track by item"></select>',
              '</div>',
            '</div>',
        ].join(''),
        controller: function($scope) {
            $scope.appState = appState;
        },
        link: function link(scope) {
            scope.enum = _ENUM;
            if (scope.fieldEditor[2] == 'BeamList') {
                if (appState.beams)
                    return;
                appState.beams = [scope.model[scope.fieldEditor[0]]];
                $http["get"]('/static/json/beams.json')
                    .success(function(data, status) {
                        appState.beams = data;
                    })
                    .error(function() {
                        console.log('get beams.json failed!');
                    });
            }
        },
    };
});

app.directive('buttons', function(appState) {
    return {
        scope: {
            formName: '=',
            modelName: '=',
            modalId: "@",
        },
        template: [
            '<div class="col-sm-6 pull-right cssFade" data-ng-show="formName.$dirty">',
              '<button data-ng-click="save_changes()" class="btn btn-primary">Save Changes</button> ',
              '<button data-ng-click="cancel_changes()" class="btn btn-default">Cancel</button>',
            '</div>',
        ].join(''),
        controller: function($scope) {
            function change_done() {
                $scope.formName.$setPristine();
                if ($scope.modalId)
                    $('#' + $scope.modalId).modal('hide');
            }
            $scope.save_changes = function() {
                appState.save_changes($scope.modelName, true);
                change_done();
            };
            $scope.cancel_changes = function() {
                appState.cancel_changes($scope.modelName);
                change_done();
            };
        }
    };
});

app.directive('panelHeading', function() {
    return {
        restrict: 'A',
        scope: {
            panelHeading: '@',
            model: '=',
            editorId: '@',
            allowFullScreen: '@',
        },
        controller: function($scope) {
            $scope.toggleVisible = function() {
                $scope.model['_visible'] = ! $scope.model['_visible'];
            };
            $scope.isVisible = function() {
                return $scope.model['_visible'];
            };
            $scope.showEditor = function() {
                $('#' + $scope.editorId).modal('show');
            };
        },
        template: [
            '<span class="lead">{{ panelHeading }}</span>',
            '<div class="srw-panel-options pull-right">',
            '<a href data-ng-click="showEditor()" data-toggle="tooltip" title="Edit"><span class="lead glyphicon glyphicon-pencil"></span></a> ',
            '<a href data-ng-show="allowFullScreen" data-toggle="tooltip" title="Download"><span class="lead glyphicon glyphicon-cloud-download"></span></a> ',
            '<a href data-ng-show="allowFullScreen" data-toggle="tooltip" title="Full screen"><span class="lead glyphicon glyphicon-fullscreen"></span></a> ',
            '<a href data-ng-click="toggleVisible()" data-ng-show="isVisible()" data-toggle="tooltip" title="Hide"><span class="lead glyphicon glyphicon-triangle-top"></span></a> ',
            '<a href data-ng-click="toggleVisible()" data-ng-hide="isVisible()" data-toggle="tooltip" title="Show"><span class="lead glyphicon glyphicon-triangle-bottom"></span></a>',
            '</div>',
        ].join(''),
    };
});

app.directive('panelBody', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            model: '=',
        },
        controller: function($scope) {
        },
        template: [
            '<div data-ng-class="{\'srw-panel-loading\': model._loading, \'srw-panel-error\': model._error}" class="panel-body cssFade" data-ng-show="model._visible">',
            '<div data-ng-show="model._loading" class="lead srw-panel-wait"><span class="glyphicon glyphicon-hourglass"></span> Refreshing...</div>',
            '<div data-ng-show="model._error" class="lead srw-panel-wait"><span class="glyphicon glyphicon-exclamation-sign"></span> {{ model._error }}</div>',
            '<ng-transclude></ng-transclude>',
            '</div>',
        ].join(''),
    };
});

app.directive('plot2d', function($http, appState, d3Service) {

    var formatter;
    var margin = {top: 50, right: 50, bottom: 80, left: 70};

    function linspace(start, stop, nsteps) {
        var delta = (stop - start) / (nsteps - 1);
        return d3.range(start, stop + delta, delta).slice(0, nsteps);
    };

    return {
        restrict: 'A',
        scope: {
            modelName: '@',
            id: '@',
        },
        template: [
            '<svg></svg>',
            '<div style="margin-left: 30px" class="text-center"><strong>{{ x_range[0] | number }}</strong><input type="text" class="srw-plot2d-slider" value="" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="[0,100]" data-slider-tooltip="hide"><strong>{{ x_range[1] | number }}</strong></div>',
        ].join(''),
        controller: function($scope) {

            $scope.compute_peaks = function(json, dimensions, x_points) {
                var peak_spacing = dimensions[0] / 20;
                var min_pixel_height = dimensions[1] * .995;
                var x_peak_values = [];
                var sorted_points = d3.zip(x_points, json.points).sort(function(a, b) { return b[1] - a[1] });
                for (var i = 0; i < sorted_points.length / 2; i++) {
                    var p = sorted_points[i]
                    var x_pixel = $scope.x_axis_scale(p[0]);
                    var y_pixel = $scope.y_axis_scale(p[1]);
                    if (y_pixel >= min_pixel_height) {
                        break;
                    }
                    var found = false;
                    for (var j = 0; j < x_peak_values.length; j++) {
                        if (Math.abs(x_pixel - x_peak_values[j][2]) < peak_spacing) {
                            found = true;
                            break;
                        }
                    }
                    if (! found)
                        x_peak_values.push([p[0], p[1], x_pixel]);
                }
                //console.log("local maxes: ", x_peak_values.length);
                return x_peak_values;
            };

            $scope.init = function(id) {
                $scope.plot_id = '#' + id;
                formatter = d3.format(",.0f")
                $scope.slider = $($scope.plot_id + ' .srw-plot2d-slider').slider();
                $scope.slider.on('slide', $scope.slider_changed);
                $(window).resize($scope.resize);
                $scope.x_axis_scale = d3.scale.linear();
                $scope.y_axis_scale = d3.scale.linear();
                $scope.x_axis = d3.svg.axis()
                    .scale($scope.x_axis_scale)
                    .orient("bottom");
                $scope.x_axis_grid = d3.svg.axis()
                    .scale($scope.x_axis_scale)
                    .orient("bottom");
                $scope.y_axis = d3.svg.axis()
                    .scale($scope.y_axis_scale)
                    // this causes a "number of fractional digits" error in MSIE
                    //.tickFormat(d3.format('e'))
                    .tickFormat(function (value) {
                        return value.toExponential();
                    })
                    .ticks(5)
                    .orient("left");
                $scope.y_axis_grid = d3.svg.axis()
                    .scale($scope.y_axis_scale)
                    .orient("left");
                $scope.graph_line = d3.svg.line()
                    .x(function(d) {return $scope.x_axis_scale(d[0])})
                    .y(function(d) {return $scope.y_axis_scale(d[1])});

                var context = $scope.select('svg')
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                context.append("g")
                    .attr("class", "x axis")
                context.append("g")
                    .attr("class", "x axis grid")
                context.append("g")
                    .attr("class", "y axis")
                context.append("g")
                    .attr("class", "y axis grid")
                context.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("class", "y-axis-label")
                    .attr("y", - margin.left)
                    .attr("dy", "1em")
                    .style("text-anchor", "middle");
                context.append("text")
                    .attr("class", "x-axis-label")
                    .attr("dy", "1em")
                    .style("text-anchor", "middle");
                context.append("text")
                    .attr("class", "main-title")
                    .attr("y", - margin.top / 2)
                    .style("text-anchor", "middle");

                var focus = context.append("g")
                    .attr("class", "focus")
                    .style("display", "none");
                focus.append("circle")
                    .attr("r", 6);
                focus.append("text")
                    .attr("class", "focus-text")
                    .attr("x", 9)
                    .attr("dy", ".35em");
                context.append("rect")
                    .attr("class", "overlay")
                    .on("mouseover", function() { focus.style("display", null); })
                    .on("mouseout", function() { focus.style("display", "none"); })
                    .on("mousemove", $scope.mousemove);

                var viewport = context.append("svg")
                    .attr("class", "plot-viewport");
                viewport.append("path")
                    .attr("class", "line");
            };

            $scope.load = function(json) {
                var x_points = linspace(json.x_range[0], json.x_range[1], json.points.length);
                $scope.points = d3.zip(x_points, json.points);
                $scope.x_range = json.x_range;
                $scope.x_units = json.x_units;
                $scope.x_axis_scale.domain([json.x_range[0], json.x_range[1]]);
                $scope.y_axis_scale.domain([d3.min(json.points), d3.max(json.points)]);
                $scope.select(".y-axis-label").text(json.y_label);
                $scope.select(".x-axis-label").text(json.x_label);
                $scope.select(".main-title").text(json.title);
                $scope.select(".line").datum($scope.points);
                var dimensions = $scope.resize();
                $scope.x_peak_values = $scope.compute_peaks(json, dimensions, x_points);
            };

            $scope.mousemove = function() {
                if (! $scope.points)
                    return;
                var x0 = $scope.x_axis_scale.invert(d3.mouse(this)[0]);
                var local_max = null;
                for (var i = 0; i < $scope.x_peak_values.length; i++) {
                    var v = $scope.x_peak_values[i];
                    if (local_max === null || Math.abs(v[0] - x0) < Math.abs(local_max[0] - x0)) {
                        local_max = v;
                    }
                }
                if (local_max) {
                    var x_pixel = $scope.x_axis_scale(local_max[0]);
                    if (x_pixel < 0 || x_pixel >= $scope.select(".plot-viewport").attr("width"))
                        return;
                    var focus = $scope.select(".focus");
                    focus.attr("transform", "translate(" + x_pixel + "," + $scope.y_axis_scale(local_max[1]) + ")");
                    focus.select("text").text(formatter(local_max[0]) + " " + $scope.x_units);
                }
            };

            $scope.resize = function() {
                if (! $scope.points)
                    return;
                var width = parseInt($scope.select().style("width")) - margin.left - margin.right;
                var height = parseInt($scope.select().style("height")) - margin.top - margin.bottom;
                if (height > width)
                    height = width;
                $scope.x_axis_scale.range([-0.5, width - 0.5]);
                $scope.y_axis_scale.range([height - 0.5, 0 - 0.5]).nice();
                $scope.x_axis_grid.tickSize(-height);
                $scope.y_axis_grid.tickSize(-width);
                $scope.select(".x.axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call($scope.x_axis);
                $scope.select(".x.axis.grid")
                    .attr("transform", "translate(0," + height + ")")
                    .call($scope.x_axis_grid); // tickLine == gridline
                $scope.select(".y.axis")
                    .call($scope.y_axis);
                $scope.select(".y.axis.grid")
                    .call($scope.y_axis_grid);
                $scope.select(".main-title")
                    .attr("x", width / 2);
                $scope.select(".y-axis-label")
                    .attr("x", - height / 2);
                $scope.select(".x-axis-label")
                    .attr("x", width / 2)
                // font height + 12 padding...
                    .attr("y", height + 26);
                $scope.select(".plot-viewport")
                    .attr("width", width)
                    .attr("height", height);
                $scope.select(".overlay")
                    .attr("width", width)
                    .attr("height", height)
                $scope.select(".line")
                    .attr("d", $scope.graph_line);
                return [width, height];
            }

            $scope.select = function(selector) {
                return d3.select($scope.plot_id + (selector ? (" " + selector) : ""));
            };

            $scope.slider_changed = function(ev) {
                if (! $scope.points)
                    return;
                function compute_point(value) {
                    return Math.round($scope.x_range[0] + (value / 100) * ($scope.x_range[1] - $scope.x_range[0]));
                }
                var start_x = compute_point(ev.value[0]);
                var end_x = compute_point(ev.value[1]);
                $scope.x_axis_scale.domain([start_x, end_x]);

                var min_y, max_y;
                for (var i = 0; i < $scope.points.length; i++) {
                    var p = $scope.points[i];
                    if (p[0] < start_x)
                        continue;
                    if (p[0] > end_x)
                        break;
                    if (min_y === undefined || min_y > p[1])
                        min_y = p[1];
                    if (max_y === undefined || max_y < p[1])
                        max_y = p[1];
                }
                $scope.y_axis_scale.domain([min_y, max_y]);
                $scope.resize();
            };
        },
        link: function link(scope) {
            d3Service.d3().then(function(d3) {

                function request_data() {
                    console.log('requesting data: ', scope.modelName);
                    appState.request_data(scope.modelName, function(data) {
                        console.log('loading data: ', scope.modelName);
                        scope.load(data);
                    });
                }
                scope.$on(scope.modelName + '.changed', request_data);
                scope.init(scope.id);
                request_data();
            });
            scope.$on('$destroy', function() {
                $(window).off('resize', scope.resize);
                scope.select('svg').remove();
                scope.slider.off();
                scope.slider.data('slider').picker.off();
                scope.slider.remove();
            });
        },
    };
});

app.directive('plot3d', function($http, appState, d3Service) {

    var margin = 50;

    return {
        restrict: 'A',
        scope: {
            modelName: '@',
            id: '@',
        },
        controller: function($scope) {

            $scope.draw_bottompanel_cut = function() {
                var y_bottom = $scope.y_index_scale($scope.y_axis_scale.domain()[0]);
                var y_top = $scope.y_index_scale($scope.y_axis_scale.domain()[1]);
                var yv = Math.floor(y_bottom + (y_top - y_bottom + 1)/2);
                var row = $scope.heatmap[yv];
                var xv_min = $scope.x_index_scale.domain()[0];
                var xv_max = $scope.x_index_scale.domain()[1];
                var xi_min = Math.ceil($scope.x_index_scale(xv_min));
                var xi_max = Math.floor($scope.x_index_scale(xv_max));
                var xv_range = $scope.x_value_range.slice(xi_min, xi_max + 1);
                var zv_range = row.slice(xi_min, xi_max + 1);
                $scope.bottompanel_context.select($scope.plot_id + " path")
                    .datum(d3.zip(xv_range, zv_range))
                    .attr("class", "line")
                    .attr("d", $scope.bottompanel_cut_line);
            }

            $scope.draw_rightpanel_cut = function() {
                var yv_min = $scope.y_index_scale.domain()[0];
                var yv_max = $scope.y_index_scale.domain()[1];
                var yi_min = Math.ceil($scope.y_index_scale(yv_min));
                var yi_max = Math.floor($scope.y_index_scale(yv_max));
                var x_left = $scope.x_index_scale($scope.x_axis_scale.domain()[0]);
                var x_right = $scope.x_index_scale($scope.x_axis_scale.domain()[1]);
                var xv = Math.floor(x_left + (x_right - x_left + 1)/2);
                var data = $scope.heatmap.slice(yi_min, yi_max + 1).map(function (v, i) {
                    return [$scope.y_value_range[i], v[xv]];
                });
                $scope.rightpanel_context.select($scope.plot_id + " path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("d", $scope.rightpanel_cut_line);
            }

            $scope.init = function(id) {
                $scope.plot_id = '#' + id;
                $scope.x_axis_scale = d3.scale.linear();
                $scope.x_index_scale = d3.scale.linear();
                $scope.y_axis_scale = d3.scale.linear();
                $scope.y_index_scale = d3.scale.linear();
                $scope.bottompanel_y_scale = d3.scale.linear();
                $scope.rightpanel_x_scale = d3.scale.linear();
                $scope.main_xAxis = d3.svg.axis()
                    .scale($scope.x_axis_scale)
                    .orient("bottom");
                $scope.main_yAxis = d3.svg.axis()
                    .scale($scope.y_axis_scale)
                    .orient("left");
                $scope.bottompanel_xAxis = d3.svg.axis()
                    .scale($scope.x_axis_scale)
                    .orient("bottom");
                $scope.bottompanel_yAxis = d3.svg.axis()
                    .scale($scope.bottompanel_y_scale)
                    // this causes a "number of fractional digits" error in MSIE
                    //.tickFormat(d3.format('e'))
                    .tickFormat(function (value) {
                        return value.toExponential();
                    })
                    .ticks(5)
                    .orient("left");
                $scope.rightpanel_xAxis = d3.svg.axis()
                    .scale($scope.rightpanel_x_scale)
                    // this causes a "number of fractional digits" error in MSIE
                    //.tickFormat(d3.format('e'))
                    .tickFormat(function (value) {
                        return value.toExponential();
                    })
                    .ticks(5)
                    .orient("bottom");
                $scope.rightpanel_yAxis = d3.svg.axis()
                    .scale($scope.y_axis_scale)
                    .orient("right");
                $scope.zoom = d3.behavior.zoom()
                    .scaleExtent([1, 10])
                    .on("zoom", $scope.refresh);
                var root_div = $scope.select()
                    .style("position", "relative");
                $scope.canvas = root_div.append("canvas")
                    .style("position", "absolute")
                    .attr("transform", "translate(" + margin + "," + margin + ")")
                    .style("left", margin + "px")
                    .style("top", margin + "px");
                $scope.svg = root_div.append("svg")
                    .style("position", "relative")
                    .append("g")
                    .attr("transform", "translate(" + margin + "," + margin + ")");
                $scope.svg.append("text")
                    .attr("class", "main-title")
                    .style("text-anchor", "middle");
                // We make an invisible rectangle to intercept mouse events for zooming.
                $scope.mouse_rect = $scope.svg.append("rect")
                    .attr("class", "mouse-rect")
                    .style("pointer-events", "all")
                    .style("fill", "none");
                $scope.ctx = $scope.canvas.node().getContext("2d");
                $scope.imageObj = new Image();
                $scope.imageObj.onload = function() {
                    // important - the image may not be ready initially
                    $scope.refresh();
                };
                $scope.svg.append("line")
                    .attr("class", "y-cross-hair cross-hair")
                    .attr("y1", 0)
                    .attr("stroke-width", 1)
                    .attr("shape-rendering", "crispEdges")
                    .attr("stroke", "steelblue");
                $scope.svg.append("line")
                    .attr("class", "x-cross-hair cross-hair")
                    .attr("x1", 0)
                    .attr("stroke-width", 1)
                    .attr("shape-rendering", "crispEdges")
                    .attr("stroke", "steelblue");
                $scope.svg.append("g")
                    .attr("class", "y axis grid");
                $scope.svg.append("defs").append("clipPath")
                    .attr("id", "bottomclip")
                    .append("rect")
                    .attr("class", "bottompanel-rect");
                $scope.bottompanel_context = $scope.svg.append("g")
                    .attr("class", "bottompanel");
                // Clips the line graph
                $scope.bottompanel_context.append("path")
                    .attr("clip-path", "url(#bottomclip)");
                $scope.bottompanel_context.append("g")
                    .attr("class", "x axis bottom");
                $scope.bottompanel_context.append("g")
                    .attr("class", "x axis grid");
                $scope.bottompanel_context.append("text")
                    .attr("class", "x-axis-label")
                    .style("text-anchor", "middle");
                $scope.bottompanel_context.append("g")
                    .attr("class", "y axis bottom");
                $scope.rightpanel_context = $scope.svg.append("g")
                    .attr("class", "rightpanel");
                $scope.svg.append("defs").append("clipPath")
                    .attr("id", "rightclip")
                    .append("rect")
                    .attr("class", "rightpanel-rect");
                $scope.rightpanel_context.append("path")
                    .attr("clip-path", "url(#rightclip)");
                $scope.rightpanel_context.append("g")
                    .attr("class", "y axis right");
                $scope.rightpanel_context.append("g")
                    .attr("class", "x axis right");
                $scope.rightpanel_context.append("text")
                    .attr("class", "y-axis-label")
                    .style("text-anchor", "middle")
                    .attr("transform", "rotate(270)");
                $scope.svg.append("text")
                    .attr("class", "z-axis-label")
                    .style("text-anchor", "middle");
                $scope.bottompanel_cut_line = d3.svg.line()
                    .x(function(d) {return $scope.x_axis_scale(d[0])})
                    .y(function(d) {return $scope.bottompanel_y_scale(d[1])});
                $scope.rightpanel_cut_line = d3.svg.line()
                    .y(function(d) { return $scope.y_axis_scale(d[0]); })
                    .x(function(d) { return $scope.rightpanel_x_scale(d[1]); });

                $(window).resize($scope.resize);
            }

            $scope.init_draw = function(json, zmin, zmax) {
                var color = d3.scale.linear()
                    .domain([zmin, zmax])
                    .range(["#333", "#fff"]);
                var xmax = json.x_range.length - 1;
                var ymax = json.y_range.length - 1;
                // Compute the pixel colors; scaled by CSS.
                var img = $scope.ctx.createImageData(json.x_range.length, json.y_range.length);
                for (var yi = 0, p = -1; yi <= ymax; ++yi) {
	            for (var xi = 0; xi <= xmax; ++xi) {
	                var c = d3.rgb(color($scope.heatmap[yi][xi]));
	                img.data[++p] = c.r;
	                img.data[++p] = c.g;
	                img.data[++p] = c.b;
	                img.data[++p] = 255;
	            }
                }
                // Keeping pixels as nearest neighbor (as anti-aliased as we can get
                // without doing more programming) allows us to see how the marginals
                // line up when zooming in a lot.
                $scope.ctx.mozImageSmoothingEnabled = false;
                $scope.ctx.webkitImageSmoothingEnabled = false;
                $scope.ctx.msImageSmoothingEnabled = false;
                $scope.ctx.imageSmoothingEnabled = false;
                $scope.ctx.putImageData(img, 0, 0);
                $scope.imageObj.src = $scope.canvas.node().toDataURL();
            }

            $scope.load = function(json) {
                $scope.heatmap = [];
                var xmax = json.x_range.length - 1;
                var ymax = json.y_range.length - 1;
                $scope.x_value_min = json.x_range[0];
                $scope.x_value_max = json.x_range[xmax];
                $scope.x_value_range = json.x_range.slice(0);
                $scope.y_value_min = json.y_range[0];
                $scope.y_value_max = json.y_range[ymax];
                $scope.y_value_range = json.y_range.slice(0);
                $scope.x_index_scale.range([0, xmax]);
                $scope.y_index_scale.range([0, ymax]);
                $scope.canvas.attr("width", json.x_range.length)
                    .attr("height", json.y_range.length);
                $scope.select(".main-title").text(json.title);
                $scope.select(".x-axis-label").text(json.x_label);
                $scope.select(".y-axis-label").text(json.y_label);
                $scope.select(".z-axis-label").text(json.z_label);
                $scope.x_axis_scale.domain([$scope.x_value_min, $scope.x_value_max]);
                $scope.x_index_scale.domain([$scope.x_value_min, $scope.x_value_max]);
                $scope.y_axis_scale.domain([$scope.y_value_min, $scope.y_value_max]);
                $scope.y_index_scale.domain([$scope.y_value_min, $scope.y_value_max]);

                var zmin = json.z_matrix[0][0]
                var zmax = json.z_matrix[0][0]
                for (var yi = 0; yi <= ymax; ++yi) {
                    // flip to match the canvas coordinate system (origin: top left)
                    // matplotlib is bottom left
                    $scope.heatmap[ymax - yi] = [];
                    for (var xi = 0; xi <= xmax; ++xi) {
	                var zi = json.z_matrix[yi][xi];
	                $scope.heatmap[ymax - yi][xi] = zi;
	                if (zmax < zi)
	                    zmax = zi;
	                else if (zmin > zi)
	                    zmin = zi;
                    }
                }
                $scope.bottompanel_y_scale.domain([zmin, zmax]);
                $scope.rightpanel_x_scale.domain([zmax, zmin]);
                $scope.init_draw(json, zmin, zmax);
                $scope.resize();
            }

            $scope.refresh = function() {
                var tx = 0, ty = 0, s = 1;
                if (d3.event && d3.event.translate) {
                    var t = d3.event.translate;
                    s = d3.event.scale;
                    tx = t[0];
                    ty = t[1];
                    tx = Math.min(
                        0,
                        Math.max(
                            tx,
                            $scope.canvas_size - (s * $scope.imageObj.width) / ($scope.imageObj.width / $scope.canvas_size)));
                    ty = Math.min(
                        0,
                        Math.max(
                            ty,
                            $scope.canvas_size - (s * $scope.imageObj.height) / ($scope.imageObj.height / $scope.canvas_size)));

                    var xdom = $scope.x_axis_scale.domain();
                    var ydom = $scope.y_axis_scale.domain();
                    var reset_s = 0;
                    if ((xdom[1] - xdom[0]) >= ($scope.x_value_max - $scope.x_value_min) * 0.9999) {
	                $scope.zoom.x($scope.x_axis_scale.domain([$scope.x_value_min, $scope.x_value_max]));
	                xdom = $scope.x_axis_scale.domain();

	                reset_s += 1;
                    }
                    if ((ydom[1] - ydom[0]) >= ($scope.y_value_max - $scope.y_value_min) * 0.9999) {
	                $scope.zoom.y($scope.y_axis_scale.domain([$scope.y_value_min, $scope.y_value_max]));
	                ydom = $scope.y_axis_scale.domain();
	                reset_s += 1;
                    }
                    if (reset_s == 2) {
	                $scope.mouse_rect.attr("class", "mouse-zoom");
	                // Both axes are full resolution. Reset.
	                tx = 0;
	                ty = 0;
                    }
                    else {
	                $scope.mouse_rect.attr("class", "mouse-move");
	                if (xdom[0] < $scope.x_value_min) {
                            //		tx = 0;
	                    $scope.x_axis_scale.domain([$scope.x_value_min, xdom[1] - xdom[0] + $scope.x_value_min]);
	                    xdom = $scope.x_axis_scale.domain();
	                }
	                if (xdom[1] > $scope.x_value_max) {
	                    xdom[0] -= xdom[1] - $scope.x_value_max;
	                    $scope.x_axis_scale.domain([xdom[0], $scope.x_value_max]);
	                }
	                if (ydom[0] < $scope.y_value_min) {
	                    $scope.y_axis_scale.domain([$scope.y_value_min, ydom[1] - ydom[0] + $scope.y_value_min]);
	                    ydom = $scope.y_axis_scale.domain();
	                }
	                if (ydom[1] > $scope.y_value_max) {
	                    ydom[0] -= ydom[1] - $scope.y_value_max;
	                    $scope.y_axis_scale.domain([ydom[0], $scope.y_value_max]);
	                }
                    }
                }

                $scope.ctx.clearRect(0, 0, $scope.canvas_size, $scope.canvas_size);
                if (s == 1) {
                    tx = 0;
                    ty = 0;
                    $scope.zoom.translate([tx, ty]);
                }
                $scope.ctx.drawImage(
                    $scope.imageObj,
                    tx*$scope.imageObj.width/$scope.canvas_size,
                    ty*$scope.imageObj.height/$scope.canvas_size,
                    $scope.imageObj.width*s,
                    $scope.imageObj.height*s
                );
                $scope.draw_bottompanel_cut();
                $scope.draw_rightpanel_cut();
                $scope.bottompanel_context.selectAll($scope.plot_id + " .x.axis").call($scope.bottompanel_xAxis);
                $scope.bottompanel_context.selectAll($scope.plot_id + " .y.axis").call($scope.bottompanel_yAxis);
                $scope.rightpanel_context.selectAll($scope.plot_id + " .x.axis").call($scope.rightpanel_xAxis);
                $scope.rightpanel_context.selectAll($scope.plot_id + " .y.axis").call($scope.rightpanel_yAxis);
                $scope.svg.selectAll($scope.plot_id + " .x.axis.grid").call($scope.main_xAxis);
                $scope.svg.selectAll($scope.plot_id + " .y.axis.grid").call($scope.main_yAxis);
            }

            $scope.resize = function() {
                var width = parseInt($scope.select().style("width")) - 2 * margin;
                var rightpanel_margin = {left: 10, right: 40};
                var bottompanel_margin = {top: 10, bottom: 30};
                $scope.canvas_size = 2 * (width - rightpanel_margin.left - rightpanel_margin.right) / 3;
                var bottompanel_height = 2 * $scope.canvas_size / 5 + bottompanel_margin.top + bottompanel_margin.bottom;
                var rightpanel_width = $scope.canvas_size / 2 + rightpanel_margin.left + rightpanel_margin.right;
                $scope.rightpanel_xAxis.ticks(
                    width >= 700 ? 5
                        : width >= 566 ? 4
                        : width >= 433 ? 3
                        : 2);
                $scope.x_axis_scale.range([0, $scope.canvas_size - 1]);
                $scope.y_axis_scale.range([$scope.canvas_size - 1, 0]);
                $scope.bottompanel_y_scale.range([bottompanel_height - bottompanel_margin.top - bottompanel_margin.bottom - 1, 0]);
                $scope.rightpanel_x_scale.range([0, rightpanel_width - rightpanel_margin.left - rightpanel_margin.right]);
                $scope.main_xAxis.tickSize(- $scope.canvas_size - bottompanel_height + bottompanel_margin.bottom); // tickLine == gridline
                $scope.main_yAxis.tickSize(- $scope.canvas_size - rightpanel_width + rightpanel_margin.right); // tickLine == gridline
                $scope.zoom.center([$scope.canvas_size / 2, $scope.canvas_size / 2])
                    .x($scope.x_axis_scale.domain([$scope.x_value_min, $scope.x_value_max]))
                    .y($scope.y_axis_scale.domain([$scope.y_value_min, $scope.y_value_max]));
                $scope.select("canvas")
                    .style("width", $scope.canvas_size + "px")
                    .style("height", $scope.canvas_size + "px");
                $scope.select("svg")
                    .attr("width", margin * 2 + $scope.canvas_size + rightpanel_width)
                    .attr("height", margin * 2 + $scope.canvas_size + bottompanel_height)
                $scope.select(".main-title")
                    .attr("x", $scope.canvas_size / 2)
                    .attr("y", - margin / 2);
                $scope.select(".mouse-rect")
                    .attr("width", $scope.canvas_size)
                    .attr("height", $scope.canvas_size)
                    .call($scope.zoom);
                $scope.select(".y-cross-hair")
                    .attr("x1", Math.floor($scope.canvas_size/2) - 0)
                    .attr("x2", Math.floor($scope.canvas_size/2) - 0)
                    .attr("y2", $scope.canvas_size);
                $scope.select(".x-cross-hair")
                    .attr("y1", Math.floor($scope.canvas_size/2) + 0)
                    .attr("x2", $scope.canvas_size)
                    .attr("y2", Math.floor($scope.canvas_size/2) + 0);
                $scope.select(".bottompanel-rect")
                    .attr("width", $scope.canvas_size)
                    .attr("height", bottompanel_height - bottompanel_margin.top - bottompanel_margin.bottom);
                $scope.select(".bottompanel")
                    .attr("transform", "translate(0," + ($scope.canvas_size + bottompanel_margin.top) + ")");
                $scope.select(".x-axis-label")
                    .attr("x", $scope.canvas_size / 2)
                    .attr("y", bottompanel_height);
                $scope.select(".rightpanel-rect")
                    .attr("width", rightpanel_width - rightpanel_margin.left - rightpanel_margin.right)
                    .attr("height", $scope.canvas_size);
                $scope.select(".rightpanel")
                    .attr("transform", "translate(" + ($scope.canvas_size + rightpanel_margin.left) + ",0)");
                $scope.select(".x.axis.bottom")
                    .attr("transform", "translate(0," + (bottompanel_height - bottompanel_margin.top - bottompanel_margin.bottom) + ")")
                    .call($scope.bottompanel_xAxis);
                $scope.select(".x.axis.right")
                    .attr("transform", "translate(0," + $scope.canvas_size + ")")
                    .call($scope.rightpanel_xAxis);
                $scope.select(".y-axis-label")
                    .attr("x", - $scope.canvas_size / 2)
                    .attr("y", rightpanel_width + 15);
                $scope.select(".z-axis-label")
                    .attr("x", $scope.canvas_size + rightpanel_width / 2)
                    .attr("y", $scope.canvas_size + margin);
                $scope.select(".x.axis.grid")
                    .attr("transform", "translate(0," + (bottompanel_height - bottompanel_margin.top - bottompanel_margin.bottom) + ")")
                    .call($scope.zoom)
                    .call($scope.main_xAxis);
                $scope.select(".y.axis.grid")
                    .call($scope.zoom)
                    .call($scope.main_yAxis);
                $scope.select(".y.axis.right")
                    .attr("transform", "translate(" + (rightpanel_width - rightpanel_margin.left - rightpanel_margin.right) + ",0)")
                    .call($scope.rightpanel_yAxis);
                $scope.select(".y.axis.bottom")
                    .call($scope.bottompanel_yAxis);
                $scope.refresh();
            }

            $scope.select = function(selector) {
                return d3.select($scope.plot_id + (selector ? (" " + selector) : ""));
            };
        },
        link: function link(scope) {
            d3Service.d3().then(function(d3) {
                //TODO(pjm): consolidate this code with plot2d
                function request_data() {
                    console.log('requesting data: ', scope.modelName);
                    appState.request_data(scope.modelName, function(data) {
                        console.log('loading data: ', scope.modelName);
                        scope.load(data);
                    });
                }
                scope.$on(scope.modelName + '.changed', request_data);
                scope.init(scope.id);
                request_data();
            });
            scope.$on('$destroy', function() {
                $(window).off('resize', scope.resize);
                scope.svg.remove();
                scope.imageObj.onload = null;
            });
        },
    };
});

app.controller('SimulationsController', function ($rootScope) {
    $rootScope.pageTitle = "Simulations - SRW - Radiasoft";
    $rootScope.sectionTitle = "";
    $rootScope.activeSection = "simulations";
    var self = this;
});

app.controller('BeamlineController', function ($rootScope, appState, beamlineGraphics) {
    $rootScope.pageTitle = "NSLS-II CHX beamline Day 1 - SRW - Radiasoft";
    $rootScope.sectionTitle = "NSLS-II CHX beamline Day 1";
    $rootScope.activeSection = "beamline";
    var self = this;
    self.models = appState.models;
    self.toolbar_items = [
        {name:'aperture', title:'Aperture'},
        {name:'crl', title:'CRL'},
        {name:'lens', title:'Lens'},
        {name:'mirror', title:'Mirror'},
        {name:'obstacle', title:'Obstacle'},
        {name:'watch', title:'Watchpoint'},
    ];
    self.beamline = appState.beamline;
    var current_id = 100;

    function add_item(item) {
        //TODO(pjm): conslidate clone()
        var new_item = $.extend(true, {}, item);
        new_item['id'] = ++current_id;
        new_item['_show_popover'] = true;
        if (self.beamline.length) {
            new_item.position = parseFloat(self.beamline[self.beamline.length - 1].position) + 1;
        }
        else {
            new_item.position = 20;
        }
        self.beamline.push(new_item);
        $('.srw-beamline-element-label').popover('hide');
    }

    self.remove_element = function(item) {
        $('.srw-beamline-element-label').popover('hide');
        self.beamline.splice(self.beamline.indexOf(item), 1);
    }

    self.drop_complete = function(data) {
        if (data && ! data['id']) {
            add_item(data);
        }
    }
    self.drop_between = function(index, data) {
        if (! data)
            return;
        //console.log("drop_between: ", index, ' ', data, ' ', data['id'] ? 'old' : 'new');
        var item;
        if (data['id']) {
            $('.srw-beamline-element-label').popover('hide');
            var curr = self.beamline.indexOf(data);
            if (curr < index)
                index--;
            self.beamline.splice(curr, 1);
            item = data;
        }
        else {
            // move last item to this index
            item = self.beamline.pop()
        }
        self.beamline.splice(index, 0, item);
        if (self.beamline.length > 1) {
            if (index === 0) {
                item.position = parseFloat(self.beamline[1].position) - 0.5;
            }
            else if (index === self.beamline.length - 1) {
                item.position = parseFloat(self.beamline[self.beamline.length - 1].position) + 0.5;
            }
            else {
                item.position = Math.round(100 * (parseFloat(self.beamline[index - 1].position) + parseFloat(self.beamline[index + 1].position)) / 2) / 100;
            }
        }
    }
});

app.directive('toolbarItem', function(beamlineGraphics) {
    return {
        scope: {
            item: '=',
        },
        link: function(scope, element) {
            var canvas = element[0];
            canvas.style.width = '30px';
            canvas.style.height = '35px';
            canvas.width = beamlineGraphics.width;
            canvas.height = beamlineGraphics.height;
            beamlineGraphics.draw_icon(scope.item.name, canvas);
        }
    };
});

app.directive('beamlineItem', function($compile, $timeout, beamlineGraphics) {
    return {
        scope: {
            item: '=',
        },
        controller: function($scope) {
            $scope.dismiss = function() {
                $('.srw-beamline-element-label').popover('hide');
            }
        },
        link: function(scope, element) {
            var canvas = $(element).find('canvas')[0];
            canvas.width = beamlineGraphics.width;
            canvas.height = beamlineGraphics.height;
            beamlineGraphics.draw_icon(scope.item.name, canvas);
            $(element).find('.srw-beamline-element-label').each(function (index, el) {
                $(el).popover({
                    html: true,
                    placement: 'bottom',
                    container: '.srw-popup-container-lg',
                    viewport: { selector: '.srw-beamline'},
                    content: $compile($('.srw-' + scope.item.name + '-editor').html())(scope),
                    trigger: 'manual',
                });
                $(el).click(function() {
                    $('.srw-beamline-element-label').not(this).popover('hide');
                    $(el).popover('toggle');
                });
                if (scope.item['_show_popover']) {
                    $timeout(function() {
                        var position = $(el).parent().position().left;
                        var width = $('.srw-beamline-container').width();
                        var itemWidth = $(el).width();
                        if (position + itemWidth > width) {
                            var scrollPoint = $('.srw-beamline-container').scrollLeft();
                            $('.srw-beamline-container').scrollLeft(position - width + scrollPoint + itemWidth);
                        }
                        $(el).popover('show');
                        $(el).on('shown.bs.popover', function() {
                            $('.popover-content .form-control').first().select();
                        });
                    }, 500);
                }
            });
        },
    };
});

app.directive('panel', function(appState) {
    return {
        scope: {
            modelName: '@',
        },
        template: [
            '<div class="panel panel-info">',
              '<div class="panel-heading" data-panel-heading="{{ panelTitle }}" data-model="appState.models[modelName]" data-editor-id="{{ editorId }}"></div>',
              '<div class="panel-body cssFade" data-ng-show="appState.models[modelName]._visible">',
                '<form name="f0" class="form-horizontal">',
                  '<div class="form-group form-group-sm" data-ng-repeat="f in basicFields">',
                    '<div data-field-editor="f" data-model="appState.models[modelName]"></div>',
                  '</div>',
                  '<div data-buttons="" data-model-name="modelName" data-form-name="f0"></div>',
                '</form>',
              '</div>',
            '</div>',
        ].join(''),
        controller: function($scope) {
            $scope.appState = appState;
            $scope.basicFields = appState.model_info($scope.modelName).basic;
            $scope.panelTitle = appState.model_info($scope.modelName).title;
            $scope.editorId = "srw-" + $scope.modelName + "-editor";
        },
    };
});

app.directive('reportPanel', function(appState) {
    return {
        scope: {
            reportPanel: '@',
            modelName: '@',
        },
        template: [
            '<div class="panel panel-info">',
              '<div class="panel-heading" data-panel-heading="{{ panelTitle }}" data-model="appState.models[modelName]" data-editor-id="{{ editorId }}" data-allow-full-screen="1"></div>',
              '<panel-body data-model="appState.models[modelName]">',

                '<div data-ng-switch="reportPanel">',
                  '<div data-ng-switch-when="2d" data-plot2d="" class="srw-plot-2d" data-model-name="{{ modelName }}" id="{{ plotId }}"></div>',
                  '<div data-ng-switch-when="3d" data-plot3d="" class="srw-plot-3d" data-model-name="{{ modelName }}" id="{{ plotId }}"></div>',
                '</div>',
              '</panel-body>',
            '</div>',
        ].join(''),
        controller: function($scope) {
            $scope.appState = appState;
            $scope.panelTitle = appState.model_info($scope.modelName).title;
            $scope.editorId = "srw-" + $scope.modelName + "-editor";
            $scope.plotId = "srw-" + $scope.modelName + "-" + $scope.reportPanel + "-plot";
        },
    };
});

app.directive('modalEditor', function(appState) {
    return {
        scope: {
            modalEditor: '@',
        },
        template: [
            '<div class="modal fade" id="{{ editorId }}" tabindex="-1" role="dialog">',
              '<div class="modal-dialog modal-lg">',
                '<div class="modal-content">',
                  '<div class="modal-header bg-info">',
  	            '<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>',
	            '<span class="lead modal-title text-info">{{ modalTitle }}</span>',
	          '</div>',
                  '<div class="modal-body">',
                    '<div class="container-fluid">',
                      '<div class="row">',
                        '<form name="f1" class="form-horizontal">',
                          '<div class="form-group form-group-sm" data-ng-repeat="f in advancedFields">',
                            '<div data-field-editor="f" data-model="appState.models[modalEditor]"></div>',
                          '</div>',
                          '<div data-buttons="" data-model-name="modalEditor" data-form-name="f1" data-modal-id="{{ editorId }}"></div>',
                        '</form>',
                      '</div>',
                    '</div>',
                  '</div>',
                '</div>',
              '</div>',
            '</div>',
        ].join(''),
        controller: function($scope) {
            $scope.appState = appState;
            $scope.advancedFields = appState.model_info($scope.modalEditor).advanced;
            $scope.modalTitle = appState.model_info($scope.modalEditor).title;
            $scope.editorId = "srw-" + $scope.modalEditor + "-editor";
        },
    };
});
