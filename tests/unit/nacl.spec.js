(function() {
  'use strict';

  var chai = require('chai'),
    nacl = require('../../lib/nacl'),
    httpMocks = require('node-mocks-http');

    describe('Nacl test', function() {
      var expect;

      beforeEach(function() {
        expect = chai.expect;
      });

      describe('Config', function() {   
        var mockRule;     
        // When no file name is passed
        // When no path is passed
        // When a yml file is passed
        context('When no property is specified in options', function() {
          before(function() {
            mockRule = [{
              group: 'user',
              permissions: [{
                resource: 'users',
                methods: [
                  'POST',
                  'GET',
                  'PUT'
                ],
                action: 'allow'
              }]
            }];
          });

          it('Should search the root folder and return the rules', function() {
            var options;
            var rules = nacl.config(options);

            expect(rules).to.not.be.empty;
            expect(rules).to.deep.equal(mockRule);
          });          
        });

        context('When only yml is specified in options', function() {
          before(function() {
            mockRule = [{
              group: 'user',
              permissions: [{
                resource: 'users',
                methods: [
                  'GET',
                  'POST',
                  'DELETE'
                ],
                action: 'allow'
              }]
            }];
          });

          it('Should search the root folder and return the rules', function() {
            var options = {
              yml: true
            };
            var rules = nacl.config(options);

            expect(rules).to.not.be.empty;
            expect(rules).to.deep.equal(mockRule);
          });
        });

        context('When no path is specified but a file name is given', function() {
          it('Should throw an error', function() {
            var rules;
            var options = {
              filename : 'config.json'
            };

            try {
              rules = nacl.config(options);
            } catch (error) {
            }
            expect(rules).to.be.undefined;
          });
        });

        context('When a path is specified and no file name is given', function() {
          before(function() {
            mockRule = [{
              group: 'user',
              permissions: [{
                resource: 'users',
                methods: [
                  'GET',
                  'POST',
                  'DELETE'
                ],
                action: 'allow'
              }]
            }];
          });

          it('Should return the rules', function() {
            var options = {
              path: 'tests/config',
              yml: true
            };
            var rules = nacl.config(options);

            expect(rules).to.not.be.empty;
            expect(rules).to.deep.equal(mockRule);
          });
        });
      });
    });
})();