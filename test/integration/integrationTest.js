const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const repo = require('../../repositories/users')
const sinon = require('sinon');
const request = require('supertest');
const db = require('../../db/db');
// const { should } = require('chai');
chai.use(chaiHttp);
chai.should();

describe('Records', () => {
    beforeEach(async () => {
        await repo.deleteUser(1);
    });


    it('should create a record', async () => {
        const res = await chai.request(app)
            .post('/users')
            .send({
                name: 'Test Record',
                email: 'record@gmail.com',
            });
        res.should.have.status(201);
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('name').eql('Test Record');
        res.body.data.should.have.property('email').eql('record@gmail.com');
    });

    it('should retrieve a record', async () => {
        const response = await repo.createUser({
            name: 'Test Record',
            email: 'record@gmail.com',
        });
        const res = await chai.request(app).get(`/users/${response.dataValues.id}`);

        res.should.have.status(200);
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('id').eql(response.dataValues.id);
        res.body.data.should.have.property('name').eql('Test Record');
        res.body.data.should.have.property('email').eql('record@gmail.com');
    });

    it('should update a record', async () => {
        const response = await repo.createUser({
            name: 'Test Record',
            email: 'record@gmail.com',
        });
        const res = await chai.request(app)
            .put(`/users/${response.dataValues.id}`)
            .send({
                name: 'Updated Test Record',
                email: 'update@gmail.com',
            });

        res.should.have.status(200);
        res.body.data.should.be.a('array');
        // res.body.data.should.have.property('id').eql(response.dataValues.id);
        // res.body.data.should.have.property('name').eql('Updated Test Record');
        // res.body.data.should.have.property('email').eql('update@gmail.com');
    });
    it('should show all records', async () => {
        const res = await chai.request(app)
            .get('/users')

        res.should.have.status(200);
        res.body.data.should.be.a('array');

    });

    it('should delete a record', async () => {
        const response = await repo.createUser({
            name: 'Test Record',
            email: 'update@gmail.com',
        });
        const res = await chai.request(app).delete(`/users/${response.id}`);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User deleted successfully');
    });
    it('responds with a 404 error if the resource is not found', async () => {
        const res = await request(app)
            .get('/users/100')
            .expect(404)
        res.body.should.have.property('message').equal('User not found');

    });
});

describe('mocking db', () => {
    beforeEach(function () {
        // Stub out the database connection
        sinon.stub(db, 'query').resolves([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
    });

    afterEach(function () {
        // Restore the original database connection
        db.query.restore();
    });
    it('responds with a JSON array of users', async () => {
        const res = await request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)

        res.body.data.should.be.a('array');
        res.body.data.should.have.length(2);
        res.body.data[0].should.have.property('id', 1);
        res.body.data[0].should.have.property('name', 'Alice');
        res.body.data[1].should.have.property('id', 2);
        res.body.data[1].should.have.property('name', 'Bob');
        res.body.should.have.property('message').equal('Users retrieved successfully');

        // console.log(res.body)
        // res.should.have.status(200);
        // res.body.should.have.property('message').equal('Users retrieved successfully');
        // res.body.data.should.be.a('array');
        // res.body.data.should.deep.equal([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);


    });




})

