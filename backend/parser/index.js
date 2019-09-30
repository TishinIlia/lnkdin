const puppeteer = require('puppeteer')
const login = require('./login')
const logger = require('./logger')
const profiles = require('./profiles')

module.exports = async({ email, password, isHeadless, hasToLog, puppeteerArgs } = { isHeadless: true, hasToLog: false }) => {
    if (!hasToLog) {
        logger.stopLogging()
    }
    logger.info('scraper', 'initializing')

    if (!email || !password) {
        logger.warn('scraper', 'required parameters email and password was not provided')
        throw new Error('scraper: email and password are required to access linkedin profiles')
    }

    logger.info('scraper', 'required parameters email and password was provided')

    const args = Object.assign({ headless: isHeadless }, puppeteerArgs)
    const browser = await puppeteer.launch(args)

    try {
        await login(browser, email, password, logger)
    } catch (e) {
        await browser.close()
        throw e
    }

    return (url, waitMs) => profiles(browser, url, waitMs)
}