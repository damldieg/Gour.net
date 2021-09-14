/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { conn } = require('../../src/db.js');

const agent = session(app);
const name = 'rice';

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/home/types').expect(200)
    );
  });
  describe('GET /recipes?name=query', () => {
    it('should get 200', () =>
      agent.get(`/home/recipes?name=${name}`).expect(200)
    );
  });
});
