const util = require("util");
const exec = util.promisify(require("child_process").exec);
async function lsWithGrep(value = "") {
  try {
    const { stdout, stderr } = await exec(`ls ${value}`);
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
  } catch (err) {
    console.error(err);
  }
}
module.exports = { lsWithGrep };
