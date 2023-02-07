import fs from 'fs';

export var make_folders = function(dir) {
    if (fs.existsSync(dir)) {
        return;
    }
    console.log(`Creating folder: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
};