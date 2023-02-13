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
        const res = await repo.createUser({
            name: 'Test Record',
            email: 'record@gmail.com',
        });
        res.dataValues.should.be.a('object');
        res.dataValues.should.have.property('id');
        res.dataValues.should.have.property('name').eql('Test Record');
        res.dataValues.should.have.property('email').eql('record@gmail.com');
    });

    it('should retrieve a record', async () => {
        const response = await repo.createUser({
            name: 'Test Record',
            email: 'record@gmail.com',
        });
        const res = await repo.getUser(response.dataValues.id);

        res.dataValues.should.be.a('object');
        res.dataValues.should.have.property('id').eql(response.dataValues.id);
        res.dataValues.should.have.property('name').eql('Test Record');
        res.dataValues.should.have.property('email').eql('record@gmail.com');
    });
    it('should update a record', async () => {
        const response = await repo.createUser({
            name: 'Test Record',
            email: 'record@gmail.com',
        });
        const res = await repo.updateUser(response.dataValues.id, {
            name: 'Updated Test Record',
            email: 'Updated record@gmail.com',
        });
        res.should.be.a('array');
        // res.dataValues.should.have.property('id').eql(response.dataValues.id);
        // res.dataValues.should.have.property('name').eql('Updated Test Record');
        // res.dataValues.should.have.property('email').eql('Updated record@gmail.com');
    });


    it('should show all records', async () => {

        const res = await repo.getUsers();
        res.should.be.a('array');


    });

    it('should delete a record', async () => {
        const response = await repo.createUser({
            name: 'Test Record',
            email: 'update@gmail.com',
        });
        const res = await repo.deleteUser(response.dataValues.id);
        res.should.be.a('number');
        res.should.be.equal(1);

    });
});




