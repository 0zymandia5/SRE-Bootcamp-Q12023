import chai from 'chai';
import { loginFunction } from '../services/login'
import { protectFunction } from '../services/protected'

const expect = chai.expect;

describe('loginFunction()', function () {
  it('Test login Admin', async function () {
    expect("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI").to.be.equal(await loginFunction("admin", "secret"));
  });
});
describe('loginFunction()', function () {
  it('Test login noadmin', async function () {
    expect("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZWRpdG9yIn0.4Km_GrMrTIX2xFMjQcrGP9VDhC9jFsnFCjxvBO8Wgio").to.be.equal(await loginFunction("noadmin", "noPow3r"));
  });
});
describe('loginFunction()', function () {
  it('Test login bob', async function () {
    expect("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidmlld2VyIn0.l7pxJXYHlJdtI9RME2UesMzuVjqf-RtzQeLTHomo_Ic").to.be.equal(await loginFunction("bob", "thisIsNotAPasswordBob"));
  });
});
describe('loginFunction()', function () {
  it('Test login fake', async function () {
    expect("The credentials sent are invalid").to.be.equal(await loginFunction("bo b", "thisIsNotAPassword Bob"));
  });
});
describe('protectFunction()', function () {
  it('Test protected for Admin', async function () {
    expect("You are under protected data").to.be.equal(await protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI"));
  });
});
describe('protectFunction()', function () {
  it('Test protected for Editor', async function () {
    expect("You are under protected data").to.be.equal(await protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZWRpdG9yIn0.4Km_GrMrTIX2xFMjQcrGP9VDhC9jFsnFCjxvBO8Wgio"));
  });
});
describe('protectFunction()', function () {
  it('Test protected for Reader', async function () {
    expect("You are under protected data").to.be.equal(await protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidmlld2VyIn0.l7pxJXYHlJdtI9RME2UesMzuVjqf-RtzQeLTHomo_Ic"));
  });
});
describe('protectFunction()', function () {
  it('Test protected without token', async function () {
    expect("You are not allowed to see data").to.be.equal(await protectFunction(""));
  });
});
describe('protectFunction()', function () {
  it('Test protected for corrupt token', async function () {
    expect("You are not allowed to see data").to.be.equal(await protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.l7pxJXYHlJdtI9RME2UesMzuVjqf-RtzQeLTHomo_Ic"));
  });
});
describe('protectFunction()', function () {
  it('Test protected for fake role Writer', async function () {
    expect("You are not allowed to see data").to.be.equal(await protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid3JpdGVyIn0.Fz9YVE269FIW9S5utzZL-as_eYSig1AOSoNCk92HKvM"));
  });
});
