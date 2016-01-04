(function() {
    var chai, expect, sinon;

    chai = require('chai');

    sinon = require('sinon');

    chai.use(require('sinon-chai'));

    expect = chai.expect;

    describe('hubot-bitbucket-status', function() {
        beforeEach(function() {
            this.robot = {
                respond: sinon.spy(),
                hear: sinon.spy()
            };
            return require('../src/hubot-bitbucket-status')(this.robot);
        });
        it('registers a hear listener', function() {
            return expect(this.robot.hear).to.have.been.calledWith(/bitbucket/i);
        });
    });

}).call(this);
