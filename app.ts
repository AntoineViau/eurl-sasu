import 'angular';
import 'angular-i18n/fr'
import 'angular-ui-bootstrap'
import Exercice from './exercice';
import { doc } from './doc';
import 'angular-sanitize';

declare const angular: any;
declare const showdown: any;

class AppCtrl {

    public params: any;
    public nbMois: number;
    public resteJoursParMois: number;
    public resteSemainesParMois: number;
    public resteJoursParSemaine: number;
    public exercice;
    public accre: boolean;
    public sa: boolean;

    constructor(private $uibModal, private $sce) {
        this.params = {
            capital: { name: 'capital', min: 0, max: 100000, step: 100, value: 0 },
            charges: { name: 'charges', min: 0, max: 100000, step: 1000, value: 0 },
            tj: { name: 'tj', min: 0, max: 1000, step: 10, value: 0 },
            nbJours: { name: 'nbJours', min: 0, max: 365, step: 1, value: 0 },
            remuneration: { name: 'remuneration', min: 0, max: 150000, step: 1000, value: 0 },
            dividendes: { name: 'dividendes', min: 0, max: 150000, step: 1000, value: 0 },
        };

        // this.params['capital'].value = 2000;
        // this.params['charges'].value = 10000;
        // this.params['tj'].value = 500;
        // this.params['nbJours'].value = 180;
        // this.accre = true;
        // this.sa = false;
        // this.params['remuneration'].value = 28000;
        // this.params['dividendes'].value = 39000;
        // this.onChange();
    }

    onChange() {
        let nbJours = this.params.nbJours.value;
        this.nbMois = Math.floor(nbJours / 21);
        this.resteJoursParMois = nbJours % 21;
        this.resteSemainesParMois = Math.floor(this.resteJoursParMois / 5);
        this.resteJoursParSemaine = this.resteJoursParMois % 5;

        this.exercice = new Exercice(
            this.params.capital.value,
            this.params.tj.value * this.params.nbJours.value,
            this.params.charges.value,
            this.params.remuneration.value,
            this.params.dividendes.value,
            this.accre,
            0,      // autres revenus
            this.sa 
        ).exercice();
    }
}

angular.module('app', ['ngLocale', 'ui.bootstrap', 'ngSanitize'])
    .controller('appCtrl',['$uibModal', '$sce', ($uibModal, $sce) => new AppCtrl($uibModal, $sce)])
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
    });