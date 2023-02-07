const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const repo = require('../../repositories/users')
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
});

