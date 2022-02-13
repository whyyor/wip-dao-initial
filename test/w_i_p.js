const WIP = artifacts.require("WIP");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("WIP", function ([
    owner,
    account1
]) {
    it("should assert true", async function () {
        await WIP.deployed();
        return assert.isTrue(true);
    });
    it("should have right postThreshold", async function () {
        const contract = await WIP.deployed();
        const postThreshold = await contract.postThreshold.call();
        return assert.equal(postThreshold.toString(), '100000000000000000000')
    });
    it("should have right commentThreshold", async function () {
        const contract = await WIP.deployed();
        const commentThreshold = await contract.commentThreshold.call();
        return assert.equal(commentThreshold.toString(), '25000000000000000000')
    });
    it('should change post threshold', async function () {
        const contract = await WIP.deployed();
        await contract.changePostThreshold(25, {
            from: owner
        });
        const postThreshold = await contract.postThreshold.call();
        return assert.equal(postThreshold.toString(), '25000000000000000000')
    })
    it('should change comment threshold', async function () {
        const contract = await WIP.deployed();
        await contract.changecommentThreshold(25, {
            from: owner
        });
        const commentThreshold = await contract.commentThreshold.call();
        return assert.equal(commentThreshold.toString(), '25000000000000000000')
    })
    it('should allow posting', async function () {
        const contract = await WIP.deployed();
        const result = await contract.canPost(owner);
        return assert.equal(result.toString(), 'true');
    })
    it('should allow commenting', async function () {
        const contract = await WIP.deployed();
        const result = await contract.canComment(owner);
        return assert.equal(result.toString(), 'true');
    })
});
