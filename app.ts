import 'angular';
import 'angular-i18n/fr';
import 'angular-ui-bootstrap';
import 'angular-cookies';
import 'ngclipboard/dist/ngclipboard';
import Exercice from './exercice';
import { doc } from './doc';
import 'angular-sanitize';
import ImpotSociete from "./impot-societe";
import CotisationsSociales from "./cotisations-sociales";
import ImpotRevenu from "./impot-revenu";

declare const angular: any;
declare const showdown: any;

class AppCtrl {

    public params: any;
    public nbMois: number;
    public resteJoursParMois: number;
    public resteSemainesParMois: number;
    public resteJoursParSemaine: number;
    public result;
    public newStateName: string;
    public url;
    public formes = ['EURL', 'SASU'];

    public states: Array<{ name: string, params: any }> = [];
    public currentState: any;

    constructor(
        private $uibModal,
        private $sce,
        private exercice: Exercice,
        private $cookies,
        private $location) {
        this.params = {
            capital: { name: 'capital', min: 0, max: 100000, step: 100, value: 0 },
            charges: { name: 'charges', min: 0, max: 100000, step: 1000, value: 0 },
            tj: { name: 'tj', min: 0, max: 1000, step: 10, value: 0 },
            nbJours: { name: 'nbJours', min: 0, max: 365, step: 1, value: 0 },
            remuneration: { name: 'remuneration', min: 0, max: 150000, step: 1000, value: 0 },
            dividendes: { name: 'dividendes', min: 0, max: 150000, step: 1000, value: 0 },
            autresRevenus: { name: 'autresRevenus', min: 0, max: 50000, step: 1000, value: 0 },
            nbParts: { name: 'nbParts', min: 1, max: 10, step: 0.5, value: 1 },
            accre: { name: 'ACCRE', notSlider: true, value: false },
            forme: { name: 'Forme', notSlider: true, value: 'EURL' }
        };

        let cookieString = $cookies.get('states');
        this.states = cookieString ? JSON.parse(cookieString) : new Array<any>();
        if (this.states.length > 0) {
            this.currentState = this.states[0];
            this.loadState();
        }

        Object.keys(this.params).forEach(
            attr => this.params[attr].value =
                (typeof this.params[attr].value === 'number'
                    ? parseInt(this.$location.search()[attr])
                    : this.$location.search()[attr] === 'true')
                || this.params[attr].value);

        this.onChange();
    }

    pushState() {
        this.states.push({
            name: this.newStateName,
            params: JSON.parse(JSON.stringify(this.params))
        });
        this.$cookies.put('states', JSON.stringify(this.states));
    }

    loadState() {
        this.params = this.currentState.params;
        this.onChange();
    }

    clearStates() {
        if (!confirm('Certain ?')) {
            return;
        }
        this.states = new Array<any>();
        this.$cookies.put(this.states, '[]');
    }

    onChange(param = undefined) {
        let nbJours = this.params.nbJours.value;
        this.nbMois = Math.floor(nbJours / 21);
        this.resteJoursParMois = nbJours % 21;
        this.resteSemainesParMois = Math.floor(this.resteJoursParMois / 5);
        this.resteJoursParSemaine = this.resteJoursParMois % 5;
        this.exercice.capital = this.params.capital.value;
        this.exercice.ca = this.params.tj.value * this.params.nbJours.value;
        this.exercice.charges = this.params.charges.value;
        this.exercice.remuneration = this.params.remuneration.value;
        this.exercice.dividendes = this.params.dividendes.value;
        this.exercice.accre2017 = this.params.accre.value;// === 'true';
        this.exercice.autresRevenus = this.params.autresRevenus.value;
        this.exercice.nbParts = this.params.nbParts.value;
        this.exercice.forme = this.params.forme.value;
        this.result = this.exercice.exercice();

        this.url = this.$location.protocol() + '://' +
            this.$location.host() + ':' +
            this.$location.port() +
            this.$location.path() +
            '?' + Object.keys(this.params).map(k => k + '=' + this.params[k].value).join('&');
    }
}

angular.module('app', ['ngLocale', 'ui.bootstrap', 'ngSanitize', 'ngCookies', 'ngclipboard'])
    .config(['$locationProvider', ($locationProvider) => {
        $locationProvider.html5Mode(true);
    }])
    .service('cotisationsSociales', [() => new CotisationsSociales()])
    .service('impotSociete', [() => new ImpotSociete()])
    .service('impotRevenu', [() => new ImpotRevenu()])
    .service('exercice', [
        'impotSociete', 'cotisationsSociales', 'impotRevenu',
        (impotSociete, cotisationsSociales, impotRevenu) => new Exercice(impotSociete, cotisationsSociales, impotRevenu)
    ])
    .controller('appCtrl', [
        '$uibModal', '$sce', 'exercice', '$cookies', '$location',
        ($uibModal, $sce, exercice, $cookies, $location) => new AppCtrl($uibModal, $sce, exercice, $cookies, $location)
    ])
    .component('field', {
        bindings: {
            label: '@',
            doc: '@'
        },
        template: `
        <div class="value">
            <b>{{$ctrl.label}}<sup ng-if="$ctrl.doc" ng-click="$ctrl.openDoc($ctrl.doc)">?</sup></b> : <span ng-transclude></span> 
        </div>`,
        transclude: true,
        controller: ['$uibModal', '$sce', function ($uibModal, $sce) {
            this.openDoc = function (id) {
                $uibModal.open({
                    templateUrl: 'myModalContent.html',
                    size: 'lg',
                    controller: ['$scope', ($scope) => {
                        let converter = new showdown.Converter();
                        $scope.title = doc[id].title;
                        $scope.content = $sce.trustAsHtml(converter.makeHtml(doc[id].content));
                    }]
                });
            }
        }]
    })
    .directive('stringToNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    //debugger;
                    return parseInt(value);
                });
                ngModel.$formatters.push(function (value) {
                    //debugger;
                    return parseFloat(value);
                });
            }
        };
    });