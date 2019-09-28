const openPage = require('./openPage')
const scrollToPageBottom = require('./scrollToPageBottom')
const seeMoreButtons = require('./seeMoreButtons')

const logger = require('./logger')

module.exports = async (browser, waitTimeToScrapMs = 500) => {
    logger.info('profile', `starting scraping url`)

    const page = await openPage(browser, 'https://www.linkedin.com/in/')
    const profilePageIndicatorSelector = ".pv-profile-section"

    await page.waitFor(profilePageIndicatorSelector, { timeout: 5000 })
        .catch(() => {
            logger.warn('profile', 'profile selector was not found')
            throw new Error('linkedin: profile not found')
        })

    logger.info('profile', 'scrolling page to the bottom')
    await scrollToPageBottom(page)

    if(waitTimeToScrapMs) {
        logger.info('profile', `applying 1st delay`)
        await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTimeToScrapMs / 2)})
    }

    logger.info('profile', 'clicking on see more buttons')
    await seeMoreButtons.clickAll(page)

    if(waitTimeToScrapMs) {
        logger.info('profile', `applying 2nd delay`)
        await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTimeToScrapMs / 2)})
    }

    await page.goto('https://www.linkedin.com/mynetwork/invite-connect/connections/')
    await scrollToPageBottom(page)
    const  friends = await page.$$eval('.mn-connections .mn-connection-card__picture', divs => divs.map(elem => elem.href.trim()));
    await page.close()
    logger.info('profile', `finished scraping url`)

    return friends
}
