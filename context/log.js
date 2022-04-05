const log = ({date = dateNow(), type = 'info', message = '' }) => `[${date}] |${type}| ${message}`

const needsParams = (...params) => log({type: 'error', message: `needs params ${params}`});

const dateNow = (type = 'full') => {
    const dateObj = new Date().toISOString().split('T');
    const date = dateObj[0];
    const hours = dateObj[1].slice(3,8)
    return type === 'full' ? `${date} ${hours}` : `${date}`
}

module.exports = { log, needsParams, dateNow }
