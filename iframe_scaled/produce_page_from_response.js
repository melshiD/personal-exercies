let resText;
async function checkCORS() {
    let ajax = new XMLHttpRequest();
    ajax.timeout = 60000;
    let url = "https://myfirstcorsproxy.herokuapp.com/https://www.amazon.com";
    let asynchronous = true;
    let method = "GET";
    ajax.open(method, url, asynchronous);

    ajax.send();

    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            resText = `${this.responseText}`;
            // resText = `#document ${this.responseText}`;
        }

    }

    return resText;
}

let fullPage = await checkCORS();