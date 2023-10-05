import validator from 'validator';

const isHost = (val) => {
    return validator.isIP(val) || validator.isFQDN(val)
}

const isFolder = (val) => {
    const FolderPattern = /^(?:[A-Za-z]:\/)?[\w\/]+\w+$/;
    return FolderPattern.test(val);
}

export { isHost, isFolder };