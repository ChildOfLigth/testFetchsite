const form = document.forms.form;
const usernameInput = form.form__userName;
const displaydata = document.getElementById("displaydata");

form.onsubmit = (e) => {
  e.preventDefault();

  fetch(`https://api.nationalize.io?name=${usernameInput.value}`)
    .then((data) => data.json())
    .then((res) => {
      if (
        usernameInput.value == "" ||
        usernameInput.value == " " ||
        usernameInput.value == null
      ) {
        return document.body.insertAdjacentHTML(
          "beforeend",
          `
        <h2 class="warning">You haven't entered any data. The server will not be able to return a response to your request.</h2>
        `
        );
      }
      displaydata.classList.add("_auto");
      let percentCertainty = res.country[0].probability * 100;
      displaydata.innerHTML = `
        <p><span>${res.name}</span> is from <span>${
        res.country[0].country_id
      }</span> with <span>${percentCertainty.toFixed()}%</span> certainty</p>
        <p>If you do not know the country's encryption, then follow <a href='https://efi-trans.com.ua/info/ISO_country_codes/' target='_blank'>this link</a>. There you can find the decrypted codes of your countries.</p>
        `;
    })
    .catch((error) => {
      displaydata.classList.remove("_auto");
      return document.body.insertAdjacentHTML(
        "beforeend",
        `
    <h2 class="warning">Error: ${error.message}. The server couldn't find an answer to your query. Did you enter the wrong name?</h2>
    `
      );
    });
};
