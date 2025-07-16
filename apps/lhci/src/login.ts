import puppeteer from 'puppeteer'

async function login() {
  const { LHCI_GC_ACCOUNT, LHCI_GC_PASS } = process.env
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()

  await page.goto('https://www.geocaching.com/account/signin', {
    waitUntil: 'networkidle2'
  })

  if (!LHCI_GC_ACCOUNT || !LHCI_GC_PASS) {
    console.error(
      'LHCI_GC_ACCOUNT and LHCI_GC_PASS environment variables are required'
    )
    await browser.close()
    return
  }

  await page.type('#UsernameOrEmail', LHCI_GC_ACCOUNT)
  await page.type('#Password', LHCI_GC_PASS)
  await page.click('button[type="submit"]')

  await page.waitForNavigation({ waitUntil: 'networkidle2' })
  console.log('Logged in to geocaching.com')
  await browser.close()
}

login().catch(err => {
  console.error(err)
  process.exit(1)
})
