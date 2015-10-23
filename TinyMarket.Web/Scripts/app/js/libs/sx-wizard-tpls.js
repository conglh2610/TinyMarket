(function() {
    'use strict';

    var module = window.angular.module('sx.wizard.tpls', []);

    module.value('$wizardConsts', {
        template: '$sx-ngtk/wizard/wizard.html'
    });

    module.run(['$templateCache', '$wizardConsts',
        function($templateCache, $wizardConsts) {
            $templateCache.put($wizardConsts.template, '' +
                '<div class="modal-header">' +
                '    <button type="button" class="close" ng-click="cancel()">' +
                '        <span aria-hidden="true">&times;</span>' +
                '    </button>' +
                '    <h3 class="modal-title">{{_title}}</h3>' +
				'<div class="fuelux">' +
					'<ul class="steps">' + 
						'<li><span class="badge badge-info">1</span>Step 1<span class="chevron"></span></li>' + 
						'<li><span class="badge">2</span>Step 2<span class="chevron"></span></li>' + 
						'<li><span class="badge">3</span>Step 3<span class="chevron"></span></li>' + 
						'<li><span class="badge">4</span>Step 4<span class="chevron"></span></li>' + 
						'<li><span class="badge">5</span>Step 5<span class="chevron"></span></li>' + 
					'</ul>' +
				'</div>' +
                '</div>' +
                '<div class="modal-body">' +
                '  <div ng-show="_shadow && (_entering || _leaving)" class="shadow">' +
                '    <div class="outer">' +
                '      <div class="middle text-info">' +
                '        <div class="inner">' +
                '          <i class="fa fa-5x fa-spinner fa-pulse"></i>' +
                '        </div>' +
                '        <div class="inner">' +
                '          <h3 ng-show="_entering">loading...</h3>' +
                '          <h3 ng-show="_leaving">validating...</h3>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '  <div class="step-title">{{$current.step.title}}</div>' +
                '  <div class="step-container" ' +
                '       sx-wizard="$data" ' +
                '       sx-wizard-steps="$steps" ' +
                '       sx-wizard-current-step="$current" ' +
                '       sx-wizard-buttons="$buttons" ' +
                '       sx-wizard-show-shadow="showShadow()" ' +
                '       sx-wizard-hide-shadow="hideShadow()" ' +
                '       sx-wizard-init="go(0, false)">' +
                '  </div>' +
                '</div>' +
                '<div class="modal-footer">' +
                '  <div class="btn-group pull-left">' +
                '    <button class="btn btn-default" ' +
                '            ng-repeat="button in $current.step.$context.navigation.buttons"' +
                '            ng-disabled="_entering || _leaving" ' +
                '            ng-click="goById(button.stepFn(), false)">{{button.text}}</button>' +
                '  </div>' +
                '  <div class="btn-group">' +
                '    <button class="btn btn-default" ' +
                '            ng-disabled="_entering || _leaving || _history.length <= 0" ' +
                '            ng-click="previous()">Previous</button>' +
                '    <button class="btn btn-default"' +
                '            ng-show="$stepsOrder.indexOf($current.step.id) < $stepsOrder.length - 1" ' +
                '            ng-disabled="_entering || _leaving" ' +
                '            ng-click="next()">Next</button>' +
                '    <button class="btn btn-default" ' +
                '            ng-show="_showFinishButton" ' +
                '            ng-disabled="_entering || _leaving" ' +
                '            ng-click="success()">Finish</button>' +
                '    <button class="btn btn-default" ng-click="cancel()">Cancel</button>' +
                '  </div>' +
                '</div>' +               
                '');
        }
    ]);
}());