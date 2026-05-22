const fs = require('fs').promises;
const retryRename = async (oldPath, newPath, attempts = 3) => {
    try {
        await fs.rename(oldPath, newPath);
    } catch (error) {
        if (attempts > 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return retryRename(oldPath, newPath, attempts - 1);
        }
        throw error;
    }
};  
module.exports = {
    retryRename
}

