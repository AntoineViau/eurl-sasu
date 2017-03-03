import 'angular';
import 'angular-i18n/fr'
import 'angular-ui-bootstrap'
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
    public accre: boolean;
    public sa: boolean;

    constructor(private $uibModal, private $sce, private exercice: Exercice) {
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
        // this.sa = true;
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

        this.exercice.capital = this.params.capital.value;
        this.exercice.ca = this.params.tj.value * this.params.nbJours.value;
        this.exercice.charges = this.params.charges.value;
        this.exercice.remuneration = this.params.remuneration.value;
        this.exercice.dividendes = this.params.dividendes.value;
        this.exercice.accre2017 = this.accre;
        this.exercice.autresRevenus = 0; // autres revenus
        this.exercice.sa = this.sa;
        this.result = this.exercice.exercice();
    }
}

angular.module('app', ['ngLocale', 'ui.bootstrap', 'ngSanitize'])
    .service('cotisationsSociales', [() => new CotisationsSociales()])
    .service('impotSociete', [() => new ImpotSociete()])
    .service('impotRevenu', [() => new ImpotRevenu()])
    .service('exercice', ['impotSociete', 'cotisationsSociales', 'impotRevenu',(impotSociete, cotisationsSociales, impotRevenu) => new Exercice(impotSociete, cotisationsSociales, impotRevenu)])
    .controller('appCtrl', ['$uibModal', '$sce', 'exercice', ($uibModal, $sce, exercice) => new AppCtrl($uibModal, $sce, exercice)])
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