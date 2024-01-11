import fetch from "node-fetch";

export async function handler(event) {
  const name = event.queryStringParameters.name; // or adjust to capture the necessary data from the request
  const fotmobUrl = `https://www.fotmob.com/api/search/searchData?term=${name}&fetchMore=squadMember`;

  console.log(name);
  try {
    const response = await fetch(fotmobUrl, {
      method: "GET",
      headers: {
        authority: "www.fotmob.com",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "max-age=0",
        cookie:
          'NEXT_LOCALE=sv; u:location=%7B%22countryCode%22%3A%22SE%22%2C%22ccode3%22%3A%22SWE%22%2C%22timezone%22%3A%22Europe%2FStockholm%22%2C%22ip%22%3A%2283.191.170.186%22%2C%22regionId%22%3A%22O%22%2C%22regionName%22%3A%22V%25C3%25A4stra%20G%25C3%25B6taland%20County%22%7D; g_state={"i_p":1707004124551,"i_l":4}',
        "if-none-match": '"swst0p5jzk8w"',
        "sec-ch-ua":
          '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}
