'use strict';

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var should = chai.should();

var Address = require('../../lib/model/address');

describe('Address', function() {
  describe('#create', function() {
    it('should create livenet address', function() {
      var x = Address.create({
        address: 't1S8k9fTUs4rntErEL4TZ9uoDTAPntpzQZt',
        coin: 'vdl',
        walletId: '123',
        isChange: false,
        path: 'm/133/1',
        publicKeys: ['123', '456'],
      });
      should.exist(x.createdOn);
      x.network.should.equal('livenet');
    });
    it('should create testnet address', function() {
      var x = Address.create({
        address: 'tmHMBeeYRuc2eVicLNfP15YLxbQsooCA6jb',
        coin: 'vdl',
        walletId: '123',
        isChange: false,
        path: 'm/133/1',
        publicKeys: ['123', '456'],
      });
      x.network.should.equal('testnet');
    });
  });
  describe('#derive', function() {
    it('should derive multi-sig P2SH address', function() {
      var address = Address.derive('wallet-id', 'P2SH', [{
        xPubKey: 'xpub6ExXBwohmf44nLGfR9Gju8ZEK5ZxusKS5iPMRoD3gEeMmwYAU1Z3K17K7mHdzPcda5oLSwqeJ3MwT28Yx59hu7EDEvSnkNaiX8jGVbt7Btu'
        // PubKey(xPubKey/0/0) -> 03fe466ea829aa4c9a1c289f9ba61ebc26a61816500860c8d23f94aad9af152ecd
      }, {
        xPubKey: 'xpub6ExXBwohmf44nLGfR9Gju8ZEK5ZxusKS5iPMRoD3gEeMmwYAU1Z3K17K7mHdzPcda5oLSwqeJ3MwT28Yx59hu7EDEvSnkNaiX8jGVbt7Btu'
        // PubKey(xPubKey/0/0) -> 03162179906dbe6a67979d4f8f46ee1db6ff81715f465e6615a4f5969478ad2171
      }], 'm/0/0', 1, 'vdl', 'livenet', false);
      should.exist(address);
      address.walletId.should.equal('wallet-id');
      address.address.should.equal('t3XVysjELV6kiPtpg26ThRycgn1jAVmaNri');
      address.network.should.equal('livenet');
      address.isChange.should.be.false;
      address.path.should.equal('m/0/0');
      address.type.should.equal('P2SH');
    });
    it('should derive 1-of-1 P2SH address', function() {
      var address = Address.derive('wallet-id', 'P2SH', [{
        xPubKey: 'xpub6ExXBwohmf44nLGfR9Gju8ZEK5ZxusKS5iPMRoD3gEeMmwYAU1Z3K17K7mHdzPcda5oLSwqeJ3MwT28Yx59hu7EDEvSnkNaiX8jGVbt7Btu'
        // PubKey(xPubKey/0/0) -> 03fe466ea829aa4c9a1c289f9ba61ebc26a61816500860c8d23f94aad9af152ecd
      }], 'm/0/0', 1, 'vdl', 'livenet', false);
      should.exist(address);
      address.walletId.should.equal('wallet-id');
      address.address.should.equal('t3ekqP55iTftqgUuSKmHkSGqSkMCAu1EcFn');
      address.network.should.equal('livenet');
      address.isChange.should.be.false;
      address.path.should.equal('m/0/0');
      address.type.should.equal('P2SH');
    });
    it('should derive 1-of-1 P2PKH address', function() {
      var address = Address.derive('wallet-id', 'P2PKH', [{
        xPubKey: 'xpub6ExXBwohmf44nLGfR9Gju8ZEK5ZxusKS5iPMRoD3gEeMmwYAU1Z3K17K7mHdzPcda5oLSwqeJ3MwT28Yx59hu7EDEvSnkNaiX8jGVbt7Btu'
        // PubKey(xPubKey/1/2) -> 0232c09a6edd8e2189628132d530c038e0b15b414cf3984e532358cbcfb83a7bd7
      }], 'm/1/2', 1, 'vdl', 'livenet', true);
      should.exist(address);
      address.walletId.should.equal('wallet-id');
      address.address.should.equal('t1LPNoYhautRMf8b7QezpiRW84kCsdSLoox');
      address.network.should.equal('livenet');
      address.isChange.should.be.true;
      address.path.should.equal('m/1/2');
      address.type.should.equal('P2PKH');
    });
  });
});
