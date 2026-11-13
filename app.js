//JAVASCRIPT 
document.getElementById("search").addEventListener("click", () => {
  const query = document.getElementById("check").value.trim();
  const result = document.getElementById("result");
    fetch("superheroes.php?query="+ encodeURIComponent(query))
    .then(response => response.json())
    .then(data => {result.innerHTML = "";
        
    

      const page = new DOMParser().parseFromString(data, "text/html");

      if (query === "") {
        const lists = page.querySelectorAll("ul");
        const aliases = lists[lists.length - 1].children;

        Array.from(aliases).forEach(alias => {
          const item = document.createElement("div");
          item.className = "hero-name";
          item.textContent = alias.textContent;
          result.appendChild(item);
        });
        return;
      }


      if (!page.querySelector("h2")) {
        const error = document.createElement("p");
        error.className = "error";
        error.style.color = "#CC2222";
        error.textContent = "Superhero not found";
        result.appendChild(error);
        return;
      }


      const name = document.createElement("h3");
      name.textContent = page.querySelector("h2").textContent;

      const alias = document.createElement("h4");
      alias.textContent = page.querySelector("h3").textContent;

      const bio = document.createElement("p");
      bio.textContent = page.querySelector("p").textContent;

      result.append(name, alias, bio);
    })
    .catch(error => console.error("Error:", error));
});

